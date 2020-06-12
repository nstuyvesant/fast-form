import { store } from "@/store";
import { shallowMount } from "@vue/test-utils";
import SectionEditor from "@/components/SectionEditor.vue";

const wrapper: any = shallowMount(SectionEditor, {
  propsData : {
    section: {
      name: "Section 1",
      questions: [],
      subsections: []
    },
    index: 0
  },
  data: {
    dataTypeDefault: "Text(3 rows)",
    rawQuestions: ""
  },
  stubs: ["b-button", "b-form-input", "b-input-group", "b-input-group-append", "b-form-invalid-feedback", "fa"]
});

describe("SectionEditor.vue", () => {
  it("has an index property", () => {
    expect(wrapper.props("index")).toBe(0);
  });

  it("has a section property", () => {
    expect(wrapper.props("section")).toBe({name: "Section 1", questions: [], subsections: []});
  });

  it("has a sections property with the first element name of Section 1", () => {
    expect(wrapper.vm.sections[0].name).toBe("Section 1");
    expect(store.data.sections[0].name).toBe("Section 1");
  });

  it("setting Designer.name to blank causes validation error", async () => {
    await wrapper.setData({
      name: ""
    });
    expect(wrapper.text()).toContain("You must provide a name for this form.");
  });

  it("setting Designer.name should change store.name", async () => {
    await wrapper.setData({
      name: "Foo"
    });

    // Did the store (Observable) change?
    expect(store.data.name).toBe(wrapper.vm.name);
  });

  it("has a sectionDelete method that takes a number", () => {
    expect(typeof wrapper.vm.sectionDelete).toBe("function");
  });

  it("calling sectionDelete(0) deletes the first element in store.sections", () => {
    wrapper.vm.sectionDelete(0);
    expect(store.data.sections).toHaveLength(0);
    expect(wrapper.text()).toContain("At least one section must be added.");
  }); 

  it("has a sectionAdd() method", () => {
    expect(typeof wrapper.vm.sectionAdd).toBe("function");
  });

  it("calling sectionAdd() adds an array element to store.sections", () => {
    wrapper.vm.sectionAdd();
    expect(store.data.sections).toHaveLength(1);
  });
});
