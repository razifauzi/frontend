'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from './CustomInputIncome'
import { incomeFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


const IncomeForm = ({type}:{type:string}) => {

const router = useRouter()
const [user,setUser] = useState(null)
const [isLoading,setIsLoading] = useState(false)
const formSchema = incomeFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        throw new Error('Failed to submit income data');
      }
    
      const result = await response.json();
      console.log('Income successfully saved:', result);
    
      router.push('/');
    }catch (error){
       console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
   <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
      <Link 
          href='/'
          className='mb-12 cursor-pointer flex items-center gap-1'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='masjid logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Masjid Muar</h1>
      </Link>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">

        </div>
      ):(
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name='name'
                      label='Name'
                      placeholder='Enter your name'
                    />
                    <CustomInput
                      control={form.control}
                      name='frequency'
                      label='Frequency'
                      placeholder='Enter your frequency'
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name='amount'
                      label='Amount'
                      placeholder='Example: 123'
                    />
                    <CustomInput
                      control={form.control}
                      name='program'
                      label='Program'
                      placeholder='Example: Program'
                    />
                  </div>
                  <CustomInput
                      control={form.control}
                      name='description'
                      label='Description'
                      placeholder='Enter your Specific description'
                    />
                  
                </>
               <div className="flex flex-col gap-4">
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  Submit
                 </Button>
              </div>
            </form>
          </Form>
        </>
      )}
   </section>
  )
}

export default IncomeForm
