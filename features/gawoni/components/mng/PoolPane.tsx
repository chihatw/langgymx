import { Dispatch, SetStateAction } from 'react';
import { GawoniParams } from '../../schema';
import AddPoolItemButton from './AddPoolItemButton';
import GaWoNiInputContainer from './GaWoNiInputContainer';
import RemovePoolItemButton from './RemovePoolItemButton';

type Props = {
  prop: 'ga_pool' | 'wo_pool' | 'ni_pool';
  label: string;
  value: GawoniParams;
  setValue: Dispatch<SetStateAction<GawoniParams>>;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const PoolPane = ({
  prop,
  label,
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  return (
    <div className='grid gap-y-2'>
      <div className='font-extrabold text-xs'>{label}</div>
      {value[prop].map((_, index) => (
        <div key={index} className='grid grid-cols-[auto,1fr,1fr] gap-x-1'>
          <RemovePoolItemButton
            prop={prop}
            index={index}
            value={value}
            setValue={setValue}
            currentCue={currentCue}
            setCurrentCue={setCurrentCue}
          />
          <GaWoNiInputContainer
            value={value}
            prop={prop}
            index={index}
            type='label'
            setValue={setValue}
            currentCue={currentCue}
            setCurrentCue={setCurrentCue}
          />
          <GaWoNiInputContainer
            value={value}
            prop={prop}
            index={index}
            type='rate'
            setValue={setValue}
            currentCue={currentCue}
            setCurrentCue={setCurrentCue}
          />
        </div>
      ))}
      <AddPoolItemButton
        value={value}
        setValue={setValue}
        prop={prop}
        currentCue={currentCue}
        setCurrentCue={setCurrentCue}
      />
    </div>
  );
};

export default PoolPane;
