'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/CustomInputIncome';
import { useParams, useRouter } from 'next/navigation';
import { fetchExpensesById, updateExpenses  } from '@/lib/spring-boot/api';
import { incomeFormSchema } from '@/lib/utils';
import { expensesOptions } from "@/lib/utils"

const ExpensesByID = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate the schema dynamically based on the type
  const formSchema = incomeFormSchema('income-form');

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

  useEffect(() => {
    if (!id || Array.isArray(id)) return; // If id is not available or is an array, skip

    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const expensesData = await fetchExpensesById(id); // Now `id` is guaranteed to be a string
        form.reset(expensesData); // Populate form with fetched data
      } catch {
        setError('Failed to fetch expenses details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [id, form]); 

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const expenseId = Array.isArray(id) ? id[0] : id;

      const expensesData = {
        id: expenseId || '',
        name: data.name ?? '',
        amount: data.amount ?? '',
        description: data.description ?? '',
        frequency: data.frequency ?? '',
        program: data.program ?? '',
        fileName: data.fileName ?? '',
      };
      const result = await updateExpenses(expenseId, expensesData); 
      console.log('Expenses successfully updated:', result);
      router.push('/expenses'); 
    } catch  {
      setError('Failed to update expenses details.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className='custom-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='mb-12 cursor-pointer flex items-center gap-1'>
         
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Edit Expenses</h1>
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
                    options={expensesOptions}
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

export default ExpensesByID;

