import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid items-center pt-20'>
      <div className='mx-auto w-[min(400px,100%-16px)] '>{children}</div>
    </div>
  );
};

export default AuthLayout;
