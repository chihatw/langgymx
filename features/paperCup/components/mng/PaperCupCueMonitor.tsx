'use client';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { RefreshCcw } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { PaperCupCue, PaperCupPatternParams } from '../../schema';
import { updatePapercupCue } from '../../services/actions';
import { updateCue } from '../../services/utils';

type Props = {
  value: PaperCupPatternParams;
  currentCue: PaperCupCue;
  setCurrentCue: Dispatch<SetStateAction<PaperCupCue>>;
};

const PaperCupCueMonitor = ({ value, currentCue, setCurrentCue }: Props) => {
  const action = async () => {
    const updated = updateCue(value, currentCue);

    // local
    setCurrentCue(updated);
    // remote
    updatePapercupCue(updated);
  };

  return (
    <div className='grid grid-cols-[auto,1fr] items-center gap-x-4'>
      <form action={action}>
        <Button size='icon' variant={'ghost'} type='submit'>
          <RefreshCcw />
        </Button>
      </form>
      <div className='flex gap-x-2'>
        {currentCue.header.pitchStr ? (
          <div className='p-1 rounded bg-white/60'>
            <SentencePitchLine pitchStr={currentCue.header.pitchStr} />
          </div>
        ) : null}
        {currentCue.nouns.map((noun, index) => {
          if (!noun.pitchStr) return <></>;
          return (
            <div className='p-1 rounded bg-white/60' key={index}>
              <SentencePitchLine pitchStr={noun.pitchStr} />
            </div>
          );
        })}
        <div className='p-1 rounded bg-white/60'>
          <SentencePitchLine pitchStr={currentCue.verb.pitchStr} />
        </div>
      </div>
    </div>
  );
};

export default PaperCupCueMonitor;
