export type PaperCupPatternParams = {
  colors: string[];
  hasWoTopic: boolean;
  hasNiTopic: boolean;
  hasNoneTopic: boolean;
  hasWoGrouping: boolean;
  hasNiGrouping: boolean;
  hasNoneGrouping: boolean;
  hasStraightOrder: boolean;
  hasInvertOrder: boolean;
  hasPositive: boolean;
  hasNegative: boolean;
  hasGroupingTopic: boolean;
};

export interface ICueCard {
  label: string;
  pitchStr: string;
}

export type ICueWorkoutCard = {
  id: string;
  hasTailAccent: boolean;
} & ICueCard;

export interface CuePattern {
  wo: string;
  ni: string;
  doushi: string;
  topic: string;
  sentence: string;
  grouping: string;
  isWoFirst: boolean;
  isNegative: boolean;
}

export type PaperCupCue = {
  text: string;
  verb: ICueCard;
  nouns: ICueCard[];
  header: ICueCard;
};
