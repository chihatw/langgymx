import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';

export async function fetchNote() {
  let snapshot = await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.note)
    .get();

  if (!snapshot.exists) {
    await initializeNote();
    snapshot = await dbAdmin
      .collection(COLLECTIONS.temp)
      .doc(DOCUMENTS.note)
      .get();
  }
  if (!snapshot.exists) return '';
  const { input } = snapshot.data()!;
  return input;
}

async function initializeNote() {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.note)
    .set({ input: 'ありがとう\nあり＼がとー' });
}
