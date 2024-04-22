import { shuffle } from '@/utils';
import { GAWONI_ORDER } from '../constants';
import { GawoniParams } from '../schema';

export function buildGaWoNiCue(currentCue: string, params: GawoniParams) {
  let newCue = _buildGaWoNiCue(params);
  let i = 0;
  while (newCue === currentCue && i < 10) {
    newCue = _buildGaWoNiCue(params);
    i++;
  }
  return newCue;
}

const _buildGaWoNiCue = (props: GawoniParams): string => {
  const gaItem = getPoolItem(props.ga_pool);
  const woItem = getPoolItem(
    props.wo_pool.filter((item) => item.label !== gaItem)
  );
  const niItem = getPoolItem(
    props.ni_pool.filter(
      (item) => item.label !== gaItem && item.label !== woItem
    )
  );

  const result: string[] = [];
  const shuffled = props.isRandomOrder ? shuffle(GAWONI_ORDER) : GAWONI_ORDER;

  for (const item of shuffled) {
    switch (item) {
      case 'が':
        result.push(gaItem + 'が');
        break;
      case 'を':
        result.push(woItem + 'を');
        break;
      case 'に':
        result.push(niItem + 'に');
        break;
      default:
    }
  }
  result.push('いれる');

  return result.join('　');
};

const getPoolItem = (poolItems: { label: string; rate: number }[]) => {
  // rate で加重をつける
  const pool: string[] = [];
  for (const item of poolItems) {
    for (let i = 0; i < item.rate; i++) {
      pool.push(item.label);
    }
  }

  // シャッフル
  const shuffled = shuffle(pool);
  return shuffled[0];
};
