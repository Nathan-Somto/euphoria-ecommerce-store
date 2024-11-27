import { COUNTRIES } from './countries'
import { ChevronDownIcon, CheckIcon, SearchIcon, EarthIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from './dropdown-menu'
interface SelectorProps {
    value: string
    onChange: (value: string) => void
    name?: string
    id?: string
    disabled?: boolean
    containerClassName?: string
    selectClassName?: string
    placeholder?: string
    showFlagsInSelector?: boolean
    defaultCountry?: typeof COUNTRIES[number]['value']
}
import React from 'react'
import { cn } from '@/lib/utils'
const getImgString = (val: string) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${val}.svg`
export function CountrySelector({
    value,
    placeholder,
    disabled,
    onChange,
    name,
    id,
    containerClassName,
    selectClassName,
    showFlagsInSelector = true,
    defaultCountry
}: SelectorProps) {
    const [query, setQuery] = React.useState('')
    React.useEffect(() => {
        if (!value && defaultCountry) {
            onChange(defaultCountry)
        }
    }, [defaultCountry])
    const selectedCountry = React.useMemo(() =>
        COUNTRIES.find(country => country.title === value)
        , [value])
    const filteredCountries = React.useMemo(() => {
        if (!query) return COUNTRIES
        return COUNTRIES.filter(country => country.title.toLowerCase().includes(query.toLowerCase()))
    }, [query])
    const foundDefaultCountry = React.useMemo(() => {
        if (defaultCountry) return COUNTRIES.find(country => country.value === defaultCountry)
        return undefined
    }, [defaultCountry])
    return (
        <div
            className={cn("relative flex items-center gap-x-2 w-full border border-neutral-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-all duration-150 h-10", containerClassName)}
        >
            {/* Dropdown menu */}
            <DropdownMenu>
                <DropdownMenuTrigger disabled={disabled}>
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        {(selectedCountry || foundDefaultCountry) ? (
                            <img
                                src={selectedCountry ? getImgString(selectedCountry.value) : getImgString(foundDefaultCountry?.value ?? COUNTRIES[0].value)}
                                className="size-5 rounded-sm object-cover flex-shrink-0"
                                alt={`${selectedCountry?.title ?? foundDefaultCountry?.title ?? COUNTRIES[0].title
                                    } Flag`}
                            />
                        ) : (
                            <EarthIcon size={24} />
                        )}
                        <ChevronDownIcon
                            size={16}
                            className="flex-shrink-0 text-neutral-500"
                        />
                    </div>
                </DropdownMenuTrigger>

                {/* Dropdown menu content */}
                <DropdownMenuContent
                    side="bottom"
                    sideOffset={8}
                    className="relative z-[5000] max-h-[200px] w-[300px] bg-white rounded-md shadow-lg border border-neutral-200 overflow-auto scrollbar-hide"
                >
                    {/* Search input */}
                    <div className="flex sticky top-0 items-center gap-x-2 px-3 py-2 bg-white z-10 border-b border-neutral-200">
                        <SearchIcon size={16} className="text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search Country"
                            className="w-full text-sm bg-transparent outline-none placeholder-neutral-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Dropdown items */}
                    <div className="flex flex-col gap-y-1 px-2 py-2">
                        {filteredCountries.length === 0 ? (
                            <p className="text-center text-sm text-neutral-400">
                                No Country Found
                            </p>
                        ) : (
                            filteredCountries.map((country) => (
                                <button
                                    onClick={() => onChange(country.title)}
                                    key={country.value}
                                    className={`flex items-center gap-x-2 w-full rounded-md px-3 py-2 text-sm outline-none transition-colors 
                                ${selectedCountry?.title === country.title
                                            ? "bg-blue-100 text-blue-600"
                                            : "hover:bg-neutral-100 focus:bg-neutral-100"
                                        }`}
                                >
                                    {
                                        showFlagsInSelector && (
                                            <img
                                                src={getImgString(country.value)}
                                                alt={`${country.title} Flag`}
                                                className="size-4 rounded object-cover"
                                            />
                                        )
                                    }
                                    <span>{country.title}</span>
                                    {selectedCountry?.title === country.title && (
                                        <CheckIcon
                                            size={16}
                                            className="ml-auto text-blue-500"
                                        />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Input box */}
            <input
                name={name}
                disabled={disabled}
                type="text"
                value={selectedCountry?.title ?? foundDefaultCountry?.title ?? placeholder ?? "Select a country"}
                readOnly
                className="w-full text-sm bg-transparent outline-none placeholder-neutral-400 ml-3"
            />
        </div>

    )
}
