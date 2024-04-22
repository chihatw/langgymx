'use client';
import { Button } from '@/components/ui/button';
import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { PlayCircle, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { INITIAL_SPEED_WORKOUT_PARAMS } from '../../constants';
import { SpeedWorkout, SpeedWorkoutParams } from '../../schema';
import { resetSpeedWorkout, startSpeedWorkout } from '../../services/actions';
import SpeedWorkoutCounter from './SpeedWorkoutCounter';

type Props = { speedWorkouts: SpeedWorkout[] };

const SokudokuRenshuPane = ({ speedWorkouts }: Props) => {
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

  const handleStart = async () => {
    // local
    setParams((prev) => ({
      ...prev,
      isRunning: true,
    }));

    // remote
    startSpeedWorkout();
  };
  const handleReset = async () => {
    // local
    setParams((prev) => ({
      ...prev,
      isRunning: false,
      currentRound: 1,
      checkedIndexes: [],
    }));
    // remote
    resetSpeedWorkout();
  };

  if (!speedWorkout) return <></>;

  return (
    <div className='mx-auto mt-6 max-w-xl'>
      <div className='grid gap-8 space-y-20'>
        <div>
          <div className='text-center text-gray-700 text-4xl p-0 font-extralight'>
            {speedWorkout.label}
          </div>

          <div className='flex justify-center'>
            <SpeedWorkoutCounter speedWorkout={speedWorkout} params={params} />
          </div>
        </div>
        <div className='flex justify-center'>
          {!params.isRunning && !params.checkedIndexes.length ? (
            <form action={handleStart}>
              <Button
                type='submit'
                size='icon'
                variant='ghost'
                className='h-[120px] w-[120px]'
              >
                <PlayCircle size={120} color='#52a2aa' />
              </Button>
            </form>
          ) : (
            <form action={handleReset}>
              <Button
                size='icon'
                type='submit'
                variant='ghost'
                className='h-[120px] w-[120px]'
              >
                <X size={120} color='#52a2aa' />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SokudokuRenshuPane;
