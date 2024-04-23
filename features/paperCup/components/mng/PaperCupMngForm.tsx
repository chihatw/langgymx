'use client';
import MngFormContainer from '@/components/MngFormContainer';
import { useState } from 'react';
import { PaperCupCue, PaperCupPatternParams } from '../../schema';
import PaperCupCueMonitor from './PaperCupCueMonitor';
import PatternList from './PatternList';
import PatternSwitches from './PatternSwitches';
import SelectColors from './SelectColors';

type Props = {
  cue: PaperCupCue;
  params: PaperCupPatternParams;
};

const PaperCupMngForm = ({ cue, params }: Props) => {
  const [value, setValue] = useState(params);
  const [currentCue, setCurrentCue] = useState(cue);

  return (
    <MngFormContainer label='Paper Cup'>
      <div className='grid gap-4'>
        <PaperCupCueMonitor
          value={value}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <SelectColors
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PatternSwitches
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PatternList params={value} />
      </div>
    </MngFormContainer>
  );
};

export default PaperCupMngForm;
