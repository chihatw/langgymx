export interface SpeedWorkout {
  id: string;
  label: string;
  items: { cue: string; pitchStr: string }[];
  createdAt: number;
}

export interface SpeedWorkoutParams {
  isRunning: boolean;
  selectedId: string;
  checkedIndexes: number[];
  currentRound: number;
  totalRounds: number;
}
