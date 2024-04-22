'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FolderClosed, FolderOpen } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { Record } from '@/features/record/schema';
import { dbClient } from '@/firebase/client';
import { collection, onSnapshot } from 'firebase/firestore';
import { updateNote } from '../../services/client';
import NoteMngMonitor from './NoteMngMonitor';

type Props = { note: string };

type FormProps = {
  note: string;
  records: Record[];
};

const INITIAL_STATE: FormProps = {
  note: '',
  records: [],
};

const NoteMngForm = ({ note }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ ...INITIAL_STATE, note });

  useEffect(() => {
    const unsub = onSnapshot(collection(dbClient, 'records'), (docs) => {
      if (docs.empty) {
        setValue((prev) => ({ ...prev, records: [] }));
        return;
      }

      const records: Record[] = [];

      docs.forEach((doc) => {
        const { path, title, pitchStr, created_at } = doc.data();
        const record: Record = {
          id: doc.id,
          path,
          title,
          pitchStr,
          created_at,
        };
        records.push(record);
      });

      setValue((prev) => ({ ...prev, records }));
    });

    return () => unsub();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // local
    setValue((prev) => ({ ...prev, note: value }));

    // remote
    updateNote(value);
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
        <div className='text-xs font-extrabold'>Note</div>
      </div>
      {open ? (
        <div className='grid gap-8'>
          <div className='grid gap-1 mx-2'>
            <div className='text-xs text-slate-700'>
              ・文字とピッチラインの区切りは空行１つ挟む（２改行2）
            </div>
            <div className='text-xs text-slate-700'>
              ・ピッチラインを表示せずにカードを分ける場合は空行３つ挟む（４改行4）
            </div>
          </div>
          <Textarea value={value.note} onChange={handleChange} />

          <NoteMngMonitor value={value.note} records={value.records} />
        </div>
      ) : null}
    </div>
  );
};

export default NoteMngForm;
