'use client';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useEffect, useState } from 'react';

import MngFormContainer from '@/components/MngFormContainer';
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
    <MngFormContainer label='Note'>
      <div className='grid gap-1 mx-2 '>
        <div className='text-xs text-slate-700'>
          ・文字とピッチラインの区切りは空行１つ挟む（２改行）
        </div>
        <div className='text-xs text-slate-700'>
          ・ピッチラインを表示せずにカードを分ける場合は空行３つ挟む（４改行）
        </div>
      </div>
      <Textarea value={value.note} onChange={handleChange} />
      {!!value.note ? (
        <NoteMngMonitor value={value.note} records={value.records} />
      ) : null}
    </MngFormContainer>
  );
};

export default NoteMngForm;
