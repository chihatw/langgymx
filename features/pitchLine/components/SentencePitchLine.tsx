import React, { useMemo } from 'react';
import { buildWordPitchStrs } from '../services/buildWordPitchStrs';
import PitchLine from './PitchLine';

const SentencePitchLine = ({ pitchStr }: { pitchStr: string }) => {
  const wordPitchStrs = useMemo(() => buildWordPitchStrs(pitchStr), [pitchStr]);

  return (
    <div className='flex flex-wrap'>
      {wordPitchStrs.map((wordPitchStr, index) => (
        <PitchLine key={index} pitchString={wordPitchStr} />
      ))}
    </div>
  );
};

export default React.memo(SentencePitchLine);
