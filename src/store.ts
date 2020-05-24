import Vue from "vue";
import { Store, Form, Section } from "@/types";

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
  storeDataSet(uploadedStore: Form): void {
    store.data = uploadedStore;
  },
};
