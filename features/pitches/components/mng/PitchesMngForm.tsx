'use client';

import MngFormContainer from '@/components/MngFormContainer';
import { Input } from '@/components/ui/input';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { dbClient } from '@/firebase/client';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import { updatePitches } from '../../services/client';

type Props = {
  pitches: {
    pitchStr: string;
    japanese: string;
  };
};

type FormProps = {
  japanese: string;
  pitchStr: string;
  pitchStr_user: string;
};

const INITIAL_STATE: FormProps = {
  japanese: '',
  pitchStr: '',
  pitchStr_user: '',
};

const PitchesMngForm = ({ pitches }: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    ...pitches,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(dbClient, 'temp', 'pitches_user'), (doc) => {
      if (!doc.exists()) {
        setValue((prev) => ({ ...prev, pitchStr_user: '' }));
        return;
      }
      const { pitchStr } = doc.data();
      setValue((prev) => ({ ...prev, pitchStr_user: pitchStr }));
    });
    return () => unsub();
  }, []);

  const handleChangePitchStr = (e: ChangeEvent<HTMLInputElement>) => {
    // local
    setValue((prev) => ({ ...prev, pitchStr: e.target.value }));

    // remote
    updatePitches(value.japanese, e.target.value);
  };

  const handleChangeJapanese = (e: ChangeEvent<HTMLInputElement>) => {
    // local
    setValue((prev) => ({ ...prev, japanese: e.target.value }));

    // remote
    updatePitches(e.target.value, value.pitchStr);
  };

  return (
    <MngFormContainer label='Pitches'>
      <Input
        placeholder='japanese'
        value={value.japanese}
        onChange={handleChangeJapanese}
      />
      <Input
        placeholder='pitchStr'
        value={value.pitchStr}
        onChange={handleChangePitchStr}
      />
      {!!value.pitchStr_user ? (
        <SentencePitchLine pitchStr={value.pitchStr_user} />
      ) : null}
    </MngFormContainer>
  );
};

export default PitchesMngForm;
