'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTableDemo } from './DataTable'
import { cn } from '@/lib/utils'
import { DataTableExpenses } from './DataTableExpenses'

type Tab = {
    value: string;
    label: string;
    content: React.ReactNode;
};

const RecentTransactions = () => {
    const [activeTab, setActiveTab] = useState<string>('income');
    
    // Dynamic data for tabs (you can fetch this from an API or a static file)
    const tabsData: Tab[] = [
        { 
            value: 'income', 
            label: 'Income', 
            content: <DataTableDemo /> // This will render a data table for the "account" tab
        },
        { 
            value: 'expenses', 
            label: 'Expenses', 
            content: <DataTableExpenses/>// Content for the "password" tab
        },
        // Add more tabs here as needed
    ];

    return (
        <section className='recent-transactions'>
            <header className='flex items-center justify-between'>
                <h2 className='recent-transactions-label'>
                    Recent Transactions
                </h2>
                <Link href={`/income/`} className='view-all-btn'>
                    View all
                </Link>
            </header>

            <Tabs defaultValue={tabsData[0].value} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                    {tabsData.map((tab) => (
                        <TabsTrigger 
                            key={tab.value} 
                            value={tab.value} 
                            className={cn('banktab-item', { 'border-blue-600': activeTab === tab.value })}
                        >
                            <p className={cn('text-16 line-clamp-1 flex-1 font-medium text-gray-500', { 'text-blue-600': activeTab === tab.value })}>
                                {tab.label}
                            </p>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabsData.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className='space-y-4'>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}

export default RecentTransactions;
