import { dbClient } from '@/firebase/client';
import { COLLECTIONS, DOCUMENTS } from '@/firebase/constants';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

export async function updateNote(input: string) {
  try {
    await updateDoc(doc(dbClient, COLLECTIONS.temp, DOCUMENTS.note), {
      input,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function addLineAudioPath(line: number, path: string) {
  setDoc(doc(dbClient, 'lineAudioPaths', line.toString()), {
    path,
  });
}

export async function deleteLineAudioPath(line: number) {
  deleteDoc(doc(dbClient, 'lineAudioPaths', line.toString()));
}
