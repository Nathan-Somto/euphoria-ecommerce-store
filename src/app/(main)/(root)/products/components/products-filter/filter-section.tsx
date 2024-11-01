'use client'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react'
import { FilterValues, filterKeys } from './types.d'
import Image from 'next/image'
type FilterSectionProps<T extends filterKeys> = {
    headingText: Capitalize<T> | Capitalize<'filter'>
    disableCollapse?: boolean
    useFilterIcon?: boolean
    filterKey: T
    filterAction: (key: T, value: string | number) => void
    filterValues: FilterValues
    defaultOpen?: boolean
    value: string | number
    renderItems: (filterAction: (key: T, value: string | number) => void, isActive: (key: filterKeys, value: string | number) => boolean, value?: string | number) => React.ReactNode
}
function FilterSection<T extends filterKeys>({
    filterAction,
    headingText,
    defaultOpen,
    filterKey,
    filterValues,
    renderItems,
    value,
    disableCollapse,
    useFilterIcon
}: FilterSectionProps<T>) {
    const [open, setOpen] = React.useState(defaultOpen);
    const [renderCount, setRenderCount] = React.useState(0);
    const isActive = (key: filterKeys, value: string | number) => {
        return filterValues[key] === value
    }
    return (
        <div>
            <div
                className="w-full"
            >
                <div className="flex items-center justify-between space-x-4 px-4 py-3 border-b border-t border-y-[#BEBCBD]">
                    <h4 data-active={open} className="font-semibold text-[#807D7E]/80  data-[active=true]:!text-primary-foreground text-xl">
                        {headingText}
                    </h4>

                    <Button
                        disabled={disableCollapse}
                        onClick={() => {
                            setOpen(!open)
                            setRenderCount(prev => prev + 1);
                        }} variant="ghost" size="sm" className="w-9 p-0">
                        {!useFilterIcon ? open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" /> : <Image src={'/products/filter.svg'} alt="filter icon" width={30} height={30} className='h-7 w-7' />}
                        <span className="sr-only">Toggle</span>
                    </Button>
                </div>
                <AnimatePresence
                    mode='sync'
                    presenceAffectsLayout
                >
                    {
                        open && (
                            <motion.div
                                key={filterKey}
                                className='overflow-hidden'
                                initial={
                                    renderCount > 0 ? {
                                        height: 0,
                                    } : {
                                        height: 'auto'
                                    }}
                                animate={{
                                    height: 'auto'
                                }}
                                exit={{
                                    height: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.02,
                                    ease: [0.04, 0.62, 0.23, 0.98]
                                }}
                            >
                                {renderItems(filterAction, isActive, value)}
                            </motion.div>

                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FilterSection