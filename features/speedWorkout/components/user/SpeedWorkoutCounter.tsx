import { SpeedWorkout, SpeedWorkoutParams } from '../../schema';

type Props = {
  speedWorkout: SpeedWorkout;
  params: SpeedWorkoutParams;
};

const SpeedWorkoutCounter = ({ speedWorkout, params }: Props) => {
  return (
    <div className='flex items-center'>
      <div>
        <span className='font-lato text-[90px] font-[900] text-gray-700'>
          {params.checkedIndexes.length +
            speedWorkout.items.length * (params.currentRound - 1)}
        </span>
        <span className='font-lato text-[48px] font-[900] text-gray-700'>{`/${
          speedWorkout.items.length * params.totalRounds
        }`}</span>
      </div>
    </div>
  );
};

export default SpeedWorkoutCounter;
