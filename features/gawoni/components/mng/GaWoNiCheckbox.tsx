import { Checkbox } from '@/components/ui/checkbox';
import { Dispatch, SetStateAction, useRef } from 'react';
import { GawoniParams } from '../../schema';
import { updateGawoniCue, updateGawoniParams } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {
  prop: 'isRaw' | 'isRandomOrder';
  label: string;
  value: GawoniParams;
  setValue: Dispatch<SetStateAction<GawoniParams>>;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const GaWoNiCheckbox = ({
  prop,
  label,
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const input = useRef<null | HTMLInputElement>(null);
  const cue = useRef<null | HTMLInputElement>(null);
  const form = useRef<null | HTMLFormElement>(null);
  const handleClick = async (checked: boolean) => {
    const updated = {
      ...value,
      [prop]: checked,
    };
    const updatedCue = buildGaWoNiCue(currentCue, updated);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // pass to form
    input.current!.value = checked.toString();
    cue.current!.value = updatedCue;
    form.current!.requestSubmit();
  };

  const action = async (formData: FormData) => {
    const input = formData.get('input')?.toString() || '';
    const cue = formData.get('cue')?.toString() || '';

    const updated = { ...value, [prop]: input === 'true' };
    const updatedCue = cue;

    // remote
    updateGawoniParams(updated);
    updateGawoniCue(updatedCue);
  };

  return (
    <div className='flex items-center space-x-2'>
      <label className='text-xs font-extrabold'>{label}</label>
      <form action={action} ref={form}>
        <input type='hidden' name='input' ref={input} />
        <input type='hidden' name='cue' ref={cue} />
        <Checkbox checked={value[prop]} onCheckedChange={handleClick} />
      </form>
    </div>
  );
};

export default GaWoNiCheckbox;
