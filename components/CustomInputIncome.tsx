'use client'

import React from 'react'
import {FormControl,FormField,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from 'zod'
import { incomeFormSchema } from '@/lib/utils'

const formSchema = incomeFormSchema('income-form')


interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInputIncome = ({control,name,label,placeholder}: CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
     <div className='form-item'>
        <FormLabel className='form-label'>
          {label}
        </FormLabel>
        <div className="flex w-full flex-col">
          <FormControl>
            <Input
              placeholder={placeholder}
              className='input-class'
              type='text'
              {...field}
            />
          </FormControl>
          <FormMessage 
            className='form-message mt-2'
          />
        </div>
     </div>
    )}
  />
  )
}

export default CustomInputIncome
