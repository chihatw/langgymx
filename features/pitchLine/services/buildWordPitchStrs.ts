export const buildWordPitchStrs = (pitchStr: string) => {
  // 全角スペース(u3000)は半角スペース(u0020)に変換する
  pitchStr = pitchStr.replace(/\u3000/g, '\u0020');

  return pitchStr ? pitchStr.split('\u0020') : [];
};
