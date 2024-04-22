'use client';
import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { INITIAL_SPEED_WORKOUT_PARAMS } from '../../constants';
import { SpeedWorkout, SpeedWorkoutParams } from '../../schema';
import CueList from '../CueList';
import ReadySign from './ReadySign';
import SpeedWorkoutCounter from './SpeedWorkoutCounter';

type Props = { speedWorkouts: SpeedWorkout[] };

const SokudokuCuePane = ({ speedWorkouts }: Props) => {
  const [params, setParams] = useState(INITIAL_SPEED_WORKOUT_PARAMS);

  const speedWorkout = useMemo(() => {
    if (!params.selectedId) return;
    const filtered = speedWorkouts.find(
      (item) => item.id === params.selectedId
    );
    return filtered;
  }, [params, speedWorkouts]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.temp, DOCUMENTS.speedWorkoutParams),
      (doc) => {
        if (!doc.exists()) return;
        const {
          selectedId,
          isRunning,
          checkedIndexes,
          currentRound,
          totalRounds,
        } = doc.data();
        const params: SpeedWorkoutParams = {
          selectedId,
          isRunning,
          checkedIndexes,
          currentRound,
          totalRounds,
        };
        setParams(params);
      }
    );
    return () => unsub();
  }, []);

  if (!speedWorkout) return <></>;

  return (
    <div className='mx-auto max-w-lg pb-20 pt-6'>
      <div className='grid gap-8'>
        <div className='text-center text-gray-700 text-4xl p-0 font-extralight'>
          {speedWorkout.label}
        </div>
        <div className='flex justify-center'>
          <SpeedWorkoutCounter speedWorkout={speedWorkout} params={params} />
        </div>
        <CueList params={params} speedWorkout={speedWorkout} />
        {!params.isRunning && !params.checkedIndexes.length && <ReadySign />}
      </div>
    </div>
  );
};

export default SokudokuCuePane;
