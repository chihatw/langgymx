import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { INITIAL_SPEED_WORKOUT_PARAMS } from '../constants';
import { SpeedWorkout, SpeedWorkoutParams } from '../schema';

export async function fetchSpeedWorkouts(): Promise<SpeedWorkout[]> {
  let snapshot = await dbAdmin.collection(COLLECTIONS.speedWorkouts).get();

  if (snapshot.empty) {
    await initializeSpeedWorkouts();
    snapshot = await dbAdmin.collection(COLLECTIONS.speedWorkouts).get();
  }
  const workouts: SpeedWorkout[] = [];
  snapshot.forEach((doc) => {
    const { items, createdAt, label } = doc.data();
    const workout: SpeedWorkout = {
      id: doc.id,
      items,
      createdAt,
      label,
    };
    workouts.push(workout);
  });
  return workouts;
}

export async function fetchSpeedWorkout(id: string) {
  const snapshot = await dbAdmin
    .collection(COLLECTIONS.speedWorkouts)
    .doc(id)
    .get();
  if (!snapshot.exists) return;
  const { items, createdAt, label } = snapshot.data()!;
  const workout: SpeedWorkout = {
    id: snapshot.id,
    items,
    createdAt,
    label,
  };
  return workout;
}

export async function fetchSpeedWorkoutParams(): Promise<SpeedWorkoutParams> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .get();
  if (!snapshot.exists) {
    await initializeSpeedWorkoutParams();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.temp)
      .doc(DOCUMENTS.speedWorkoutParams)
      .get();
  }
  const speedWorkoutParams: SpeedWorkoutParams = INITIAL_SPEED_WORKOUT_PARAMS;
  if (!snapshot.exists) return speedWorkoutParams;

  const data = snapshot.data();

  return {
    isRunning: data ? data.isRunning : false,
    selectedId: data ? data.selectedId : '',
    checkedIndexes: data ? data.checkedIndexes : [],
    currentRound: data ? data.currentRound : 1,
    totalRounds: data ? data.totalRounds : 2,
  };
}

const DUMMY_ID = 'dummy';

async function initializeSpeedWorkouts() {
  const workout: Omit<SpeedWorkout, 'id'> = {
    items: [
      { cue: '昨天下雨', pitchStr: 'き＼のーは　あ＼めでした' },
      { cue: '明天下雨', pitchStr: 'あした＼は　あ＼めです' },
    ],
    createdAt: Date.now(),
    label: 'dummy',
  };
  await dbAdmin
    .collection(COLLECTIONS.speedWorkouts)
    .doc(DUMMY_ID)
    .set(workout);
}

async function initializeSpeedWorkoutParams() {
  const params: SpeedWorkoutParams = {
    isRunning: false,
    selectedId: DUMMY_ID,
    checkedIndexes: [],
    currentRound: 1,
    totalRounds: 2,
  };
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.speedWorkoutParams)
    .set(params);
}
