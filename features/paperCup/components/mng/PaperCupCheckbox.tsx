'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Dispatch, SetStateAction, useRef } from 'react';
import { PaperCupCue, PaperCupPatternParams } from '../../schema';
import {
  updatePapercupCue,
  updatePapercupPatternParams,
} from '../../services/actions';
import { updateCue } from '../../services/utils';

type Props = {
  label: string;
  prop: keyof Omit<PaperCupPatternParams, 'colors'>;
  value: PaperCupPatternParams;
  setValue: Dispatch<SetStateAction<PaperCupPatternParams>>;
  currentCue: PaperCupCue;
  setCurrentCue: Dispatch<SetStateAction<PaperCupCue>>;
};

const PaperCupCheckbox = ({
  label,
  value,
  prop,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  const form = useRef<null | HTMLFormElement>(null);
  const params = useRef<null | HTMLInputElement>(null);
  const cue = useRef<null | HTMLInputElement>(null);

  const handleChange = (checked: CheckedState) => {
    const updated = {
      ...value,
      [prop]: checked as boolean,
    };
    const updatedCue = updateCue(updated, currentCue);

    // local
    setValue(updated);
    setCurrentCue(updatedCue);

    // pass to form
    params.current!.value = checked.toString();
    cue.current!.value = JSON.stringify(updatedCue);
    form.current!.requestSubmit();
  };

  const action = async (formData: FormData) => {
    const cue = formData.get('cue')?.toString() || '';
    const params = formData.get('params')?.toString() || '';

    const updated = { ...value, [prop]: params === 'true' };
    const updatedCue = JSON.parse(cue);

    // remote
    updatePapercupCue(updatedCue);
    updatePapercupPatternParams(updated);
  };

  return (
    <div className='flex items-center space-x-2'>
      <form ref={form} action={action} className='grid'>
        <input type='hidden' name='cue' ref={cue} />
        <input type='hidden' name='params' ref={params} />
        <Checkbox checked={value[prop]} onCheckedChange={handleChange} />
      </form>
      <label className='text-sm'>{label}</label>
    </div>
  );
};

export default PaperCupCheckbox;
