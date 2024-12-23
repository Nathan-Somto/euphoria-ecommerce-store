import { cn } from '@/lib/utils';
import { clamp } from '@/utils/clamp';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';

interface Items {
    hint?: string;
    Hint?: () => React.ReactNode;
    label: string;
}

interface Props {
    progress?: number; // from 1 to 100
    items: Items[];
    className?: string;
    variant?: 'horizontal' | 'vertical'
}

export default function Timeline({ items, progress = 50, variant = 'horizontal', className = '' }: Props) {
    const clampedProgress = clamp(0, progress, 100);
    // progress is a percentage of the total items
    const currentIndex = Math.ceil((clampedProgress / 100) * items.length) - 1;
    return (
        <ul className={cn("flex items-center w-full", className, variant === 'vertical' && 'block')}>
            {items.map(({ Hint, ...item }, index) => {
                const isCurrent = currentIndex === index;
                const isCompleted = currentIndex > index && !isCurrent;

                return (
                    <li key={index} className={cn("flex flex-col items-center w-full", variant === 'vertical' && 'flex-row h-full gap-4')}>
                        <div className={cn('flex flex-1 w-full items-center', variant === 'vertical' && 'flex-col h-full flex-none w-auto')}>
                            {index !== 0 && (
                                <div
                                    data-index={index}
                                    className={
                                        cn(
                                            `h-1  ${isCompleted || isCurrent ? 'bg-primary' : 'bg-[#BEBCBD]'}`,
                                            variant === 'vertical' && 'w-1 h-8 flex-shrink-0',
                                            variant === 'horizontal' && 'flex-grow',
                                        )}
                                />
                            )}

                            <div
                                className={cn(`
                              relative 
                               flex 
                              items-center 
                              justify-center 
                              flex-shrink-0 
                              size-4 
                              rounded-full 
                              ${isCompleted ? 'border-primary bg-primary' : isCurrent ? 'border-[#CFCFCF] !border-[3px] !size-5 bg-gray-100' : 'bg-[#BEBCBD] !border-0'}`,
                                    variant === 'vertical' && isCurrent && 'flex-col -mx-[2px]',
                                )} />
                            {index !== items.length - 1 && (
                                <div
                                    data-index={index}
                                    className={
                                        cn(
                                            `h-1  ${isCompleted ? 'bg-primary' : 'bg-[#BEBCBD]'}`,
                                            variant === 'vertical' && 'w-1 h-8 flex-shrink-0',
                                            variant === 'horizontal' && 'flex-grow',
                                        )}
                                />
                            )}
                        </div>
                        {
                            !isCompleted && !isCurrent ? (
                                <span className={cn(`mt-2 cursor-pointer disabled:pointer-events-none text-sm font-medium text-left
                                    ${isCompleted ? 'text-primary' : isCurrent ? 'text-gray-800 font-semibold' : 'text-[#BEBCBD]'}
                                    ${index === 0 ? 'self-start -ml-5' :
                                        index === items.length - 1 ?
                                            'self-end -mr-5' :
                                            'self-center'}`,
                                    variant === 'vertical' && '!m-0')}
                                >
                                    {item.label}
                                </span>
                            ) :

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger
                                            asChild
                                            disabled={!isCompleted || !isCurrent}
                                        >
                                            <span
                                                className={cn(`mt-2 cursor-pointer disabled:pointer-events-none text-sm font-medium text-left
                                            ${isCompleted ? 'text-primary' : isCurrent ? 'text-gray-800 font-semibold' : 'text-[#BEBCBD]'}
                                            ${index === 0 ? 'self-start -ml-5' :
                                                        index === items.length - 1 ?
                                                            'self-end -mr-5' :
                                                            'self-center'}`, variant === 'vertical' && '!m-0')}
                                            >
                                                {item.label}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={6} side={variant === 'vertical' ? 'right' : 'bottom'} className='h-[67px] px-4 py-1 items-center flex bg-neutral rounded-[8px]'>
                                            <TooltipArrow className='!fill-neutral  w-4 h-3' />
                                            {Hint ? <Hint /> : <p>{item.hint}</p>}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                        }
                    </li>
                );
            })}
        </ul>
    );
}
