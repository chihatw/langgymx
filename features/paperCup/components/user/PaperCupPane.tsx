'use client';

import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  INITIAL_PAPER_CUP_CUE,
  INITIAL_PAPER_CUP_PATTERN_PARAMS,
} from '../../constants';
import { updatePapercupCue } from '../../services/actions';
import { updateCue } from '../../services/utils';
import CuePane from './CuePane';
import PlayButton from './PlayButton';

type Props = {};

const PaperCupPane = (props: Props) => {
  const [paperCupCue, setPaperCupCue] = useState(INITIAL_PAPER_CUP_CUE);
  const [params, setParams] = useState(INITIAL_PAPER_CUP_PATTERN_PARAMS);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.papercup, DOCUMENTS.cue),
      (doc) => {
        if (!doc.exists()) return;
        const { header, nouns, verb, text } = doc.data();
        setPaperCupCue({ header, nouns, verb, text });
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.temp, DOCUMENTS.papercupPatternParams),
      (doc) => {
        if (!doc.exists()) return;
        const {
          colors,
          hasStraightOrder,
          hasGroupingTopic,
          hasInvertOrder,
          hasNegative,
          hasNiGrouping,
          hasNiTopic,
          hasNoneGrouping,
          hasNoneTopic,
          hasPositive,
          hasWoGrouping,
          hasWoTopic,
        } = doc.data();
        setParams({
          colors,
          hasStraightOrder,
          hasGroupingTopic,
          hasInvertOrder,
          hasNegative,
          hasNiGrouping,
          hasNiTopic,
          hasNoneGrouping,
          hasNoneTopic,
          hasPositive,
          hasWoGrouping,
          hasWoTopic,
        });
      }
    );
    return () => unsub();
  }, []);

  const handleClick = async () => {
    const updated = updateCue(params, paperCupCue);

    // local
    setPaperCupCue(updated);

    // remote
    updatePapercupCue(updated);
  };

  return (
    <div className='mx-auto max-w-md'>
      <div className='grid gap-2'>
        <div className='my-4 h-[300px]'>
          <CuePane cue={paperCupCue} />
        </div>
        <PlayButton handleClick={handleClick} />
      </div>
    </div>
  );
};

export default PaperCupPane;
