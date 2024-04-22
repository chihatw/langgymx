import { shuffle } from '@/utils';
import * as _ from 'lodash';
import {
  CUE_CARDS,
  INITIAL_PAPER_CUP_CUE,
  PAPERCUP_PATTERNS,
  TARGET,
} from '../constants';
import {
  CuePattern,
  ICueCard,
  PaperCupCue,
  PaperCupPatternParams,
} from '../schema';

export const buildCurrentPatterns = (
  listState: PaperCupPatternParams
): CuePattern[] => {
  return (
    PAPERCUP_PATTERNS
      // 主題
      .filter((pattern) => {
        if (listState.hasWoTopic && pattern.topic === TARGET.wo) {
          return true;
        }
        if (listState.hasNiTopic && pattern.topic === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneTopic && pattern.topic === TARGET.none) {
          return true;
        }
        return false;
      })
      // 分類
      .filter((pattern) => {
        if (listState.hasWoGrouping && pattern.grouping === TARGET.wo) {
          return true;
        }
        if (listState.hasNiGrouping && pattern.grouping === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneGrouping && pattern.grouping === TARGET.none) {
          return true;
        }
        return false;
      })
      // 格順
      .filter((pattern) => {
        if (listState.hasStraightOrder && pattern.isWoFirst) {
          return true;
        }
        if (listState.hasInvertOrder && !pattern.isWoFirst) {
          return true;
        }
        return false;
      })
      // 肯否
      .filter((pattern) => {
        if (listState.hasPositive && !pattern.isNegative) {
          return true;
        }
        if (listState.hasNegative && pattern.isNegative) {
          return true;
        }
        return false;
      })
      // 主題と分類の重複許可
      .filter((pattern) => {
        if (!listState.hasGroupingTopic) {
          if (pattern.topic !== TARGET.none) {
            if (pattern.topic === pattern.grouping) {
              return false;
            }
          }
        }

        return true;
      })
  );
};

export const updateCue = (
  cuePatternParams: PaperCupPatternParams,
  currentCue: PaperCupCue // currentCue と連続を避けるため必要
): PaperCupCue => {
  // 現在の cuePattern を設定
  let updatedCue: PaperCupCue = { ...currentCue };

  // ランダムに変更を行い、cuePattern が同じならば、再試行する（最大10回）
  let i = 0;
  while (_.isEqual(currentCue, updatedCue) && i < 10) {
    updatedCue = createCueFromParams(cuePatternParams);
    i++;
  }
  return updatedCue;
};

const createCueFromParams = (
  patternParams: PaperCupPatternParams
): PaperCupCue => {
  const currentPatterns = buildCurrentPatterns(patternParams);

  if (patternParams.colors.length < 2 || !currentPatterns.length)
    return INITIAL_PAPER_CUP_CUE;

  // 確率の調整
  let pumpedCurrentPatterns: CuePattern[] = [];
  let extra = 0;
  const topicOrder = [TARGET.ni, TARGET.wo, TARGET.none];
  const groupingOrder = [TARGET.none, TARGET.ni, TARGET.wo];
  const sortedCurrentPatterns = currentPatterns.sort(
    (a, b) =>
      topicOrder.indexOf(a.topic) * 10 +
      groupingOrder.indexOf(a.grouping) -
      (topicOrder.indexOf(b.topic) * 10 + groupingOrder.indexOf(b.grouping))
  );
  for (const currentPattern of sortedCurrentPatterns) {
    pumpedCurrentPatterns.push(currentPattern);

    /**
     * 主題有りの場合
     */
    if (currentPattern.topic !== TARGET.none) {
      // 分類無しは＋0
      if (currentPattern.grouping === TARGET.none) {
        for (let i = 0; i < 0; i++) {
          pumpedCurrentPatterns.push(currentPattern);
          extra++;
        }
      }
    }
    // 主題無しの場合
    else {
      switch (currentPattern.grouping) {
        // ニ格分類は＋0
        case TARGET.ni:
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
            extra++;
          }
          break;
        // ヲ格分類は+0
        case TARGET.wo:
          // const max = Math.floor((sortedCurrentPatterns.length + extra) * 0.5);
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
          }
          break;
        default:
      }
    }
  }

  const cue = buildCueWorkoutCueAndPattern(
    patternParams.colors,
    pumpedCurrentPatterns
  );
  return cue;
};

const buildCueWorkoutCueAndPattern = (
  colors: string[],
  currentPatterns: CuePattern[]
): PaperCupCue => {
  // パターン抽選
  const currentPattern: CuePattern = shuffle(currentPatterns)[0];

  // 色抽選
  const shuffledColors = shuffle(colors);

  // 色から項と前置きを作成
  const { nouns, header } = buildNouns(shuffledColors, currentPattern);

  // 動詞を作成
  const verb = currentPattern.isNegative
    ? {
        label: '入れない',
        pitchStr: 'いれない',
      }
    : {
        label: '入れる',
        pitchStr: 'いれる',
      };

  const text = [header, nouns[0], nouns[1], verb]
    .map((item) => item.label)
    .join('');

  return { text, verb, nouns, header };
};

const buildNouns = (colors: string[], pattern: CuePattern) => {
  const nouns: ICueCard[] = [];

  // 基本順は　ヲ格が先
  const [woNounId, niNounId] = colors.slice(0, 2);
  // 主題がニ格の時だけ、ニ格を先にする
  const nounId1 = pattern.topic !== TARGET.ni ? woNounId : niNounId;
  const nounId2 = pattern.topic !== TARGET.ni ? niNounId : woNounId;

  const joshi1 = pattern.isWoFirst ? pattern.wo : pattern.ni;
  const joshi2 = pattern.isWoFirst ? pattern.ni : pattern.wo;
  const noun1 = buildNounCueCardProps(nounId1, joshi1);
  const noun2 = buildNounCueCardProps(nounId2, joshi2);
  nouns.push(noun1);
  nouns.push(noun2);

  // 主題があれば、前置きを作成
  const header =
    pattern.topic !== TARGET.none
      ? {
          label: `私は${CUE_CARDS[nounId1].label}が好きです`,
          pitchStr: [
            'わたしは',
            `${CUE_CARDS[nounId1].pitchStr}が`,
            'すき＼です',
          ].join(' '),
        }
      : { label: '', pitchStr: '' };

  return { nouns, header };
};

const buildNounCueCardProps = (nounId: string, joshi: string) => {
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;

  // 助詞が「には」で、名詞にアクセントがない場合は、「に＼は」になる
  if (
    joshi === 'には' &&
    !noun.pitchStr.includes('＼') &&
    !noun.hasTailAccent
  ) {
    joshi = 'に＼は';
  }

  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  return { label, pitchStr };
};
