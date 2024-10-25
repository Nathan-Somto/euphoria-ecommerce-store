import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';

export default function CurrencyConverter() {
    const [currencyIndex, setCurrencyIndex] = useState<number>(0);

    const handleCurrencyChange = (currencyCodeIndex: number) => {
        setCurrencyIndex(currencyCodeIndex);

    };

    const currencies = [
        { code: "NGN", label: "Naira", flag: "/flags/nigeria.svg", alt: "Nigeria flag" },
        { code: "USD", label: "Dollar", flag: "/flags/usa.svg", alt: "USA flag" },
    ];

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
                    <DropdownMenuItem key={curr.code} onClick={() => handleCurrencyChange(index)}>
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
