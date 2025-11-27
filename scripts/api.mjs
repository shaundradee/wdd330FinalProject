// base API function structures for The Dog API (https://thedogapi.com/)

export async function fetchBreeds() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const data = await response.json();
    return data;
}

export async function getBreedById(breedId) {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`);
    const data = await response.json();
    return data;
}