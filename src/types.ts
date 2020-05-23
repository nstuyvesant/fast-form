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

export interface Form {
  name: string;
  sections: Section[];
}

export interface Store {
  data: Form;
}