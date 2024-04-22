import SpeedWorkoutForm from '@/features/speedWorkout/components/mng/SpeedWorkoutForm';

type Props = {};

const SpeedWorkoutCreatePage = (props: Props) => {
  return (
    <div className='mx-auto max-w-xl'>
      <div className='p-4'>
        <div className='text-4xl font-extrabold'>Create Speed Workout</div>
        <SpeedWorkoutForm />
      </div>
    </div>
  );
};

export default SpeedWorkoutCreatePage;
