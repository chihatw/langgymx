import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';

type Props = {
  label: string;
  pitchStr: string;
};

const CueCard = ({ label, pitchStr }: Props) => {
  return (
    <div className='box-border grid h-12 grid-cols-[1fr,1fr] rounded-lg border-2 border-slate-700 items-center'>
      <div className='text-center'>{label}</div>
      <div className='flex justify-center'>
        <SentencePitchLine pitchStr={pitchStr} />
      </div>
    </div>
  );
};

export default CueCard;
