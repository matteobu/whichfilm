import { Dispatch, SetStateAction } from 'react';

// SEARCH COMPONENT
export interface SearchResultsProps {
  results: OramaSearchResponse;
  selectedFestival: string;
  selectedGenre: string;
  noQueryResults: boolean;
  isLoading: boolean;
  handleNoQueryResults: Dispatch<SetStateAction<boolean>>;
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
  film: OramaSearchHitDocument;
}
export interface Festival {
  id: number;
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

export type CastInfo = {
  original_name: string;
  profile_path: string;
  character: string;
};
export type CrewInfo = {
  original_name: string;
  profile_path: string;
  job: string;
};

export type IndieAwards = {
  notStrictIndie: boolean;
  noteOnIndie: string;
} & {
  [festivalName: string]: { awards: (string | null)[] } | boolean | string;
};

export type OramaSearchHits = {
  id: string;
  score: number;
  document: OramaSearchHitDocument;
};

export type OramaSearchHitDocument = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number;
  cast: CastInfo[];
  crew: CrewInfo[];
  genres: string[];
  homepage: string;
  id: string;
  imdb_id: string;
  infoIndieAndAwards: IndieAwards;
  origin_country: string[];
  original_language: string;
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
  vote_average: number;
  vote_count: number;
};

// FETCH FILM HOME PAGE

export enum SearchRandomType {
  RANDOM = 'random',
  OVERALL = 'overall',
  BEST_OF_FF = 'bestOfFF',
}
