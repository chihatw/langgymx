'use client';

import { useEffect, useState } from 'react';
import { SpeedWorkout, SpeedWorkoutParams } from '../../schema';
import {
  updateCheckedIndexes,
  updateCurrentRound,
} from '../../services/actions';
import CueRow from './CueRow';
import NextButton from './NextButton';

type Props = {
  params: SpeedWorkoutParams;
  speedWorkout: SpeedWorkout;
};

const CueList = ({ params, speedWorkout }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // reset が押された時、 selectedIndex をリセットする
  useEffect(() => {
    if (!params.checkedIndexes.length) {
      setSelectedIndex(-1);
    }
  }, [params]);

  const handleClickCheck = async (index: number) => {
    // local
    setSelectedIndex(index);
    // remote
    const newCheckedIndexes = [...params.checkedIndexes, index];
    updateCheckedIndexes(newCheckedIndexes);
  };

  const handleNextRound = () => {
    // local
    setSelectedIndex(-1);

    // remote
    const newCurrentRound = params.currentRound + 1;
    updateCurrentRound(newCurrentRound);
  };

  if (!params.isRunning) return <></>;

  return (
    <div className='space-y-10'>
      <div className='space-y-2'>
        {speedWorkout.items.map((item, index) => (
          <CueRow
            key={index}
            cue={item.cue}
            isActive={selectedIndex === index}
            isChecked={params.checkedIndexes.includes(index)}
            handleClick={() => handleClickCheck(index)}
          />
        ))}
      </div>
      {params.isRunning &&
        params.currentRound !== params.totalRounds &&
        params.checkedIndexes.length === speedWorkout.items.length && (
          <NextButton handleNextRound={handleNextRound} />
        )}
    </div>
  );
};

export default CueList;
