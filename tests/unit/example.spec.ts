import { shallowMount } from "@vue/test-utils";
import Designer from "@/components/Designer.vue";

describe("Designer.vue", () => {
  it("renders form with  name and one section by default", () => {
    const msg = "new message";
    const wrapper = shallowMount(Designer, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
