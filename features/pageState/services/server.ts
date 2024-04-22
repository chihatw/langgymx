import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { PageStates } from '../schema';

export async function fetchPageStates() {
  let snapshot = await dbAdmin.collection(COLLECTIONS.pageStates).get();

  if (snapshot.empty) {
    await initialize();
    snapshot = await dbAdmin.collection(COLLECTIONS.pageStates).get();
  }

  const pageStates: PageStates = {};
  snapshot.forEach((doc) => {
    const { state } = doc.data();
    pageStates[doc.id] = state || 'blank';
  });
  return pageStates;
}

async function initialize() {
  await dbAdmin
    .collection(COLLECTIONS.pageStates)
    .doc(DOCUMENTS.lisan)
    .set({ state: 'blank' });
  await dbAdmin
    .collection(COLLECTIONS.pageStates)
    .doc(DOCUMENTS.kousan)
    .set({ state: 'blank' });
}
