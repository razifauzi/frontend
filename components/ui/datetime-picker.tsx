"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateTimePicker({
  date,
  setDate,
}: {
  date?: Date
  setDate: (date?: Date) => void
}) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | undefined>(date)

  React.useEffect(() => {
    setSelectedDateTime(date)
  }, [date])

  const onDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const newDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        selectedDateTime?.getHours() || 0,
        selectedDateTime?.getMinutes() || 0
      )
      setSelectedDateTime(newDateTime)
      setDate(newDateTime)
    }
  }

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number)
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime)
      newDateTime.setHours(hours)
      newDateTime.setMinutes(minutes)
      setSelectedDateTime(newDateTime)
      setDate(newDateTime)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime}
          onSelect={onDateChange}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <Input
              type="time"
              value={selectedDateTime ? format(selectedDateTime, "HH:mm") : ""}
              onChange={onTimeChange}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

