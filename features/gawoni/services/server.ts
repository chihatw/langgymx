import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { INITIAL_GAWONI_PARAMS } from '../constants';
import { GawoniParams } from '../schema';

export async function fetchGawoniCue(): Promise<string> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.gawoni)
    .doc(DOCUMENTS.cue)
    .get();

  if (!snapshot.exists) {
    await initializeGawoniCue();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.gawoni)
      .doc(DOCUMENTS.cue)
      .get();
  }

  let gawoniCue = '';

  if (!snapshot.exists) return gawoniCue;

  const { sentence } = snapshot.data()!;
  return sentence || '';
}

export async function fetchGawoniParams(): Promise<GawoniParams> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.gawoniParams)
    .get();

  if (!snapshot.exists) {
    await initializeGawoniParams();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.temp)
      .doc(DOCUMENTS.gawoniParams)
      .get();
  }

  const gawoniParams: GawoniParams = INITIAL_GAWONI_PARAMS;

  if (!snapshot.exists) return gawoniParams;

  const { wo_pool, ni_pool, ga_pool, isRandomOrder, isRaw } = snapshot.data()!;

  return {
    wo_pool,
    ni_pool,
    ga_pool,
    isRandomOrder,
    isRaw,
  };
}

async function initializeGawoniCue() {
  let gawoniCue = 'おんな＼のこが　あ＼かを　あ＼おに　いれる';
  await await dbAdmin
    .collection(COLLECTIONS.gawoni)
    .doc(DOCUMENTS.cue)
    .set({ sentence: gawoniCue });
}

async function initializeGawoniParams() {
  const params: GawoniParams = {
    wo_pool: [
      { label: 'あ＼か', rate: 1 },
      { label: 'あ＼お', rate: 1 },
      { label: 'きーろ', rate: 1 },
      { label: 'み＼どり', rate: 1 },
    ],
    ga_pool: [
      { label: 'おば＼ーさん', rate: 1 },
      { label: 'おとこ＼のこ', rate: 1 },
      { label: 'おんな＼のこ', rate: 1 },
    ],
    ni_pool: [
      { label: 'あ＼か', rate: 1 },
      { label: 'あ＼お', rate: 1 },
      { label: 'きーろ', rate: 1 },
      { label: 'み＼どり', rate: 1 },
    ],
    isRandomOrder: true,
    isRaw: false,
  };
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.gawoniParams)
    .set(params);
}
