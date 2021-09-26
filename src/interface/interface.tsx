export interface Igenre {
    id: number;
    name: string;
}

export interface Iseries {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: Array<number>;
    id: string | number;
    name?: string;
    title?: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface Itrailer {
    name: string | undefined;
    link: string;
}
