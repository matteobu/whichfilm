// SEARCH COMPONENT
export interface SearchResultsProps {
  results: OramaSearchResponse;
  selectedFestival: string;
  selectedGenre: string;
  noSearch: boolean;
}

// NAVLINK
export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

// FILM CARD
export interface FilmCardProps {
  film: OramaSearchHits;
}
// SMALL FILM CARD
export interface SmallFilmCardProps {
  film: OramaSearchHits;
}
// FILM FESTIVAL CARD

export interface Festival {
  name: string;
  location: string;
  overview: string;
  imageUrl?: string;
}

export interface FilmFestivalCardProps {
  festival: Festival;
}

// ORAMA SEARCH
export type OramaSearchResponse = {
  count: number;
  elapsed: {
    raw: number;
    formatted: string;
  };
  hits: OramaSearchHits[];
};

export type OramaSearchHits = {
  id: string;
  score: number;
  document: {
    adult: boolean;
    awards: string[];
    backdrop_path: string | null;
    belongs_to_collection: string | null;
    budget: number;
    genres: string[];
    homepage: string;
    id: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: string[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    festival: string;
    vote_average: number;
    vote_count: number;
    notStrictIndie: boolean;
  };
};
