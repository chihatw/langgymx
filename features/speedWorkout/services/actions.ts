'use server';

import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { FirestoreError } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { SpeedWorkout } from '../schema';

export async function createSpeedWorkout(label: string, input: string) {
  const items = buildItems(input);

  const workout: Omit<SpeedWorkout, 'id'> = {
    label,
    items,
    createdAt: Date.now(),
  };

  try {
    await dbAdmin
      .collection(COLLECTIONS.speedWorkouts)
      .doc(nanoid(4))
      .set(workout);
    revalidatePath('/');
    return;
  } catch (error) {
    const { message } = error as FirestoreError;
    return message;
  }
}

export async function updateSpeedWorkout(
  label: string,
  input: string,
  id: string
) {
  const items = buildItems(input);

  try {
    await dbAdmin
      .collection(COLLECTIONS.speedWorkouts)
      .doc(id)
      .update({ label, items });
    revalidatePath('/');
  } catch (error) {
    const { message } = error as FirestoreError;
    return message;
  }
}

export async function removeSpeedWorkout(id: string) {
  await dbAdmin.collection(COLLECTIONS.speedWorkouts).doc(id).delete();
  revalidatePath('/');
}

export async function updateSpeedWorkoutSelectedId(selectedId: string) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .update({ selectedId });
}

export async function startSpeedWorkout() {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .update({ isRunning: true });
}

export async function resetSpeedWorkout() {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .update({ isRunning: false, currentRound: 1, checkedIndexes: [] });
}

export async function updateCheckedIndexes(checkedIndexes: number[]) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .update({ checkedIndexes });
}

export async function updateCurrentRound(currentRound: number) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .update({ currentRound, checkedIndexes: [] });
}

function buildItems(input: string) {
  const items: { cue: string; pitchStr: string }[] = input
    .split('\n')
    .reduce((acc, cur, index) => {
      if (!(index % 2)) {
        return acc;
      }
      const cue = input.split('\n')[index - 1];
      return [...acc, { cue, pitchStr: cur }];
    }, [] as { cue: string; pitchStr: string }[]);
  return items;
}
