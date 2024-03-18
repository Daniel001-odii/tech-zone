export function  generateStarRating(ratings) {
    // Calculate the sum of all values
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    // Calculate the average
    const rating =  sum / ratings.length;

    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    // Array to store the SVG elements
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(`<i class='bi bi-star-fill'></i>`);
    }
    // Half star if applicable
    if (halfStar) {
        stars.push(`<i class='bi bi-star-half'></i>`);
    }
    // Empty stars
    for (let i = stars.length; i < maxRating; i++) {
        stars.push(`<i class='bi bi-star'></i>`);
    }
    // Join the SVG elements and return as HTML
    return stars.join('');
};

export function  generateStarRatingFromInteger(rating) {


    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    // Array to store the SVG elements
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(`<i class='bi bi-star-fill'></i>`);
    }
    // Half star if applicable
    if (halfStar) {
        stars.push(`<i class='bi bi-star-half'></i>`);
    }
    // Empty stars
    for (let i = stars.length; i < maxRating; i++) {
        stars.push(`<i class='bi bi-star'></i>`);
    }
    // Join the SVG elements and return as HTML
    return stars.join('');
};