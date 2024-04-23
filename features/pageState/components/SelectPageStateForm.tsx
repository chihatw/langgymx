'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { PAGES } from '../constants';
import { setPageState } from '../services/client';

type Props = { pageState: string; user: string };

const SelectPageStateForm = ({ pageState, user }: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(pageState);
  }, [pageState]);

  const handleChangeValue = async (value: string) => {
    setValue(value);
    await setPageState(value, user);
  };

  return (
    <div className='grid gap-2 p-2 pt-1 pb-3 rounded bg-white/60'>
      <div className='font-extrabold text-xs'>{user}</div>
      <form>
        <RadioGroup
          value={value}
          onValueChange={handleChangeValue}
          className='flex flex-wrap'
          name='pageState'
        >
          {Object.entries(PAGES).map(([key, value], index) => (
            <div key={index} className='flex items-center space-x-2'>
              <RadioGroupItem value={key} />
              <Label>{value}</Label>
            </div>
          ))}
        </RadioGroup>
      </form>
    </div>
  );
};

export default SelectPageStateForm;
