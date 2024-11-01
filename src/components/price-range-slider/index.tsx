import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

type PriceRangeSliderProps = {
    min: number;
    max: number;
    step?: number;
    initialMinValue?: number;
    initialMaxValue?: number;
    onChange: (min: number, max: number) => void;
}

function PriceRangeSlider({
    min,
    max,
    step = 1,
    initialMinValue,
    initialMaxValue,
    onChange,
}: PriceRangeSliderProps) {
    const [minValue, setMinValue] = useState<number>(initialMinValue || min);
    const [maxValue, setMaxValue] = useState<number>(initialMaxValue || max);
    // initially set to true so that the onChange is not called when the component mounts
    const [isSliding, setIsSliding] = useState<boolean>(true);
    useEffect(() => {
        // don't call onChange untill the user stops sliding;
        if (!isSliding) {
            console.log('on change called')
            onChange(minValue, maxValue);
        }
    }, [minValue, maxValue, isSliding]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("minValue slider clicked")
        const value = Math.min(Number(event.target.value), maxValue - step);
        setMinValue(value);
        setIsSliding(true)
    };
    const handleOnSlidingEnd = () => {
        console.log('sliding has ended')
        setIsSliding(false);
    }
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("maxValue slider clicked")
        const value = Math.max(Number(event.target.value), minValue + step);
        setMaxValue(value);
        setIsSliding(true)
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md p-4 ">
            <div className="relative w-full">
                <div className="absolute inset-0 h-1 bg-gray-300 rounded-full"></div>
                <div
                    className="absolute h-1 bg-primary rounded-full"
                    style={{
                        left: `${((minValue - min) / (max - min)) * 100}%`,
                        right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
                    }}
                ></div>
                {/* Minimum Price Slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}
                    onMouseUp={handleOnSlidingEnd}
                    onTouchEnd={handleOnSlidingEnd}
                    className="absolute top-0 w-full h-[5px] bg-none bg-transparent appearance-none pointer-events-none range-thumb"
                />
                {/* Maximum Price Slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onMouseUp={handleOnSlidingEnd}
                    onTouchEnd={handleOnSlidingEnd}
                    onChange={handleMaxChange}
                    className="absolute w-full top-0 h-[5px]  bg-transparent appearance-none pointer-events-none range-thumb"
                />
            </div>
            <div className="flex justify-between w-full text-gray-600 mt-8">
                <Button variant={'outline'} className='min-w-[97px] rounded-[8px] h-8'>${minValue}</Button>
                <Button variant={'outline'} className='min-w-[97px] rounded-[8px] h-8'>${maxValue}</Button>
            </div>
        </div>
    );
};

export default PriceRangeSlider;
