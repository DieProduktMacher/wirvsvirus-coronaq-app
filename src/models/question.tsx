export interface question {
  answer: {
    de: String;
  };
  answeredAt: String;
  answeredById: String;
  authoredAt: String;
  authoredById: String;
  countryCode: String;
  question: {
    de: String;
  };
  region: String;
  sourceTitle: String;
  sourceUrl: String;
  state: String;
  subscriberIds: String[];
  tags: String[];
  topic: String;
  validFrom: String;
  validTo: String;
}

export interface SearchQueryResult {
  data: question;
  meta: {
    score: number;
  };
  ref: string;
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
