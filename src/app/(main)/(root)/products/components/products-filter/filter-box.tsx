'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import PriceRangeSlider from '@/components/price-range-slider';
import { FilterValues, filterKeys } from './types.d';
import FilterSection from './filter-section';
import { category, colors, sizes, type } from './constants';
import { cn } from '@/lib/utils';

export default function FilterBox() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // initial state defaults for filter values
    const [filterValues, setFilterValues] = React.useState<FilterValues>({
        category: 'all',
        size: 'none',
        price: '30 90',
        type: 'none',
        colors: 'transparent'
    });

    const filterAction = (key: filterKeys, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        router.replace(`?${params.toString()}`);
        const newFilterValues = { ...filterValues, [key]: value };
        setFilterValues(newFilterValues);
    };

    useEffect(() => {
        console.log("the search params are", searchParams.toString())
        const params = new URLSearchParams(searchParams.toString());

        const updatedFilterValues = Object.keys(filterValues).reduce((acc, key) => {
            const param = params.get(key);
            return param ? { ...acc, [key]: param } : acc;
        }, filterValues);

        setFilterValues(updatedFilterValues);
    }, []);

    return (
        <div className='h-auto border-y-transparent lg:border-[#BEBCBD] max-w-[295px] w-full  border bg-white'>
            {/* Category Filter */}
            <FilterSection
                headingText='Filter'
                defaultOpen
                disableCollapse
                useFilterIcon
                filterValues={filterValues}
                filterKey='category'
                filterAction={filterAction}
                value={filterValues.category}
                renderItems={(filterAction, isActive, value) => (
                    <RadioGroup
                        defaultValue={`${value}`}
                        className='py-2'
                        value={`${value}`}
                        onValueChange={(e) => filterAction('category', e)}>
                        {category.map(item => (
                            <div key={item.id} className="flex items-center px-6 justify-between">
                                <label
                                    htmlFor={item.id}
                                    data-active={isActive('category', item.name)}
                                    className="text-sm font-normal capitalize data-[active=true]:text-primary"
                                >
                                    {item.name}
                                </label>
                                <RadioGroupItem
                                    value={item.name}
                                    id={item.id}
                                />
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />

            {/* Colors Filter */}
            <FilterSection
                headingText='Colors'
                filterAction={filterAction}
                filterKey='colors'
                value={filterValues.colors}
                filterValues={filterValues}
                defaultOpen
                renderItems={(filterAction, isActive, value) => (
                    <div className='flex flex-wrap px-5 gap-3 py-3 text-center text-[#8A8989]'>
                        {colors.map(item => (
                            <div key={item.id}>
                                <div className="relative h-9 w-9">
                                    {
                                        isActive('colors', item.color) && (
                                            <div
                                                className={`absolute top-0 left-0 h-full w-full right-0 bottom-0 rounded-md border-2 bg-black/50 border-[#8A8989]/50`}
                                            />
                                        )
                                    }
                                    <button
                                        style={{
                                            backgroundColor: item.color,
                                        }}
                                        onClick={() => filterAction('colors', item.color)}
                                        type="button"
                                        className={cn('h-9 w-9 rounded-md', item.color === 'transparent' && 'border-2 bg-white/30')}
                                    />
                                </div>
                                <p className='font-semibold text-sm'>{item.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            />

            {/* Size Filter */}
            <FilterSection
                headingText='Size'
                filterAction={filterAction}
                filterKey='size'
                defaultOpen
                filterValues={filterValues}
                value={filterValues.size}
                renderItems={(_, isActive) => (
                    <div className='flex flex-wrap gap-3 px-5 py-2'>
                        {sizes.map(item => (
                            <Button
                                key={item.id}
                                variant={'outline'}
                                value={item.size}
                                onClick={() => filterAction('size', item.size)}
                                data-active={isActive('size', item.size)}
                                className='rounded-[8px] border-[#BEBCBD] data-[active=true]:bg-accent data-[active=true]:text-accent-foreground'
                            >
                                {item.size}
                            </Button>
                        ))}
                    </div>
                )}
            />

            {/* Price Filter */}
            <FilterSection
                headingText='Price'
                defaultOpen
                filterAction={filterAction}
                filterKey='price'
                filterValues={filterValues}
                value={filterValues.price}
                renderItems={() => {
                    const [initialMinValue, initialMaxValue] = filterValues.price.split(' ');
                    return <div className='flex flex-wrap gap-3 px-5 py-2'>
                        <PriceRangeSlider
                            max={100}
                            min={10}
                            step={10}
                            initialMaxValue={+initialMaxValue}
                            onChange={(min, max) => filterAction('price', `${min} ${max}`)}
                            initialMinValue={+initialMinValue}
                        />
                    </div>
                }}
            />

            {/* Type Filter */}
            <FilterSection
                headingText='Type'
                defaultOpen
                filterValues={filterValues}
                filterKey='type'
                filterAction={filterAction}
                value={filterValues.type}
                renderItems={(filterAction, isActive, value) => (
                    <RadioGroup
                        defaultValue={`${value}`}
                        className='py-2'
                        onValueChange={(e) => filterAction('type', e)}
                    >
                        {type.map(item => (
                            <div key={item.id} className="flex items-center px-6 justify-between">
                                <label
                                    htmlFor={item.id}
                                    data-active={isActive('type', item.value)}
                                    className="text-sm font-normal capitalize data-[active=true]:text-primary"
                                >
                                    {item.label}
                                </label>
                                <RadioGroupItem
                                    value={item.value}
                                    id={item.id}
                                />
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
        </div>
    );
}
