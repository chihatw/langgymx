import PageSwitch from '@/features/pageState/components/PageSwitch';

type Props = {};

const UserHomePane = (props: Props) => {
  return (
    <div className='mx-auto max-w-xl p-4'>
      <PageSwitch user='anon' speedWorkouts={[]} />
    </div>
  );
};

export default UserHomePane;
