<template>
  <div @click="select" class="code_fill">
    <div class="code" :class="{ selected: is_selected }">{{ code }}</div>
  </div>
</template>

<script>
export default {
  name: "CodeFill",
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
      type: String,
      required: true
    },
    exec_id: {
      type: Number,
      required: true
    },
    code_block_id: {
      type: Number,
      required: true
    },
    selected_code_fill_id: Number,
  },
  watch: {
      selected_code_fill_id(id) {
          if(id === this.id) {
              this.is_selected = true;
          } else if (this.is_selected) {
              this.is_selected = false;
          }
      }
  },
  methods: {
    select() {
      this.$emit("selectCodeFill", this._props);
    }
  },
  created() {
    if(this.selected_code_fill_id === this.id) {
      this.is_selected = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/codeFill";
</style>