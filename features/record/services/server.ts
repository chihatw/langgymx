import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS } from '@/firebase/constants';
import { INITIAL_RECORD_PARAMS, RecordParams } from '../schema';

export async function fetchRecordParams(): Promise<RecordParams> {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc('recordParams')
    .get();

  if (!snapshot.exists) {
    await initializeRecordParams();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.temp)
      .doc('recordParams')
      .get();
  }

  const params = INITIAL_RECORD_PARAMS;

  if (!snapshot.exists) return params;

  const { title, pitchStr } = snapshot.data()!;

  return { title, pitchStr };
}

async function initializeRecordParams() {
  const params = {
    title: '1',
    pitchStr: 'テ＼スト',
  };

  await dbAdmin.collection(COLLECTIONS.temp).doc('recordParams').set(params);
}
