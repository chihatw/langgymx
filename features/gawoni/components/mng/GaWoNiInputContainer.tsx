import { Input } from '@/components/ui/input';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { GawoniParams } from '../../schema';
import { updateGawoniCue, updateGawoniParams } from '../../services/actions';
import { buildGaWoNiCue } from '../../services/utils';

type Props = {
  value: GawoniParams;
  prop: 'wo_pool' | 'ga_pool' | 'ni_pool';
  type: 'label' | 'rate';
  index: number;
  setValue: Dispatch<SetStateAction<GawoniParams>>;
  currentCue: string;
  setCurrentCue: Dispatch<SetStateAction<string>>;
};

const GaWoNiInputContainer = ({
  value,
  prop,
  type,
  index,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const form = useRef<null | HTMLFormElement>(null);
  const input = useRef<null | HTMLInputElement>(null);
  const cue = useRef<null | HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updated: GawoniParams = { ...value };
    if (type === 'label') {
      updated[prop][index].label = e.target.value;
    } else {
      updated[prop][index].rate = parseInt(e.target.value);
    }

    const updatedCue = buildGaWoNiCue(currentCue, updated);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // pass to form
    input.current!.value = e.target.value;
    cue.current!.value = updatedCue;
    form.current!.requestSubmit();
  };
  const action = (formData: FormData) => {
    const input = formData.get('input')?.toString() || '';
    const cue = formData.get('cue')?.toString() || '';

    const updated: GawoniParams = { ...value };
    if (type === 'label') {
      updated[prop][index].label = input;
    } else {
      updated[prop][index].rate = parseInt(input);
    }

    const updatedCue = cue;

    // remote
    updateGawoniParams(updated);
    updateGawoniCue(updatedCue);
  };
  return (
    <form ref={form} action={action}>
      <input ref={input} type='hidden' name='input' />
      <input ref={cue} type='hidden' name='cue' />
      <Input
        value={value[prop][index][type]}
        type={type === 'label' ? 'text' : 'number'}
        onChange={handleChange}
        min={0}
      />
    </form>
  );
};

export default GaWoNiInputContainer;
