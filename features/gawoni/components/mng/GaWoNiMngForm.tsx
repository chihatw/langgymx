'use client';

import MngFormContainer from '@/components/MngFormContainer';
import { useState } from 'react';
import { GawoniParams } from '../../schema';
import GaWoNiCheckbox from './GaWoNiCheckbox';
import GaWoNiCueMonitor from './GaWoNiCueMonitor';
import PoolPane from './PoolPane';

type Props = {
  cue: string;
  params: GawoniParams;
};

const GaWoNiMngForm = ({ params, cue }: Props) => {
  const [value, setValue] = useState(params);
  const [currentCue, setCurrentCue] = useState(cue);

  return (
    <MngFormContainer label='Ga Wo Ni'>
      <GaWoNiCueMonitor
        value={value}
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
      <GaWoNiCheckbox
        prop='isRaw'
        label='is Raw'
        value={value}
        setValue={setValue}
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
      <GaWoNiCheckbox
        prop='isRandomOrder'
        label='is Random'
        value={value}
        setValue={setValue}
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
      <PoolPane
        value={value}
        setValue={setValue}
        label='が'
        prop='ga_pool'
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
      <PoolPane
        value={value}
        setValue={setValue}
        label='を'
        prop='wo_pool'
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
      <PoolPane
        value={value}
        setValue={setValue}
        label='に'
        prop='ni_pool'
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
    </MngFormContainer>
  );
};

export default GaWoNiMngForm;
