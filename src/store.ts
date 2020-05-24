import Vue from "vue";
import { Store, Form, Section } from "@/types";

// Initial state unless loading a JSON
export const store: Store = Vue.observable({
  data: {
    name: "",
    nextId: 2,
    sections: [
      {
        id: 1,
        name: "Section 1",
        questions: [],
        subsections: [],
      },
    ],
  },
});

export const mutations = {
  // Sets the form name
  nameSet(name: string): void {
    store.data.name = name;
  },
  // Generate nextId used when creating sections, subsections and questions
  nextId(): number {
    return store.data.nextId++;
  },
  // Adds top-level section (subsections handled via props)
  sectionAdd(section: Section): void {
    store.data.sections.push(section);
  },
  // Deletes top-level sections (subsections handled via events to SectionEditor from child)
  sectionDelete(index: number): void {
    store.data.sections.splice(index, 1);
  },
  // Resets the store's data property (when uploading a JSON)
  storeDataSet(uploadedStore: Form): void {
    store.data = uploadedStore;
  },
};
