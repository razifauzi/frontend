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
              {name === 'description' ? (
                <Textarea
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
              ) : name === 'program' ? (
                <Select onValueChange={field.onChange} 
                        value={field.value} 
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Program</SelectLabel>
                      <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                      <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                      <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
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
