'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils';
import { useState, useTransition } from 'react';
import { signInAction } from '../services/actions';

type FormProps = {
  errMsg: string;
  email: string;
  password: string;
};

const INITIAL_STATE: FormProps = {
  errMsg: '',
  email: '',
  password: '',
};

const LogInForm = () => {
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      let isError = false;
      try {
        await signInAction(value.email, value.password);
      } catch (error) {
        console.log(error);
        isError = true;
      } finally {
        let newProps = { ...value };
        if (isError) {
          newProps = { ...value, errMsg: '⚠️無法登入' };
        } else {
          newProps = INITIAL_STATE;
        }
        setValue(newProps);
      }
    });
  };

  return (
    <div className='grid gap-8 '>
      <Input
        type='email'
        placeholder='email'
        value={value.email}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            email: e.target.value,
            errMsg: '',
          }))
        }
      />
      <Input
        placeholder='password'
        type='password'
        value={value.password}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            password: e.target.value,
            errMsg: '',
          }))
        }
      />
      <SubmitServerActionButton
        action={action}
        isPending={isPending}
        disabled={!isValidEmail(value.email) || value.password.length < 6}
        errMsg={value.errMsg}
      >
        Sign in
      </SubmitServerActionButton>
    </div>
  );
};

export default LogInForm;
