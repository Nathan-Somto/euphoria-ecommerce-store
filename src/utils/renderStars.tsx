export type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 1.5 | 2.5 | 3.5 | 4.5 | 0.5;
export const renderStars = (rating: Rating) => {
    const stars = [];

    const [wholenumber, decimal] = rating.toString().split('.');
    for (let i = 0; i < parseInt(wholenumber); i++) {
        stars.push('/testimonials/full-star.svg')
    }
    if (decimal) {
        stars.push('/testimonials/half-star.svg')
    }
    for (let i = stars.length; i < 5; i++) {
        stars.push('/testimonials/empty-star.svg')
    }
    return stars.map((star, index) => (
        <img key={index} src={star} alt="star" />
    ))
}