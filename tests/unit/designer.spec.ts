import { store } from "@/store";
import { shallowMount } from "@vue/test-utils";
import Designer from "@/components/Designer.vue";

const wrapper: any = shallowMount(Designer, {
  stubs: ["SectionEditor", "b-form-input", "b-form-group", "b-form-invalid-feedback", "fa"]
});

describe("Designer.vue", () => {
  it("has a name property equal to Form 1", () => {
    expect(wrapper.vm.name).toBe("Form");
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
