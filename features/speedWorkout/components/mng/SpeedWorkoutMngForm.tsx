'use client';

import { Button, buttonVariants } from '@/components/ui/button';

import MngFormContainer from '@/components/MngFormContainer';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { cn } from '@/lib/utils';
import { Check, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useOptimistic, useState } from 'react';
import { SpeedWorkout, SpeedWorkoutParams } from '../../schema';
import {
  removeSpeedWorkout,
  resetSpeedWorkout,
  updateSpeedWorkoutSelectedId,
} from '../../services/actions';

type Props = {
  workouts: SpeedWorkout[];
  params: SpeedWorkoutParams;
};

const SpeedWorkoutMngForm = ({ params, workouts }: Props) => {
  const [optimisticWorkous, removeWorkout] = useOptimistic<
    SpeedWorkout[],
    string
  >(workouts, (state, id) => {
    return state.filter((item) => item.id !== id);
  });
  const [value, setValue] = useState('');

  const selectedWorkout = useMemo(
    () => workouts.find((item) => item.id === value),
    [workouts, value]
  );

  useEffect(() => {
    if (value) return;
    setValue(params.selectedId);
  }, [value, params]);

  const handleSelect = (id: string) => {
    const newValue = value === id ? '' : id;
    setValue(newValue);
    updateSpeedWorkoutSelectedId(id);
  };

  const action = async (id: string) => {
    removeWorkout(id);
    removeSpeedWorkout(id);
  };

  const handleReset = async () => {
    resetSpeedWorkout();
  };

  return (
    <MngFormContainer label='Speed Workout'>
      <div>
        <Link
          href={'/speedWorkout/new'}
          className={cn(buttonVariants(), 'w-full')}
        >
          create new workout
        </Link>
      </div>
      <div>
        <form action={handleReset}>
          <Button className='w-full' variant={'outline'} type='submit'>
            reset
          </Button>
        </form>
      </div>
      <div>
        {optimisticWorkous.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[auto,1fr,auto,auto] items-center gap-x-2 bg-white/60 rounded'
          >
            <form action={() => handleSelect(item.id)}>
              <Button size='icon' variant='ghost' type='submit'>
                <Check className={value === item.id ? 'text-[#52a2aa]' : ''} />
              </Button>
            </form>
            <div>{item.label}</div>
            <Link
              href={`/speedWorkout/${item.id}`}
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            >
              <Edit2 />
            </Link>
            <form action={() => action(item.id)}>
              <Button variant={'ghost'} size='icon' type='submit'>
                <Trash2 />
              </Button>
            </form>
          </div>
        ))}
      </div>
      {selectedWorkout ? (
        <div className='grid gap-2 px-4'>
          {selectedWorkout.items.map((item, index) => (
            <div key={index} className='rounded bg-white/40 p-2'>
              <div className='text-xs '>{item.cue}</div>
              <SentencePitchLine pitchStr={item.pitchStr} />
            </div>
          ))}
        </div>
      ) : null}
    </MngFormContainer>
  );
};

export default SpeedWorkoutMngForm;
