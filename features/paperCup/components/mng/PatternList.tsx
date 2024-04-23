import { PaperCupPatternParams } from '../../schema';
import { buildCurrentPatterns } from '../../services/utils';
import PaperCupPatternRow from './PaperCupPatternRow';

type Props = {
  params: PaperCupPatternParams;
};

const PatternList = ({ params }: Props) => {
  return (
    <div className='rounded bg-white/60'>
      <div className='grid grid-cols-8 py-2'>
        <div />
        <div className='col-span-3 flex items-center justify-center text-sm'>
          例文
        </div>
        <div className='flex items-center justify-center text-sm'>主題</div>
        <div className='flex items-center justify-center text-sm'>分類</div>
        <div className='flex items-center justify-center text-sm'>格順</div>
        <div className='flex items-center justify-center text-sm'>肯否</div>
      </div>
      <div>
        {buildCurrentPatterns(params).map((pattern, index) => (
          <PaperCupPatternRow key={index} index={index} pattern={pattern} />
        ))}
      </div>
    </div>
  );
};

export default PatternList;
