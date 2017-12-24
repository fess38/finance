export class Currency {
  id: number;
  names: LangString[];
  symbol: string;
  code: string;
}

export class LangString {
  lang: string;
  value: string;
}

