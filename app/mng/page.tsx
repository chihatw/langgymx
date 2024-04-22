import SelectPageStateForm from '@/features/pageState/components/SelectPageStateForm';
import { fetchPageStates } from '@/features/pageState/services/server';
import SpeedWorkoutMngForm from '@/features/speedWorkout/components/mng/SpeedWorkoutMngForm';
import {
  fetchSpeedWorkoutParams,
  fetchSpeedWorkouts,
} from '@/features/speedWorkout/services/server';

type Props = {};

const MngPage = async (props: Props) => {
  const pageStates = await fetchPageStates();
  const speedWorkouts = await fetchSpeedWorkouts();
  const speedWorkoutParams = await fetchSpeedWorkoutParams();
  return (
    <div className='max-w-xl mx-auto pt-10'>
      <div className='space-y-4 px-4'>
        <SelectPageStateForm pageState={pageStates.lisan} user='lisan' />
        <SelectPageStateForm pageState={pageStates.kousan} user='kousan' />
        <SpeedWorkoutMngForm
          params={speedWorkoutParams}
          workouts={speedWorkouts}
        />
      </div>
    </div>
  );
};

export default MngPage;
