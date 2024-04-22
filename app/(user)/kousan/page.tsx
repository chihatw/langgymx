import PageSwitch from '@/features/pageState/components/PageSwitch';
import { fetchSpeedWorkouts } from '@/features/speedWorkout/services/server';

type Props = {};

const KousanPage = async (props: Props) => {
  const speedWorkouts = await fetchSpeedWorkouts();
  return (
    <div className='mx-auto max-w-xl p-4'>
      <div className='font-extrabold text-xs text-center'>黄さん</div>
      <PageSwitch user='kouSan' speedWorkouts={speedWorkouts} />
    </div>
  );
};

export default KousanPage;
