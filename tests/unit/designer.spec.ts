import { Section } from "@/types";
import { store, mutations } from "@/store";
import { mount, shallowMount } from "@vue/test-utils";
import Designer from "@/components/Designer.vue";

const wrapper = mount(Designer);

describe("Designer.vue", () => {
  it("has a name property equal to Form 1", () => {
    expect(wrapper.vm.name).toBe("Form 1");
  });

  it("has a sections property", () => {
    expect(wrapper.vm.sections).toBe("For");
  });

  it("setting Designer.name should change store.name", () => {
    // setting Designer.name to "Foo" puts "Foo" into store.name
  });

  it("has a sectionAdd() method", () => {
    expect(wrapper.vm.sectionAdd).toBe("function");
  });

  it("calling sectionAdd() adds an array element to store.sections", () => {

  });
  
  it("has a sectionDelete method that takes a number", () => {
    
  });

  it("calling sectionDelete(0) deletes the first element in store.sections", () => {
    
  });

  it("renders form with name and one section by default", () => {
    const msg = "new message";
    const wrapper = shallowMount(Designer, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
