export interface AlternativeItem {
  originalItem: string;
  amount: string;
  calories: string;
}

export interface AlternativeSectionProps {
  alternatives: AlternativeItem[];
}
