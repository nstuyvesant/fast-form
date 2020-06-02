import { shallowMount } from "@vue/test-utils";
import Designer from "@/components/Designer.vue";

const wrapper = shallowMount(Designer);

describe("Designer.vue", () => {
  it("has a name property", () => {
    expect(typeof Designer.name).toBe("function");
  });

  it("has a name property", () => {
    // expect(typeof Designer.).toBe('function')
  });

  it("renders form with name and one section by default", () => {
    const msg = "new message";
    const wrapper = shallowMount(Designer, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
