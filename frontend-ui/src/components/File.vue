<template>
  <div class="file">
    <ul class="codeBlocks">
      <li class="block" v-for="block in codeBlocks" :key="block.id">
        <CodeBlock @selected="showCodeFills" v-bind="block" :selected_code_block_id="selectedCodeBlockId"></CodeBlock>
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
    gameId: {
      type: Number,
      required: true,
    },
    selectedFillBlock: {},
    selectedCodeBlockId: Number,
  },
  data() {
    return {
      codeBlocks: Array
    }
  },
  methods:{
    showCodeFills(id) {
      this.codeBlocks.forEach(block => {
        if(block.id === id) {
          this.$emit('showCodeFills', block);
        }
      });
    }
  },
  created() {
    // TODO: MAke api call to backend.
    this.codeBlocks = jsonblocks.filter(block => block.file_id == this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/file";
</style>
