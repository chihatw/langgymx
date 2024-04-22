import { dbClient } from '@/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';

export function updatePitches(japanese: string, pitchStr: string) {
  updateDoc(doc(dbClient, 'temp', 'pitches'), { pitchStr, japanese });
}

export function updatePitchesUser(pitchStr: string) {
  updateDoc(doc(dbClient, 'temp', 'pitches_user'), { pitchStr });
}
