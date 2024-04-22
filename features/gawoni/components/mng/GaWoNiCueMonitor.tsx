'use client';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { RefreshCw } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { GawoniParams } from '../../schema';
import { updateGawoniCue } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {
  value: GawoniParams;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const GaWoNiCueMonitor = ({ value, currentCue, setCurrentCue }: Props) => {
  const action = async () => {
    const updatedCue = buildGaWoNiCue(currentCue, value);
    // local
    setCurrentCue(updatedCue);
    // remote
    updateGawoniCue(updatedCue);
  };
  return (
    <div className='grid grid-cols-[1fr,auto] gap-x-2  items-center'>
      {value.isRaw ? (
        <div>{currentCue}</div>
      ) : (
        <div className='flex gap-x-2 '>
          {currentCue.split('　').map((item, index) => (
            <div key={index} className='p-2 bg-white/60 rounded'>
              <SentencePitchLine pitchStr={item} />
            </div>
          ))}
        </div>
      )}
      <form action={action}>
        <Button size='icon' variant={'ghost'} type='submit'>
          <RefreshCw />
        </Button>
      </form>
    </div>
  );
};

export default GaWoNiCueMonitor;
