'use client'

import React from 'react'
import {FormControl,FormField,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from 'zod'
import { incomeFormSchema } from '@/lib/utils'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = incomeFormSchema('income-form')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    options?: { key: string; label: string }[];
}

const CustomInputIncome = ({control,name,label,placeholder,options}: CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
     <div className='flex flex-col gap-1.5'>
        <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
          {label}
        </FormLabel>
        <div className="flex w-full flex-col">
          <FormControl>
              {name === 'description' ? (
                <Textarea
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
              ) : name === 'program' && options ? (
                <Select onValueChange={field.onChange} 
                        value={field.value} 
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
              )}
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
