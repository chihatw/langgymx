'use client';
import GaWoNiPane from '@/features/gawoni/components/user/GaWoNiPane';
import NotePane from '@/features/note/components/user/NotePane';
import PaperCupPane from '@/features/paperCup/components/user/PaperCupPane';
import PitchesPane from '@/features/pitches/components/user/PitchesPane';
import RecordPane from '@/features/record/components/user/RecordPane';
import SokudokuCuePane from '@/features/speedWorkout/components/user/SokudokuCuePane';
import SokudokuRenshuPane from '@/features/speedWorkout/components/user/SokudokuRenshuPane';
import { SpeedWorkout } from '@/features/speedWorkout/schema';
import { dbClient } from '@/firebase/client';
import { COLLECTIONS } from '@/firebase/constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type Props = { user: string; speedWorkouts: SpeedWorkout[] };

const PageSwitch = ({ user, speedWorkouts }: Props) => {
  const [pageState, setPageState] = useState('blank');

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbClient, COLLECTIONS.pageStates, user),
      (doc) => {
        if (!doc.exists()) return;
        const { state } = doc.data();
        setPageState(state);
      }
    );
    return () => unsub();
  }, [user]);

  switch (pageState) {
    case 'sokudokuRenshu':
      return <SokudokuRenshuPane speedWorkouts={speedWorkouts} />;
    case 'sokudokuCue':
      return <SokudokuCuePane speedWorkouts={speedWorkouts} />;
    case 'paperCups':
      return <PaperCupPane />;
    case 'ga_wo_ni':
      return <GaWoNiPane />;
    case 'record':
      return <RecordPane />;
    case 'note':
      return <NotePane />;
    case 'pitches':
      return <PitchesPane />;
    case 'blank':
      return <></>;
    default:
      return <div>{pageState}</div>;
  }
};

export default PageSwitch;
