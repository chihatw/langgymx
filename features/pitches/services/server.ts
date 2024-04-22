import { dbAdmin } from '@/firebase/admin';

export async function fetchPiches(): Promise<{
  pitchStr: string;
  japanese: string;
}> {
  const doc = await dbAdmin.collection('temp').doc('pitches').get();
  if (!doc.exists) {
    return { pitchStr: '', japanese: '' };
  }
  const { pitchStr, japanese } = doc.data()!;

  return { pitchStr, japanese };
}
