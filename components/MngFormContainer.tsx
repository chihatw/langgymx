'use client';

import { FolderClosed, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type Props = {
  label: string;
  children: React.ReactNode;
};

const MngFormContainer = ({ children, label }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='grid '>
      <div className='flex items-center '>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FolderOpen /> : <FolderClosed />}
        </Button>
        <div className='text-xs font-extrabold'>{label}</div>
      </div>
      {open ? (
        <div className='grid gap-8 border rounded border-black/10 p-2 m-4 mt-2 '>
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default MngFormContainer;
