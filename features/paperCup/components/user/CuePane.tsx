import { PaperCupCue } from '../../schema';
import CueCard from './CueCard';

type Props = { cue: PaperCupCue };

const CuePane = ({ cue }: Props) => {
  return (
    <div className='h-[200px]'>
      <div className='grid flex-1 gap-4'>
        {!!cue.header && !!cue.header.pitchStr && (
          <CueCard label={cue.header.label} pitchStr={cue.header.pitchStr} />
        )}
        {cue.nouns.map((cueCard, index) => (
          <CueCard
            key={index}
            label={cueCard.label}
            pitchStr={cueCard.pitchStr}
          />
        ))}
        <CueCard label={cue.verb.label} pitchStr={cue.verb.pitchStr} />
      </div>
    </div>
  );
};

export default CuePane;
