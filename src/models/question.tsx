export interface question {
  answer: {
    de: string;
  };
  answeredAt?: firebase.firestore.Timestamp;
  answeredById?: string;
  authoredAt?: firebase.firestore.Timestamp;
  authoredById?: string;
  countryCode: string;
  question: {
    de: string;
  };
  region: string;
  sourceTitle: string;
  sourceUrl: string;
  state: string;
  subscriberIds: string[];
  tags: string[];
  topic: string;
  validFrom?: firebase.firestore.Timestamp;
  validTo?: firebase.firestore.Timestamp;
}

export interface SearchQueryResult {
  data: question;
  meta: {
    score: number;
  };
  ref?: string;
}

export interface AutosuggestSearchResult {
  question: string;
  id: string;
}

export interface SearchQuery {
  authoredAt: string;
  authoredById: string;
  query: {
    [key: string]: any;
  };
  results?: SearchQueryResult[];
}

export interface SubQuery {
  match?: {
    [key: string]: any;
  };
  match_phrase?: {
    [key: string]: any;
  };
}
