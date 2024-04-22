export interface Record {
  id: string;
  path: string;
  title: string;
  pitchStr: string;
  created_at: number;
}

export interface RecordParams {
  title: string;
  pitchStr: string;
}

export const INITIAL_RECORD_PARAMS: RecordParams = {
  title: '',
  pitchStr: '',
};
