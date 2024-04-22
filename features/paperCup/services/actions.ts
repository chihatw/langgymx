'use server';

import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { PaperCupCue, PaperCupPatternParams } from '../schema';

export async function updatePapercupCue(cue: PaperCupCue) {
  await dbAdmin.collection(COLLECTIONS.papercup).doc(DOCUMENTS.cue).update(cue);
}

export async function updatePapercupPatternParams(
  params: PaperCupPatternParams
) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.papercupPatternParams)
    .update(params);
}
