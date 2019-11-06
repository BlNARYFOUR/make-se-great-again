<template>
  <div class="file">
    <ul class="codeBlocks">
      <li class="block" v-for="block in code_blocks" :key="block.id">
        <CodeBlock v-on:selected="showCodeFills" v-bind="block" :selected_code_block_id="selected_code_block_id"></CodeBlock>
      </li>
    </ul>
  </div>
</template>

<script>
import jsonblocks from "@/util/mockdata/codeBlocks.json"
import CodeBlock from "@/components/CodeBlock"

export default {
  name: "File",
  components: {
    CodeBlock
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    game_id: {
      type: Number,
      required: true,
    },
    selected_fill_block: {
      type: Object,
      required: false
    },
    selected_code_block_id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      code_blocks: Array
    }
  },
  methods:{
    showCodeFills(id) {
      this.code_blocks.forEach(block => {
        if(block.id === id) {
          this.$emit('showCodeFills', block);
        }
      });
    }
  },
  created() {
    this.code_blocks = jsonblocks.filter(block => block.file_id == this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/file";
</style>
