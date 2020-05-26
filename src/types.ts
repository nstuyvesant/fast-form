export interface Question {
  id: number;
  required: boolean;
  label: string;
  dataType: string;
  values: string[];
}

export interface Section {
  id: number;
  name: string;
  questions: Question[];
  subsections: Section[];
}

export interface Form {
  name: string;
  nextId: number;
  sections: Section[];
}

export interface Store {
  data: Form;
}
