import Vue from "vue";
import { Store, Section, Question } from "@/types";

// Initial state unless loading a JSON
export let store: Store = Vue.observable({
  name: "",
  sections: [
    {
      name: "Section 1",
      questions: [],
      subsections: [],
    },
  ],
});

export const mutations = {
  formName(name: string): void {
    store.name = name;
  },
  sectionAdd(section: Section): void {
    store.sections.push(section);
  },
  sectionDelete(index: number): void {
    store.sections.splice(index, 1);
  },
  // subsectionAdd(section: Section, subsection: Section): void {
  //   section.subsections.push(subsection);
  // },
  storeLoad(uploadedStore: Store): void {
    store = uploadedStore;
  },
  questionDelete(section: Section, questionToDelete: Question): void {
    console.log(questionToDelete);
    // const index: number = store.sections.findIndex(
    //   (section) => section.name =
    // )
  },
};
