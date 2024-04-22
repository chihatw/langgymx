'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dbClient, storageClient } from '@/firebase/client';
import { blobToAudioBuffer } from '@/utils';
import { collection, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { FolderClosed, FolderOpen } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Record, RecordParams } from '../../schema';

import { deleteAllRecords } from '../../services/actions';
import { deleteFiles, updateRecordParams } from '../../services/client';
import RecordMngFormRow from './RecordMngFormRow';

type Props = { params: RecordParams };

type FormProps = {
  title: string;
  pitchStr: string;
  records: (Record & { audioBuffer: undefined | AudioBuffer })[];
};

const INITIAL_STATE: FormProps = { title: '', pitchStr: '', records: [] };

const RecordMngForm = ({ params }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(INITIAL_STATE);

  const isDuplicated = useMemo(
    () =>
      value.records
        .map((item) => item.path)
        .includes(`/anon/${value.title}.mp3`),
    [value]
  );

  useEffect(() => {
    setValue((prev) => ({ ...prev, ...params }));
  }, [params]);

  useEffect(() => {
    const unsub = onSnapshot(collection(dbClient, 'records'), (docs) => {
      if (docs.empty) {
        setValue((prev) => ({ ...prev, records: [] }));
        return;
      }

      const records: (Record & { audioBuffer: undefined | AudioBuffer })[] = [];

      docs.forEach(async (doc) => {
        const { path, title, pitchStr, created_at } = doc.data();

        const record: Record & { audioBuffer: undefined | AudioBuffer } = {
          id: doc.id,
          path,
          title,
          pitchStr,
          created_at,
          audioBuffer: undefined,
        };

        try {
          const url = await getDownloadURL(ref(storageClient, path));
          const response = await fetch(url);
          const blob = await response.blob();
          const audioBuffer = await blobToAudioBuffer(blob);
          if (audioBuffer) {
            record.audioBuffer = audioBuffer;
          }
        } catch (e) {
          console.log(e);
        }

        records.push(record);
      });
      setValue((prev) => ({ ...prev, records }));
    });

    return () => unsub();
  }, []);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: FormProps = { ...value, title: e.target.value };

    setValue(newValue);

    const { title, pitchStr } = newValue;

    updateRecordParams({ title, pitchStr });
  };

  const handleChangePitchStr = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: FormProps = { ...value, pitchStr: e.target.value };
    setValue(newValue);

    const { title, pitchStr } = newValue;
    updateRecordParams({ title, pitchStr });
  };

  const action = async () => {
    const ids = value.records.map((item) => item.id);
    const paths = value.records.map((item) => item.path);

    // storage
    try {
      await deleteFiles(paths);
    } catch (e) {
      console.log(e);
    }

    // local
    setValue((prev) => ({ ...prev, records: [] }));

    // remote
    deleteAllRecords(ids);
  };

  return (
    <div className='grid gap-4'>
      <div className='flex items-center'>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FolderOpen /> : <FolderClosed />}
        </Button>
        <div className='text-xs font-extrabold'>Record</div>
      </div>
      {open ? (
        <div className='grid gap-4'>
          <div className='grid gap-1'>
            <Input value={value.title} onChange={handleChangeTitle} />
            {isDuplicated ? (
              <div className='text-xs text-red-500'>
                {`既存の「/anon/${value.title}.mp3」を上書きします`}
              </div>
            ) : null}
          </div>
          <Input value={value.pitchStr} onChange={handleChangePitchStr} />
          <form action={action} className='grid'>
            <Button type='submit'>Clear All Records</Button>
          </form>
          <div className='grid gap-2'>
            {value.records.map((record, index) => (
              <RecordMngFormRow key={index} record={record} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RecordMngForm;
