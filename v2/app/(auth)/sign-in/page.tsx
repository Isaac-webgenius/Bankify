import AuthForm from '@/components/AuthForm';
import { cookies } from 'next/headers';

const SignIn = async () => {
  console.log(cookies().getAll());  

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-in' />
    </section>
  )
}

export default SignIn;