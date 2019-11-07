<template>
  <div v-on:click="selected" class="code_block">
    <div
      class="code"
      :class="{ adjustable: adjustable, empty: !code, selected: is_selected }"
    >{{ code }}</div>
  </div>
</template>

<script>
export default {
  name: "CodeBlock",
  data() {
    return {
      is_selected: false,
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    code: {
      required: true,
      validator: type => typeof type === "string" || type === null
    },
    adjustable: {
      type: Boolean,
      required: true
    },
    file_id: {
      type: Number,
      required: true
    },
      code_fill_id: Number,
      selected_code_block_id: Number
  },
  watch: {
      selected_code_block_id(id) {
          if(id === this.id) {
              this.is_selected = true;
          } else if (this.is_selected) {
              this.is_selected = false;
          }
      }
  },
  methods: {
    selected() {
      this.is_selected = true;
      if (this.adjustable) {
        this.$emit("selected", this.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/codeBlock";
</style>