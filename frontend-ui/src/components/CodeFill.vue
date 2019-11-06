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
  },
  methods: {
    select() {
      this.$emit("selectCodeFill", this._props);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/codeFill";
</style>