import { Button } from '@/components/ui/button';
import { Rating } from '@/utils/renderStars';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ratingIcons = ['/testimonials/empty-star.svg', '/testimonials/half-star.svg', '/testimonials/full-star.svg'];



function ProductRating() {
    const [rating, setRating] = useState<Rating | null>(null);
    const [hoverRating, setHoverRating] = useState<Rating | null>(null);

    const getFeedbackText = (rating: Rating | null) => {
        if (rating === null) return 'Hover over the stars to rate';
        if (rating <= 1) return 'Poor';
        if (rating <= 2) return 'Fair';
        if (rating <= 3) return 'Good';
        if (rating <= 4) return 'Very Good';
        return 'Excellent';
    };


    const handleClick = (value: Rating) => setRating(value);

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue: Rating = (index + 1) as Rating;
            const isHalf = hoverRating ? hoverRating - starValue === -0.5 : false;
            const isFilled = hoverRating ? hoverRating >= starValue : rating === null ? false : rating >= starValue;

            return (
                <motion.img
                    key={index}
                    src={
                        isFilled
                            ? ratingIcons[2]
                            : isHalf
                                ? ratingIcons[1]
                                : ratingIcons[0]
                    }
                    alt={`${starValue} star`}
                    className="w-12 h-12 cursor-pointer"
                    onMouseEnter={(e) => {
                        const { left, width } = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - left;
                        const isHalf = x < width / 2;
                        setHoverRating(isHalf ? (starValue - 0.5) as Rating : starValue)
                    }}
                    onClick={() => handleClick(isHalf ? (starValue - 0.5) as Rating : starValue)}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                />
            );
        });
    };

    return (
        <div className="space-y-4">
            <div className="mt-3 flex flex-col">
                <div className="flex items-center gap-1">{renderStars()}</div>
                <p className="text-gray-500 mt-2 text-xl font-medium">{getFeedbackText(hoverRating || rating)}</p>
            </div>
            <Button variant="secondary" className="mt-4">
                Submit
            </Button>
        </div>
    );
}

export default ProductRating;
