'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { useState } from 'react'


export type FieldConfig = {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'date' | 'datetime' | 'checkbox' | 'textarea' | 'file'
  options?: { value: string; label: string }[]
  placeholder?: string
  description?: string
  accept?: string
}

type DynamicFormProps = {
  fields: FieldConfig[]
  schema: z.ZodType<any, any>
  onSubmit: (data: any) => void
  initialValues?: any
  isSubmitting: boolean
}

export function DynamicForm({ fields, schema, onSubmit, initialValues, isSubmitting }: DynamicFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {},
  })

  const [attachments, setAttachments] = useState<{ [key: string]: File | null }>({})

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0] || null
    setAttachments(prev => ({ ...prev, [fieldName]: file }))
    form.setValue(fieldName, file)
  }

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input type={field.type} placeholder={field.placeholder} {...form.register(field.name)} />
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case 'select':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <Select onValueChange={(value) => form.setValue(field.name, value)} defaultValue={form.getValues(field.name)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case 'date':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <DatePicker
              date={form.getValues(field.name)}
              setDate={(date) => form.setValue(field.name, date)}
            />
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case 'datetime':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <DateTimePicker
              date={form.getValues(field.name)}
              setDate={(date) => form.setValue(field.name, date)}
            />
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case 'checkbox':
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={form.getValues(field.name)}
                onCheckedChange={(checked) => form.setValue(field.name, checked)}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{field.label}</FormLabel>
              {field.description && <FormDescription>{field.description}</FormDescription>}
            </div>
            <FormMessage />
          </FormItem>
        )
      case 'textarea':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={field.placeholder}
                className="resize-none"
                {...form.register(field.name)}
              />
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
        case 'file':
          return (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={field.accept}
                  onChange={(e) => handleFileChange(e, field.name)}
                />
              </FormControl>
              {attachments[field.name] && (
                <FormDescription>
                  Selected file: {attachments[field.name]?.name}
                </FormDescription>
              )}
              {field.description && <FormDescription>{field.description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )
      default:
        return <div>Unsupported field type: {field.type}</div>
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={() => {
              const fieldElement = renderField(field)
              return fieldElement || <div>Error rendering field: {field.name}</div>
            }}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

