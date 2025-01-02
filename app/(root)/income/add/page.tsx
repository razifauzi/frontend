"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import CustomInput from '@/components/CustomInputIncome'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form} from "@/components/ui/form"
import { expensesFormSchema } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { createIncome } from "@/lib/spring-boot/api"
import { useRouter } from "next/navigation"
import { incomeOptions } from "@/lib/utils"


const AddIncome = () => {
  const formSchema = expensesFormSchema('income-form')
  const router = useRouter()
  const [user] = useState(null);
  const [error] = useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const incomeData: Income = {
        id: data?.id || "",
        name: data.name ?? "",
        amount: data.amount ?? "0",
        description: data.description ?? "",
        frequency: data.frequency ?? "",
        program: data.program ?? "",
        fileName: data.fileName ?? "",
        // incomePrefix: data.incomePrefix ?? "",
      };

      await createIncome(incomeData);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  return (
    <section className='custom-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='mb-12 cursor-pointer flex items-center gap-1'>
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Add Income</h1>
        </Link>
      </header>

      {user ? (
        <div className='flex flex-col gap-4'></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  options={incomeOptions}
                />
              </div>
              <CustomInput
                control={form.control}
                name='fileName'
                label='Filename'
                placeholder='Enter your Specific filename'
              />
              <CustomInput
                control={form.control}
                name='description'
                label='Description'
                placeholder='Enter your Specific description'
              />
              {/* Disabled Input */}
              {/* <CustomInput
                control={form.control}
                name='incomePrefix'  // This is the field you want to disable
                label='Income Prefix'
                placeholder='Income Prefix (readonly)'
                disabled={true}  // Setting the field as disabled
              /> */}
              <Button variant="outline" size="sm" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Save Income"}
              </Button>
            </form>
          </Form>
        </>
      )}

      {error && <div className='text-red-500 text-center mt-4'>{error}</div>}
    </section>
  )
}

export default AddIncome
