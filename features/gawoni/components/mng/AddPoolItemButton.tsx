import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { GawoniParams } from '../../schema';
import { updateGawoniCue, updateGawoniParams } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {
  prop: 'ga_pool' | 'wo_pool' | 'ni_pool';
  value: GawoniParams;
  setValue: Dispatch<SetStateAction<GawoniParams>>;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const AddPoolItemButton = ({
  prop,
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const action = async () => {
    const updated: GawoniParams = {
      ...value,
      [prop]: [...value[prop], { label: '', rate: 1 }],
    };
    const updatedCue = buildGaWoNiCue(currentCue, updated);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // remote
    updateGawoniParams(updated);
    updateGawoniCue(updatedCue);
  };
  return (
    <form action={action} className='space-y-2'>
      <Button type='submit'>Add</Button>
    </form>
  );
};

export default AddPoolItemButton;
