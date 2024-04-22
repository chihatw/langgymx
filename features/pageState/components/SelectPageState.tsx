import { fetchPageStates } from '../services/server';
import SelectPageStateForm from './SelectPageStateForm';

type Props = {};

const SelectPageState = async (props: Props) => {
  const pageStates = await fetchPageStates();
  return (
    <div className='grid gap-4'>
      <SelectPageStateForm pageState={pageStates.anon} user='anon' />
      <SelectPageStateForm pageState={pageStates.liSan} user='liSan' />
      <SelectPageStateForm pageState={pageStates.kouSan} user='kouSan' />
    </div>
  );
};

export default SelectPageState;
