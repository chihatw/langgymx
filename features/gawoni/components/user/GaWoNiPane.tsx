'use client';

import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { INITIAL_GAWONI_PARAMS } from '../../constants';
import { updateGawoniCue } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {};

const GaWoNiPane = (props: Props) => {
  const [cue, setCue] = useState('');
  const [params, setParams] = useState(INITIAL_GAWONI_PARAMS);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.gawoni, DOCUMENTS.cue),
      (doc) => {
        if (!doc.exists()) return;
        const { sentence } = doc.data();
        setCue(sentence);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.temp, DOCUMENTS.gawoniParams),
      (doc) => {
        if (!doc.exists()) return;
        const { isRandomOrder, isRaw, ga_pool, wo_pool, ni_pool } = doc.data();
        setParams({ isRandomOrder, isRaw, ga_pool, wo_pool, ni_pool });
      }
    );
    return () => unsub();
  }, []);

  const action = async () => {
    const updatedCue = buildGaWoNiCue(cue, params);

    // local
    setCue(updatedCue);

    // remote
    updateGawoniCue(updatedCue);
  };

  return (
    <div className='mx-auto max-w-sm grid gap-16 pt-4'>
      <div className='grid h-60 gap-4'>
        {cue
          .split('　')
          .filter(Boolean)
          .map((item, index) => (
            <div
              key={index}
              className={
                'flex h-12 items-center justify-center rounded-lg border-2 border-gray-700'
              }
            >
              {params.isRaw ? (
                (() => {
                  const isLast = !'をにが'.split('').includes(item.at(-1)!);
                  if (isLast) return <div>{item}</div>;
                  const joshi = item.at(-1)!;
                  const meishi = item.substring(0, item.length - 1);
                  return (
                    <div className='flex space-x-0.5'>
                      <div className='text-red-500'>{meishi}</div>
                      <div>{joshi}</div>
                    </div>
                  );
                })()
              ) : (
                <SentencePitchLine pitchStr={item} />
              )}
            </div>
          ))}
      </div>
      <form className='flex items-center justify-center' action={action}>
        <Button
          size='icon'
          variant={'ghost'}
          className='h-32 w-32'
          type='submit'
        >
          <RefreshCw size={96} />
        </Button>
      </form>
    </div>
  );
};

export default GaWoNiPane;
