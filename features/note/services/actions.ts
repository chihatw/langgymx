'use server';

import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';

export async function updateNote(input: string) {
  await dbAdmin
    .collection(COLLECTIONS.temp)
    .doc(DOCUMENTS.note)
    .update({ input });
}
