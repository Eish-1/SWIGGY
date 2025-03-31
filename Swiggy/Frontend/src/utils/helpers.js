// Helper function to get a food image based on item name
export function getRandomFoodImage(itemName = '') {
    const foodImages = [
        '/Food/grilled_non_veg.jpg',
        '/Food/Daal_Makhani.jpg',
        '/Food/naan.jpg',
        '/Food/pasta.jpg',
        '/Food/cheese_sauce.jpg',
        '/Food/corn_curry.jpg',
        '/Food/noodles.jpg',
        '/Food/shrimp.jpg',
        '/Food/French_fries.jpg',
        '/Food/potato_tomato.jpg',
        '/Food/Royal_thali.jpg',
        '/Food/soyachapp_gobhi_rice.jpg'
    ];

    const lowerName = itemName.toLowerCase();

    if (lowerName.includes('chicken') || lowerName.includes('meat') || lowerName.includes('beef')) {
        return '/Food/grilled_non_veg.jpg';
    } else if (lowerName.includes('pasta') || lowerName.includes('spaghetti')) {
        return '/Food/pasta.jpg';
    } else if (lowerName.includes('dal') || lowerName.includes('lentil')) {
        return '/Food/Daal_Makhani.jpg';
    } else if (lowerName.includes('naan') || lowerName.includes('bread')) {
        return '/Food/naan.jpg';
    } else if (lowerName.includes('fries')) {
        return '/Food/French_fries.jpg';
    } else if (lowerName.includes('shrimp') || lowerName.includes('fish') || lowerName.includes('seafood')) {
        return '/Food/shrimp.jpg';
    } else if (lowerName.includes('noodle') || lowerName.includes('chow')) {
        return '/Food/noodles.jpg';
    } else if (lowerName.includes('cheese') || lowerName.includes('sauce')) {
        return '/Food/cheese_sauce.jpg';
    } else if (lowerName.includes('thali') || lowerName.includes('platter')) {
        return '/Food/Royal_thali.jpg';
    } else if (lowerName.includes('rice')) {
        return '/Food/soyachapp_gobhi_rice.jpg';
    } else if (lowerName.includes('curry') || lowerName.includes('vegetable')) {
        return '/Food/corn_curry.jpg';
    }

    // Return a random food image if no match
    return foodImages[Math.floor(Math.random() * foodImages.length)];
} 