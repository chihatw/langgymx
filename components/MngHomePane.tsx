import GaWoNiMngForm from '@/features/gawoni/components/mng/GaWoNiMngForm';
import {
  fetchGawoniCue,
  fetchGawoniParams,
} from '@/features/gawoni/services/server';
import NoteMngForm from '@/features/note/components/mng/NoteMngForm';
import { fetchNote } from '@/features/note/services/server';
import SelectPageState from '@/features/pageState/components/SelectPageState';
import PaperCupMngForm from '@/features/paperCup/components/mng/PaperCupMngForm';
import {
  fetchPapercupCue,
  fetchPapercupPatternParams,
} from '@/features/paperCup/services/server';
import PitchesMngForm from '@/features/pitches/components/mng/PitchesMngForm';
import { fetchPiches } from '@/features/pitches/services/server';
import RecordMngForm from '@/features/record/components/mng/RecordMngForm';
import { fetchRecordParams } from '@/features/record/services/server';
import SpeedWorkoutMngForm from '@/features/speedWorkout/components/mng/SpeedWorkoutMngForm';
import {
  fetchSpeedWorkoutParams,
  fetchSpeedWorkouts,
} from '@/features/speedWorkout/services/server';

type Props = {};

const MngHomePane = async (props: Props) => {
  const speedWorkouts = await fetchSpeedWorkouts();
  const speedWorkoutParams = await fetchSpeedWorkoutParams();
  const papercupCue = await fetchPapercupCue();
  const papercupPatternParams = await fetchPapercupPatternParams();
  const gawoniCue = await fetchGawoniCue();
  const gawoniParams = await fetchGawoniParams();
  const note = await fetchNote();
  const recordParams = await fetchRecordParams();
  const pitches = await fetchPiches();

  return (
    <div className='max-w-2xl mx-auto pt-10'>
      <div className='space-y-4 px-4'>
        <SelectPageState />
        <NoteMngForm note={note} />
        <RecordMngForm params={recordParams} />
        <SpeedWorkoutMngForm
          workouts={speedWorkouts}
          params={speedWorkoutParams}
        />
        <PaperCupMngForm cue={papercupCue} params={papercupPatternParams} />
        <GaWoNiMngForm cue={gawoniCue} params={gawoniParams} />
        <PitchesMngForm pitches={pitches} />
      </div>
    </div>
  );
};

export default MngHomePane;
