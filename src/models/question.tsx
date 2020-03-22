export interface question {
  answer: {
    de: string;
  };
  answeredAt?: string;
  answeredById?: string;
  authoredAt?: string;
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
  validFrom?: string;
  validTo?: string;
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

// enum QueryFieldName {
//   countryCode,
//   municipality,
//   query,
//   region,
//   source,
//   state,
//   tags,
//   topic
// }

export const emptyQuestion = {
  answer: {
    de: ""
  },
  answeredAt: "",
  answeredById: "",
  authoredAt: "",
  authoredById: "",
  countryCode: "",
  question: {
    de: ""
  },
  region: "",
  sourceTitle: "",
  sourceUrl: "",
  state: "",
  subscriberIds: [],
  tags: [],
  topic: "",
  validFrom: "",
  validTo: ""
} as question;
