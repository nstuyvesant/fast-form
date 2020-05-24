<template lang="pug">
.form-group
  .input-group.input-group-sm
    .input-group-prepend
      .input-group-text
          input(type='checkbox', v-model='question.required', aria-label='Required', alt='Required')
    input.form-control.fifty-three(type='text', v-model.trim='question.label', aria-label='Question')
    select.custom-select(v-model='question.dataType')
      option Checkbox
      option Checkbox Group
      option Currency(8,2) - $
      option Date
      option Email
      option Feet(5,0)
      option Feet(5,2)
      option Miles(3,1)
      option Minutes(2,0)
      option Number(10,0)
      option Number(10,2)
      option Percentage(3,2)
      option Percentage(3,0)
      option Phone
      option Picklist
      option Picklist - US States
      option Radio Group
      option Radio Group - Yes/No
      option Square Feet(10,0)
      option Square Feet(10,2)
      option Static HTML
      option Text
      option(selected) TextArea(3 rows)
      option TextArea(8 rows)
      option URL
      option Year
      option Years(3)
      option ZIP Code
      option ZIP Code +4
    .input-group-append
      b-dropdown(text='', variant='outline-secondary', size='sm')
        b-dropdown-item(v-b-modal='modalName(question.id)')
          fa.text-danger(:icon='["fas", "edit"]')
          | &nbsp; Edit Values
        b-dropdown-item(@click='questionDelete')
          fa.text-danger(:icon='["fas", "trash-alt"]')
          | &nbsp; Delete

  b-modal(:id='modalName(question.id)', title='Edit List Values', @ok='rawValuesParse')
    textarea.form-control(rows=5, v-model.trim='rawValues', autofocus='')
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Question } from "@/types";
import { mutations } from "@/store";
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    label: { required },
  },
})
export default class QuestionEditor extends Vue {
  @Prop({
    default: {
      id: mutations.nextId(),
      required: false,
      label: "",
      dataType: "TextArea(3 rows)",
      values: [],
    },
  })
  private question!: Question;

  @Prop(Number) readonly index: number | undefined;

  // Create unique modal name/id corresponding to the question's id
  private modalName(id: number): string {
    return `modal${id}`;
  }

  // Convert array elements to lines for the textarea
  private rawValues =
    this.question.values.length > 0 ? this.question.values.join("\n") : "";

  // Emit event to parent to delete this question
  private questionDelete(): void {
    this.$emit("delete", this.index);
  }

  // Convert rows in the textarea to array elements
  private rawValuesParse(): void {
    if (this.rawValues.length > 0) {
      const values = this.rawValues.split("\n");
      this.question.values = values;
    }
  }
}
</script>

<style scoped lang="scss">
.fifty-three {
  width: 53%;
}
</style>
