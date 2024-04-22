'use client';

import { Button } from '@/components/ui/button';
import { FolderClosed, FolderOpen } from 'lucide-react';
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
        <div className='text-xs font-extrabold'>Ga Wo Ni</div>
      </div>
      {open ? (
        <div className='grid gap-y-2 '>
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
        </div>
      ) : null}
    </div>
  );
};

export default GaWoNiMngForm;
