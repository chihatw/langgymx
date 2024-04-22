'use client';
import { Button } from '@/components/ui/button';
import { FolderClosed, FolderOpen } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(params);
  const [currentCue, setCurrentCue] = useState(cue);

  return (
    <div className='grid gap-y-4'>
      <div className='flex items-center'>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FolderOpen /> : <FolderClosed />}
        </Button>
        <div className='text-xs font-extrabold'>Paper Cup</div>
      </div>
      {open ? (
        <div className='grid gap-2'>
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
      ) : null}
    </div>
  );
};

export default PaperCupMngForm;
