import { dbClient } from '@/firebase/client';
import { COLLECTIONS } from '@/firebase/constants';
import { doc, updateDoc } from 'firebase/firestore';

export async function setPageState(pageState: string, user: string) {
  await updateDoc(doc(dbClient, COLLECTIONS.pageStates, user), {
    state: pageState,
  });
}
