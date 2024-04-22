import { dbClient, storageClient } from '@/firebase/client';
import { COLLECTIONS } from '@/firebase/constants';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { RecordParams } from '../schema';

export async function updateRecordParams(value: RecordParams) {
  updateDoc(doc(dbClient, COLLECTIONS.temp, 'recordParams'), { ...value });
}

export async function deleteFiles(paths: string[]) {
  for (let path of paths) {
    await deleteObject(ref(storageClient, path));
  }
}

// export async function deleteAllRecords(ids: string[]) {
//   for (let id of ids) {
//     await deleteDoc(doc(dbClient, 'records', id));
//   }
// }
