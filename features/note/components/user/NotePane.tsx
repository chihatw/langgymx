'use client';

import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LineAudioPath } from '../../schema';
import NoteMngMonitor from '../mng/NoteMngMonitor';

type Props = {};

type FormProps = {
  note: string;
  lineAudioPaths: LineAudioPath[];
};

const INITIAL_STATE: FormProps = {
  note: '',
  lineAudioPaths: [],
};

const NotePane = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.temp, DOCUMENTS.note),
      (doc) => {
        if (!doc.exists()) return;
        const { input } = doc.data();
        setValue((prev) => ({ ...prev, note: input }));
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(dbClient, 'lineAudioPaths'), (docs) => {
      if (docs.empty) {
        setValue((prev) => ({ ...prev, lineAudioPaths: [] }));
        return;
      }
      const lineAudioPaths: LineAudioPath[] = [];
      docs.forEach((doc) => {
        const { path } = doc.data();
        const lineAudioPath: LineAudioPath = {
          line: parseInt(doc.id),
          audioPath: path,
        };
        lineAudioPaths.push(lineAudioPath);
      });
      setValue((prev) => ({ ...prev, lineAudioPaths }));
    });

    return () => unsub();
  }, []);

  return (
    <div className='mx-auto max-w-4xl pt-10'>
      <NoteMngMonitor
        value={value.note}
        lineAudioPaths={value.lineAudioPaths}
      />
    </div>
  );
};

export default NotePane;
