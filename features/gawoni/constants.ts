import { GawoniParams } from './schema';

export const GAWONI_ORDER = ['が', 'を', 'に'];

export const GAWONI: GawoniParams = {
  ga_pool: [{ label: '奶奶', rate: 1 }],
  isRandomOrder: true,
  isRaw: true,
  ni_pool: [{ label: '藍杯', rate: 1 }],
  wo_pool: [{ label: '女孩', rate: 1 }],
};

export const INITIAL_GAWONI_PARAMS: GawoniParams = {
  ga_pool: [],
  isRandomOrder: true,
  isRaw: false,
  ni_pool: [],
  wo_pool: [],
};
