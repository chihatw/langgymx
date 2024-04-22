import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { GawoniParams } from '../../schema';
import { updateGawoniCue, updateGawoniParams } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {
  prop: 'ga_pool' | 'wo_pool' | 'ni_pool';
  index: number;
  value: GawoniParams;
  setValue: Dispatch<SetStateAction<GawoniParams>>;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const RemovePoolItemButton = ({
  prop,
  index,
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const action = async () => {
    const updated: GawoniParams = { ...value };
    updated[prop] = updated[prop].filter((_, _index) => _index !== index);
    const updatedCue = buildGaWoNiCue(currentCue, updated);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // remote
    updateGawoniParams(updated);
    updateGawoniCue(updatedCue);
  };
  return (
    <form action={action}>
      <Button size='icon' variant={'ghost'} type='submit'>
        <Trash2 />
      </Button>
    </form>
  );
};

export default RemovePoolItemButton;
