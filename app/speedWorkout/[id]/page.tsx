import SpeedWorkoutForm from '@/features/speedWorkout/components/mng/SpeedWorkoutForm';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';

type Props = { params: { id: string } };

const SpeedWorkoutEditPage = async ({ params: { id } }: Props) => {
  const workout = await fetchSpeedWorkout(id);
  return (
    <div className='mx-auto max-w-xl'>
      <div className='p-4'>
        <div className='text-4xl font-extrabold'>Edit Speed Workout</div>
        <SpeedWorkoutForm workout={workout} />
      </div>
    </div>
  );
};

export default SpeedWorkoutEditPage;
