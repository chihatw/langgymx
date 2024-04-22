'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

type Props = {
  handleClick: () => void;
};

const PlayButton = ({ handleClick }: Props) => {
  const action = async () => {
    handleClick();
  };
  return (
    <form action={action} className='flex justify-center'>
      <Button size='icon' variant='ghost' type='submit' className='h-24 w-24'>
        <RefreshCcw size={96} />
      </Button>
    </form>
  );
};

export default PlayButton;
