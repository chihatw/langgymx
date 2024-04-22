'use server';

import { dbAdmin } from '@/firebase/admin';
import { revalidatePath } from 'next/cache';

export async function deleteAllRecords(ids: string[]) {
  for (let id of ids) {
    await dbAdmin.collection('records').doc(id).delete();
    // await deleteDoc(doc(dbClient, 'records', id));
  }
  revalidatePath('/');
}
