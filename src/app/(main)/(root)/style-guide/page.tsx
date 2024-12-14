'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/timeline/timeline';
import Pagination from '@/components/pagination';
import SearchBar from '@/components/search-bar';
import PriceRangeSlider from '@/components/price-range-slider';

export default function StyleGuidePage() {
    return (
        <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <header className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-gray-800">Style Guide</h1>
                <p className="text-lg text-secondary-foreground">A showcase of design elements and components</p>
            </header>

            {/* Colors Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-700">Colors</h3>
                <div className="flex flex-wrap gap-4">
                    {['background', 'foreground', 'disabled', 'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'destructive', 'muted', 'muted-foreground', 'accent', 'accent-foreground', 'popover', 'popover-foreground', 'card', 'card-foreground'].map(color => (
                        <div key={color} style={{
                            backgroundColor: `hsl(var(--${color}))`,
                        }} className={` text-black p-4 rounded-lg flex items-center justify-center w-32 h-24 shadow-md`}>
                            <span className="capitalize font-semibold">{color}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Typography Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-700">Typography</h3>
                <div className="space-y-2">
                    <h1 className="text-gray-800">Heading 1</h1>
                    <h2 className=" text-gray-700">Heading 2</h2>
                    <h3 className=" text-gray-600">Heading 3</h3>
                    <h4 className=" text-gray-500">Heading 4</h4>
                    <p className=" text-gray-700">Paragraph</p>
                    <p className="text-sm text-gray-500">Small Paragraph</p>
                </div>
            </section>

            {/* Buttons Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-700">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <Button className="px-4 py-2">Primary Button</Button>
                    <Button variant="secondary" className="px-4 py-2">Secondary Button</Button>
                    <Button variant="destructive" className="px-4 py-2">Destructive Button</Button>
                    <Button variant="outline" className="px-4 py-2">Outline Button</Button>
                    <Button variant="link" className="px-4 py-2">Link Button</Button>
                    <Button variant="neutral" className="px-4 py-2">Neutral Button</Button>
                    <Button variant="elevated" className="px-4 py-2">Elevated Button</Button>
                </div>
            </section>
            {/* Timeline section */}
            <section>
                <h3 className="text-2xl font-semibold text-gray-700">Timeline</h3>
                <p>Vertical</p>
                <Timeline
                    items={[
                        { label: 'Order Placed', hint: 'Order was placed at 15th june 2024' },
                        { label: 'Paid', hint: "27th june 2024" },
                        { label: 'Order Confirmed', hint: '1st july 2024' },
                        { label: 'Delivered', hint: '12th july 2024' }
                    ]}
                    progress={100}
                    className='w-[500px]'
                    variant='vertical'
                />
                <p>Horizontal</p>
                <Timeline
                    items={[
                        { label: 'Order Placed', hint: 'Order was placed at 15th june 2024' },
                        { label: 'Paid', hint: "27th june 2024" },
                        { label: 'Order Confirmed', hint: '1st july 2024' },
                        { label: 'Delivered', hint: '12th july 2024' }
                    ]}
                    progress={100}
                    className='w-[500px]'
                    variant='horizontal'
                />
            </section>
            {/* Pagination section */}
            <section>
                <h3 className="text-2xl font-semibold text-gray-700">Pagination</h3>
                <Pagination
                    currentPage={1}
                    onNext={() => { }}
                    totalPages={4}
                    onPrevious={function (): void {
                    }}
                />
            </section>
            {/* Search bar */}
            <section>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Search bar</h3>
                <SearchBar
                    onChange={function (value: string): void {
                        console.log(value)
                    }} value={''}
                />
            </section>
            {/* Price Range Slider */}
            <section>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Price Range Slider</h3>
                <PriceRangeSlider
                    initialMinValue={10}
                    initialMaxValue={70}
                    min={0}
                    max={100}
                    onChange={function (min: number, max: number): void {
                        console.log(min, max)
                    }}
                />
            </section>
        </div>
    );
}
