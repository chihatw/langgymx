import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import {
  INITIAL_PAPER_CUP_CUE,
  INITIAL_PAPER_CUP_PATTERN_PARAMS,
} from '../constants';
import { PaperCupCue, PaperCupPatternParams } from '../schema';

export async function fetchPapercupPatternParams(): Promise<PaperCupPatternParams> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.papercupPatternParams)
    .get();

  if (!snapshot.exists) {
    //
    await initializePapercupPatternParams();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.temp)
      .doc(DOCUMENTS.papercupPatternParams)
      .get();
  }

  const papercupPatternParams: PaperCupPatternParams =
    INITIAL_PAPER_CUP_PATTERN_PARAMS;

  if (!snapshot.exists) return papercupPatternParams;

  const {
    colors,
    hasGroupingTopic,
    hasInvertOrder,
    hasNegative,
    hasNiGrouping,
    hasNiTopic,
    hasNoneGrouping,
    hasNoneTopic,
    hasPositive,
    hasStraightOrder,
    hasWoGrouping,
    hasWoTopic,
  } = snapshot.data()!;

  return {
    colors,
    hasGroupingTopic,
    hasInvertOrder,
    hasNegative,
    hasNiGrouping,
    hasNiTopic,
    hasNoneGrouping,
    hasNoneTopic,
    hasPositive,
    hasStraightOrder,
    hasWoGrouping,
    hasWoTopic,
  };
}

export async function fetchPapercupCue(): Promise<PaperCupCue> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.papercup)
    .doc(DOCUMENTS.cue)
    .get();

  if (!snapshot.exists) {
    await initializePapercupCue();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.papercup)
      .doc(DOCUMENTS.cue)
      .get();
  }

  const papercupCue: PaperCupCue = INITIAL_PAPER_CUP_CUE;

  if (!snapshot.exists) return papercupCue;

  const { header, nouns, text, verb } = snapshot.data()!;

  return {
    header,
    nouns,
    text,
    verb,
  };
}

async function initializePapercupCue() {
  const cue: PaperCupCue = {
    header: {
      label: '私は赤が好きです',
      pitchStr: 'わたしは　あ＼かが　すき＼です',
    },
    nouns: [
      { label: '赤は', pitchStr: 'あ＼かを' },
      { label: '青に', pitchStr: 'あ＼おに' },
    ],
    text: '私は赤が好きです赤は青に入れない',
    verb: { label: '入れない', pitchStr: 'いれない' },
  };
  await await dbAdmin
    .collection(COLLECTIONS.papercup)
    .doc(DOCUMENTS.cue)
    .set(cue);
}

async function initializePapercupPatternParams() {
  const params: PaperCupPatternParams = {
    colors: ['red', 'blue', 'yellow', 'green'],
    hasGroupingTopic: false,
    hasInvertOrder: true,
    hasNegative: true,
    hasNiGrouping: true,
    hasNiTopic: true,
    hasNoneGrouping: true,
    hasNoneTopic: false,
    hasPositive: false,
    hasStraightOrder: true,
    hasWoGrouping: true,
    hasWoTopic: true,
  };
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.papercupPatternParams)
    .set(params);
}
