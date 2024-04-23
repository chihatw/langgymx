'use client';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { PaperCupCue, PaperCupPatternParams } from '../../schema';
import {
  updatePapercupCue,
  updatePapercupPatternParams,
} from '../../services/actions';
import { updateCue } from '../../services/utils';

type Props = {
  value: PaperCupPatternParams;
  currentCue: PaperCupCue;
  setValue: Dispatch<SetStateAction<PaperCupPatternParams>>;
  setCurrentCue: Dispatch<SetStateAction<PaperCupCue>>;
};

const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];

const SelectColors = ({
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const handleClickColor = async (color: string) => {
    let updated = { ...value };
    if (updated.colors.includes(color)) {
      updated.colors = updated.colors.filter((item) => item !== color);
    } else {
      updated.colors = [...updated.colors, color];
    }
    const updatedCue = updateCue(updated, currentCue);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // remote
    updatePapercupCue(updatedCue);
    updatePapercupPatternParams(updated);
  };
  return (
    <div className='flex bg-white/60 rounded'>
      {COLORS.map((color, index) => (
        <form key={index} action={() => handleClickColor(color)}>
          <Button
            type='submit'
            variant='ghost'
            className={
              value.colors.includes(color)
                ? 'text-green-600 hover:text-green-600'
                : 'text-purple-600 hover:text-purple-600'
            }
          >
            {color}
          </Button>
        </form>
      ))}
    </div>
  );
};

export default SelectColors;
