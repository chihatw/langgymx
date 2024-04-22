'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Record } from '@/features/record/schema';
import { storageClient } from '@/firebase/client';
import { blobToAudioBuffer } from '@/utils';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { addLineAudioPath, deleteLineAudioPath } from '../../services/client';

const NO_RECORD = 'no record';

type Props = {
  index: number;
  label: string;
  pitchStr: string;
  records?: Record[];
  audioPath?: string;
};

type FormProps = {
  selectedId: string;
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  selectedId: NO_RECORD,
  audioBuffer: null,
};

const NoteMngRow = ({ index, label, pitchStr, records, audioPath }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!audioPath) {
      setValue((prev) => ({ ...prev, audioBuffer: null }));
      return;
    }

    (async () => {
      try {
        const url = await getDownloadURL(ref(storageClient, audioPath));
        const response = await fetch(url);
        const blob = await response.blob();
        const audioBuffer = await blobToAudioBuffer(blob);
        if (audioBuffer) {
          setValue((prev) => ({ ...prev, audioBuffer }));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [audioPath]);

  useEffect(() => {
    return () => {
      if (!!audioPath) {
        deleteLineAudioPath(index);
      }
    };
  }, [audioPath, index]);

  const handleChange = async (value: string) => {
    if (!records) return;
    // local
    setValue((prev) => ({ ...prev, selectedId: value }));

    // remote
    if (value !== NO_RECORD) {
      // insert
      const path = records.find((item) => item.id === value)!.path;
      await addLineAudioPath(index, path);
    } else {
      // delete
      await deleteLineAudioPath(index);
    }
  };
  return (
    <div className='grid gap-2 rounded bg-white/60 p-2'>
      <div className='grid gap-1'>
        {label.split('\n').map((line, index) => (
          <div key={index} className='text-xs'>
            {line}
          </div>
        ))}
      </div>
      {!!pitchStr ? (
        <div className='p-1 rounded bg-slate-200'>
          <SentencePitchLine pitchStr={pitchStr} />
        </div>
      ) : null}
      {value.audioBuffer ? (
        <AudioSlider
          audioBuffer={value.audioBuffer}
          start={0}
          end={value.audioBuffer.duration}
        />
      ) : null}
      {records ? (
        <div className='grid gap-1'>
          <Select value={value.selectedId} onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue placeholder='record' />
            </SelectTrigger>
            <SelectContent>
              {[{ id: NO_RECORD, title: NO_RECORD }, ...records].map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {value.selectedId !== NO_RECORD ? (
            <div className='grid grid-1 p-2 rounded border'>
              <div className='text-xs'>
                {records.find((item) => item.id === value.selectedId)!.path}
              </div>
              <SentencePitchLine
                pitchStr={
                  records.find((item) => item.id === value.selectedId)!.pitchStr
                }
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default NoteMngRow;
