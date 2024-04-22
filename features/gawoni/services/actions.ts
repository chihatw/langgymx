'use server';

import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { GawoniParams } from '../schema';

export async function updateGawoniCue(cue: string) {
  await dbAdmin
    .collection(COLLECTIONS.gawoni)
    .doc(DOCUMENTS.cue)
    .update({ sentence: cue });
}

export async function updateGawoniParams(params: GawoniParams) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.gawoniParams)
    .update(params as any);
}
