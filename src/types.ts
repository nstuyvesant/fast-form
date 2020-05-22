export interface Question {
  required: boolean;
  label: string;
  dataType: string;
  values: string[];
}

export interface Section {
  name: string;
  questions: Question[];
  subsections: Section[];
}

export interface Store {
  name: string;
  sections: Section[];
}