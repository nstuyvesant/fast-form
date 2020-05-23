import Vue from "vue";
import { Store, Form, Section, Question } from "@/types";

// Initial state unless loading a JSON
export const store: Store = Vue.observable({
  data: {
    name: "",
    sections: [
      {
        name: "Section 1",
        questions: [],
        subsections: [],
      },
    ],
  },
});

export const mutations = {
  nameSet(name: string): void {
    store.data.name = name;
  },
  sectionAdd(section: Section): void {
    store.data.sections.push(section);
  },
  sectionDelete(index: number): void {
    // top-level sections (not subsections)
    store.data.sections.splice(index, 1);
  },
  // subsectionAdd(section: Section, subsection: Section): void {
  //   section.subsections.push(subsection);
  // },
  subsectionDelete(sectionIndex: number, index: number): void {
    console.log(sectionIndex, index);
  },
  storeDataSet(uploadedStore: Form): void {
    store.data = uploadedStore;
  },
  questionDelete(section: Section, questionToDelete: Question): void {
    console.log(questionToDelete);
    // const index: number = store.sections.findIndex(
    //   (section) => section.name =
    // )
  },
};
