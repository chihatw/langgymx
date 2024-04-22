import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Props = {
  cue: string;
  isActive: boolean;
  isChecked: boolean;
  handleClick: () => void;
};

const CueRow = ({ isActive, handleClick, isChecked, cue }: Props) => {
  return (
    <div
      className={cn(
        isChecked && !isActive ? 'bg-black/10' : isActive ? 'bg-yellow-50' : '',
        'rounded-lg'
      )}
    >
      <form action={handleClick}>
        <Button
          type='submit'
          variant='ghost'
          className='w-full px-4 text-left text-gray-700'
          disabled={isChecked}
        >
          <div className='grid flex-1 items-center gap-1'>
            <div className='grid grid-cols-[1fr,auto] items-center'>
              <div className=' text-[#52a2aa]'>{cue}</div>
              {isChecked ? <Check className='text-[#52a2aa]' /> : null}
            </div>
          </div>
        </Button>
      </form>
    </div>
  );
};

export default CueRow;
