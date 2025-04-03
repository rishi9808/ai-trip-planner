import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.photos',
            'places.id'
        ]
    },
    timeout: 10000 // Add a timeout to prevent hanging requests
}

export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config)

// Add a function to check if an image URL is valid
export const checkImageExists = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error checking image:', error);
        return false;
    }
};

export const PHOTO_REF_URL = "https://places.googleapis.com/v1/NAME/media?maxHeightPx=1000&maxWidthPx=1000&key=" + process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;