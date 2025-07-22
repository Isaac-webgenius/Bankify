"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Form } from "./ui/form";
import CustomInput from './CustomInput';
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signUp } from "@/lib/actions/user.actions";




const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = authFormSchema(type);

  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  });
  // Define submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with appwrite and create plaid token

      if(type === 'sign-up') {
        const newUser = await signUp(data);
        

        setUser(newUser);
        
      }
      
      if(type === 'sign-in'){
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // })

        // if(response) router.push('/');
      }

    } catch(error) { 
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8 ">
        <Link href="/" className="flex items-center gap-1 cursor-pointer">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon Logo"
          />

          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Connect Account"
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Connect your account to get started"
                : "Please, enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-5">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="ex: John" type={""} />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="ex: Doe" type={""} />
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" type={""} />
                  <CustomInput control={form.control} name="city" label="City" placeholder="Enter your residence city" type={""} />

                  <div className="flex gap-5">
                    <CustomInput control={form.control} name="state" label="State" placeholder="ex: NY" type={""} />
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 11001" type={""} />
                  </div>

                  <div className="flex gap-5">
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" type={""} />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex: 1234" type={""} />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" type={""} />

              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" type={""} />
            
              <div className="flex flex-col gap-4">
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin'/>
                      &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"    
              }
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
