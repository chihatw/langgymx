import { auth, signOut as signOutNextAuth } from '@/auth';
import { authClient } from '@/firebase/client';
import { signOut as signOutFirebase } from 'firebase/auth';
import { DoorClosed, DoorOpen, Home, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

const items: { url: string; label: string }[] = [];

const Header = async () => {
  return (
    <nav className='grid h-12 shadow '>
      <div className='container flex w-full items-center justify-between  mx-auto'>
        <HomeIcon />
        <div className='flex grow justify-between'>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={buttonVariants({ variant: 'ghost' })}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <AuthPane />
      </div>
    </nav>
  );
};

export default Header;

const HomeIcon = () => {
  return (
    <Link
      href={'/'}
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
    >
      <Home />
    </Link>
  );
};

const AuthPane = async () => {
  const session = await auth();
  const uid = session?.user?.id || '';
  const isAdmin = false;

  const action = async () => {
    'use server';
    await signOutNextAuth();
    await signOutFirebase(authClient);
  };
  return (
    <div className='flex items-center gap-x-2'>
      {isAdmin && <ShieldCheck />}
      {!!uid ? (
        <form action={action}>
          <Button type='submit' variant='ghost' size='icon'>
            <DoorOpen />
          </Button>
        </form>
      ) : (
        <Link
          href='/signin'
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <DoorClosed />
        </Link>
      )}
    </div>
  );
};
