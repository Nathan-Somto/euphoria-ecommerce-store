import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';
import { Currency, useCurrencyStore } from '@/hooks/use-currency';
import { symbol } from 'zod';
import { usePathname } from 'next/navigation';

export default function CurrencyConverter() {
    const [currencyIndex, setCurrencyIndex] = useState<number>(0);
    const { currency, setCurrency, initialized } = useCurrencyStore();
    const pathname = usePathname();
    const handleCurrencyChange = (currencyCodeIndex: number) => {
        setCurrencyIndex(currencyCodeIndex);
        const currency = currencies[currencyCodeIndex].symbol as Currency;
        setCurrency(currency);
    };
    const currencies = [
        { code: "NGN", label: "Naira", flag: "/flags/nigeria.svg", alt: "Nigeria flag", symbol: "₦" },
        { code: "USD", label: "Dollar", flag: "/flags/usa.svg", alt: "USA flag", symbol: "$" },
    ];
    React.useEffect(() => {
        // based on the currency chosen and if it is initialized
        // set the currency index
        if (!initialized) return;
        const index = currencies.findIndex((curr) => curr.symbol === currency);
        if (index === -1) {
            setCurrencyIndex(0);
            return;
        }
        setCurrencyIndex(index);
    }, [currency, initialized])
    if (pathname.startsWith('/auth')) return null;
    if (!initialized)
        // return a loading skeleton with tailwindcss pulse animations just use divs to mimic the space taken
        return (
            <div className="flex items-center gap-x-2 outline-none hover:opacity-50">
                <div className='relative size-6 overflow-hidden animate-pulse bg-gray-200'></div>
                <span className="font-medium bg-gray-200 animate-pulse w-10 h-4"></span>
                <ChevronDown className="h-4 w-4 animate-pulse" />
            </div>
        )


    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <div className="flex items-center gap-x-2 outline-none hover:opacity-50">
                    <div className='relative size-6 overflow-hidden'>
                        <Image src={currencies[currencyIndex].flag} alt={currencies[currencyIndex].alt} fill
                        />
                    </div>
                    <span className="font-medium">{currencies[currencyIndex].code}</span>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="lg:w-36 lg:max-w-md w-[90vw] max-w-none z-[999999999999999999]">
                <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                {currencies.map((curr, index) => (
                    <DropdownMenuItem
                        key={curr.code}
                        data-active={index === currencyIndex}
                        onClick={() => handleCurrencyChange(index)}>
                        <Image
                            className="mr-2  size-6"
                            src={curr.flag}
                            alt={curr.alt}
                            width={60}
                            height={60} />
                        <span>{curr.code}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
