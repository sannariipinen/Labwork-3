export enum SearchType {
    all ='',
    movie = 'movie',
    series = 'series',
    episode = 'episode',
}

export interface SearchResult {
    Title: string
    Year: string
    Poster: string
    imdbID: string
    Type: string
}

export interface DetailsResult {
    Genre: string
    Title: string
    Year: string
    Poster: string
    Plot: string
    imdbRating: string
    Director: string
    Actors: string
    Website: string
}

export const useApi = () => {
    let url = 'https://www.omdbapi.com/';
    let apiKey = 'a88690ee';

const searchData = async (title: string, type: SearchType): Promise<SearchResult[]> => {
    const response = await fetch(
        `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
    );
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    if (result.Response === "False") {
     return [];   
    }
    return result.Search || [];
};

const getDetails = async (id: string): Promise<DetailsResult> => {
    const response = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
};

return {
    searchData,
    getDetails,
};   
};

export default useApi;