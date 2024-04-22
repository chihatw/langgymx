'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { SpeedWorkout } from '../../schema';
import { createSpeedWorkout, updateSpeedWorkout } from '../../services/actions';

type Props = {
  workout?: SpeedWorkout;
};

type FormProps = {
  label: string;
  input: string;
  disabled: boolean;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  label: '',
  input: '',
  disabled: true,
  errMsg: '',
};

const SpeedWorkoutForm = ({ workout }: Props) => {
  const router = useRouter();
  const form = useRef<null | HTMLFormElement>(null);
  const labelInput = useRef<null | HTMLInputElement>(null);
  const inputTextarea = useRef<null | HTMLTextAreaElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!workout) return;

    const items = workout.items.reduce(
      (acc, cur) => [...acc, cur.cue, cur.pitchStr],
      [] as string[]
    );

    labelInput.current!.value = workout.label;
    inputTextarea.current!.value = items.join('\n');

    const disabled = checkDisabled(workout.label, items.join('\n'));

    setValue({
      label: workout.label,
      input: items.join('\n'),
      disabled,
      errMsg: '',
    });
  }, [workout]);

  const handleChange = () => {
    const formData = new FormData(form.current!);
    const label = formData.get('label')?.toString() || '';
    const input = formData.get('input')?.toString() || '';
    const disabled = checkDisabled(label, input);
    setValue({ label, input, disabled, errMsg: '' });
  };

  const action = async () => {
    const formData = new FormData(form.current!);
    const label = formData.get('label')?.toString() || '';
    const input = formData.get('input')?.toString() || '';
    startTransition(async () => {
      if (workout) {
        const errMsg = await updateSpeedWorkout(label, input, workout.id);
        if (!errMsg) {
          router.push('/');
          return;
        }
        setValue((prev) => ({ ...prev, errMsg }));
      } else {
        const errMsg = await createSpeedWorkout(label, input);
        if (!errMsg) {
          router.push('/');
          return;
        }
        setValue((prev) => ({ ...prev, errMsg }));
      }
    });
  };
  return (
    <form
      ref={form}
      autoComplete='off'
      className='grid gap-y-4 pt-4'
      onChange={handleChange}
      action={action}
    >
      <Input placeholder='label' name='label' ref={labelInput} />
      <Textarea placeholder='input' name='input' ref={inputTextarea} />
      {value.input ? (
        <div className='space-y-2 '>
          {value.input.split('\n').map((line, index) => {
            // 奇数行は無視
            if (!(index % 2)) return <></>;

            const cue = value.input.split('\n')[index - 1];
            return (
              <div
                key={index}
                className='grid grid-cols-[auto,1fr] items-center gap-x-4 bg-white/40 rounded p-2'
              >
                <div className='text-xs'>{Math.ceil(index / 2)}</div>
                <div>
                  <div className='text-[#52a2aa] text-xs'>{cue}</div>
                  <div key={index}>
                    <SentencePitchLine pitchStr={line} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <Button
        disabled={value.disabled || isPending}
        type='submit'
        className='space-x-2'
      >
        <span>{workout ? 'Update' : 'Create'}</span>
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {value.errMsg ? <div>{value.errMsg}</div> : null}
    </form>
  );
};

export default SpeedWorkoutForm;

function checkDisabled(label: string, input: string) {
  const line = input.split('\n').map(Boolean);
  const isValidInput =
    // 1行以上 && 空行なし && 2で割り切れる
    line.length > 0 && line.every((item) => item) && line.length % 2 === 0;
  const disabled = !label || !isValidInput;
  return disabled;
}
