'use client';

import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Trash2 } from 'lucide-react';
import { Record } from '../../schema';
import { deleteAllRecords } from '../../services/actions';
import { deleteFiles } from '../../services/client';

type Props = {
  record: Record & {
    audioBuffer: undefined | AudioBuffer;
  };
};

const RecordMngFormRow = ({ record }: Props) => {
  const action = async () => {
    // storage
    try {
      await deleteFiles([record.path]);
    } catch (e) {
      console.log(e);
    }

    // remote
    deleteAllRecords([record.id]);
  };

  return (
    <div className='grid gap-1 bg-white/60 p-2 rounded'>
      <div className='text-xs'>{record.title}</div>
      <div className='text-xs'>
        {new Date(record.created_at).toLocaleTimeString()}
      </div>
      <div className='text-xs'>{record.path}</div>
      <SentencePitchLine pitchStr={record.pitchStr} />
      {record.audioBuffer ? (
        <div className='grid grid-cols-[1fr,auto]'>
          <AudioSlider
            audioBuffer={record.audioBuffer}
            start={0}
            end={record.audioBuffer.duration}
          />
          <form action={action}>
            <Button size='icon' variant={'ghost'}>
              <Trash2 />
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default RecordMngFormRow;
