'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/CustomInputIncome';
import { useRouter } from 'next/navigation';
import { fetchIncomeById, updateIncome } from '@/lib/spring-boot/api';

export const incomeFormSchema = (type: string) => z.object({
  name: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Name must be at least 3 characters long'),
  frequency: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Frequency must be at least 3 characters long'),
  description: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Description must be at least 3 characters long'),
  amount: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Amount must be at least 3 characters long'),
  program: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Program must be at least 3 characters long'),
  fileName: type === 'income-form' ? z.string().optional() : z.string().min(3, 'Filename must be at least 3 characters long'),
});

interface Params {
  id: string;
}

const TransactionHistoryByID = ({ type, params }: { type: string; params: Params }) => {
  const { id } = params;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate the schema dynamically based on the type
  const formSchema = incomeFormSchema(type);

  // Initialize useForm with the resolved schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      frequency: '',
      amount: '',
      program: '',
      description: '',
      fileName: '',
    },
  });

  // Fetch income details by ID (example implementation)
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setIsLoading(true);
        const incomeData = await fetchIncomeById(id);
        form.reset(incomeData); // Populate form with fetched data
      } catch  {
        setError('Failed to fetch income details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncome();
  }, [id]);

  const onSubmit = async (data: Partial<Income>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateIncome(id, data); // Updated to use updateIncome
      console.log('Income successfully updated:', result);
      router.push('/transaction-history'); // Redirect to income list
    } catch  {
      setError('Failed to update income details.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='mb-12 cursor-pointer flex items-center gap-1'>
          <Image src='/icons/logo.svg' width={34} height={34} alt='masjid logo' />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Masjid Muar</h1>
        </Link>
      </header>

      {user ? (
        <div className='flex flex-col gap-4'></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <>
                <div className='flex gap-4'>
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
                <div className='flex gap-4'>
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
                <CustomInput
                  control={form.control}
                  name='fileName'
                  label='Filename'
                  placeholder='Enter your Specific filename'
                />
              </>
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}

      {error && <div className='text-red-500 text-center mt-4'>{error}</div>}
    </section>
  );
};

export default TransactionHistoryByID;

