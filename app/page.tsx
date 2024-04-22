import { auth } from '@/auth';
import MngHomePane from '@/components/MngHomePane';
import UserHomePane from '@/components/UserHomePane';

export default async function Home() {
  const session = await auth();

  if (!!session && !!session.user) {
    return <MngHomePane />;
  }

  return <UserHomePane />;
}
