import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

type Props = {
  handleNextRound: () => void;
};

const NextButton = ({ handleNextRound }: Props) => {
  return (
    <div className='flex justify-center'>
      <Button
        size='icon'
        variant='ghost'
        className='h-24 w-24'
        onClick={handleNextRound}
      >
        <RefreshCcw color='#52a2aa' size={96} />
      </Button>
    </div>
  );
};

export default NextButton;
