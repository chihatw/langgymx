import {
  CuePattern,
  ICueWorkoutCard,
  PaperCupCue,
  PaperCupPatternParams,
} from './schema';

export const INITIAL_PAPER_CUP_PATTERN_PARAMS: PaperCupPatternParams = {
  colors: [],
  hasGroupingTopic: false,
  hasInvertOrder: false,
  hasNegative: false,
  hasNiGrouping: false,
  hasNiTopic: false,
  hasNoneGrouping: false,
  hasNoneTopic: false,
  hasPositive: false,
  hasStraightOrder: false,
  hasWoGrouping: false,
  hasWoTopic: false,
};

export const PAPERCUP_PATTERNS: CuePattern[] = [
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '青を赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '赤に青を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤には青を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れる',
    sentence: '青は赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は、',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は、赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れる',
    sentence: '青には赤を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には、',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には、赤を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
];

export const TARGET = {
  none: 'none',
  wo: 'wo',
  ni: 'ni',
};

export const CUE_CARDS: { [key: string]: ICueWorkoutCard } = {
  red: {
    id: 'red',
    label: '赤',
    pitchStr: 'あ＼か',
    hasTailAccent: false,
  },
  blue: {
    id: 'blue',
    label: '青',
    pitchStr: 'あ＼お',
    hasTailAccent: false,
  },
  green: {
    id: 'green',
    label: '緑',
    pitchStr: 'み＼どり',
    hasTailAccent: false,
  },
  hikkurikaesu: {
    id: 'hikkurikaesu',
    label: 'ひっくりかえす',
    pitchStr: 'ひっくりか＼えす',
    hasTailAccent: false,
  },
  ireru: {
    id: 'ireru',
    label: '入れる',
    pitchStr: 'いれる',
    hasTailAccent: false,
  },
  kabuseru: {
    id: 'kabuseru',
    label: '被せる',
    pitchStr: 'かぶせ＼る',
    hasTailAccent: false,
  },
  motsu: {
    id: 'motsu',
    label: '持つ',
    pitchStr: 'も＼つ',
    hasTailAccent: false,
  },
  noseru: {
    id: 'noseru',
    label: 'のせる',
    pitchStr: 'のせる',
    hasTailAccent: false,
  },
  orange: {
    id: 'orange',
    label: 'オレンジ',
    pitchStr: 'オレ＼ンジ',
    hasTailAccent: false,
  },
  pink: {
    id: 'pink',
    label: 'ピンク',
    pitchStr: 'ピ＼ンク',
    hasTailAccent: false,
  },
  yellow: {
    id: 'yellow',
    label: '黄色',
    pitchStr: 'きいろ',
    hasTailAccent: false,
  },
  yubisasu: {
    id: 'yubisasu',
    label: 'ゆびさす',
    pitchStr: 'ゆびさ＼す',
    hasTailAccent: false,
  },
  mine: {
    id: 'mine',
    label: 'わたしのて',
    pitchStr: 'わたしのて',
    hasTailAccent: true,
  },
  yours: {
    id: 'yours',
    label: 'じぶんのて',
    pitchStr: 'じぶんのて',
    hasTailAccent: true,
  },
  right: {
    id: 'right',
    label: '一番右の',
    pitchStr: 'いちばん　みぎの',
    hasTailAccent: true,
  },
  left: {
    id: 'left',
    label: '一番左の',
    pitchStr: 'いちばん　ひだりの',
    hasTailAccent: true,
  },
};

// export const INITIAL_CUE_PATTERN: ICuePattern = {
//   wo: 'を',
//   ni: 'に',
//   topic: TARGET.none,
//   doushi: '入れる',
//   sentence: '青を赤に入れる',
//   grouping: TARGET.none,
//   isWoFirst: true,
//   isNegative: false,
// };

export const INITIAL_PAPER_CUP_CUE: PaperCupCue = {
  text: '',
  verb: { label: '', pitchStr: '' },
  nouns: [],
  header: { label: '', pitchStr: '' },
};
