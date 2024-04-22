import { SpeedWorkout, SpeedWorkoutParams } from './schema';

export const SPEED_WORKOUTS: { [key: string]: SpeedWorkout } = {
  lisan: {
    id: 'a',
    label: '李さん反応練習１',
    items: [
      {
        cue: '聽到「あかは」，聽者要做什麼？',
        pitchStr: '要確認前面有沒有講到過　あ＼か',
      },
      {
        cue: '聽到「あおは」，聽者要做什麼？',
        pitchStr: '要確認前面有沒有講到過　あ＼お',
      },
    ],
    createdAt: 1659606944070,
  },
  kousan: {
    id: 'b',
    label: '黄さん反応練習１',
    items: [
      {
        cue: '聽到「あかは」，聽者要做什麼？',
        pitchStr: '要確認前面有沒有講到過　あ＼か',
      },
      {
        cue: '聽到「あおは」，聽者要做什麼？',
        pitchStr: '要確認前面有沒有講到過　あ＼お',
      },
    ],
    createdAt: 1659606944070,
  },
};

export const SPEED_WORKOUT_PARAMS: SpeedWorkoutParams = {
  isRunning: false,
  selectedId: '',
  checkedIndexes: [],
  currentRound: 1,
  totalRounds: 2,
};

export const INITIAL_SPEED_WORKOUT_PARAMS: SpeedWorkoutParams = {
  isRunning: false,
  selectedId: '',
  checkedIndexes: [],
  currentRound: 1,
  totalRounds: 2,
};
