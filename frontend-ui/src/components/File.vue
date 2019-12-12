<template>
  <div class="file">
    <ul class="codeBlocks">
      <li class="block" v-for="block in codeBlocks" :key="block.id">
        <CodeBlock
          @selected="showCodeFills"
          v-bind="block"
          :fileId="block.file_id"
          :selectedCodeBlockId="selectedCodeBlockId"
        ></CodeBlock>
      </li>
    </ul>
  </div>
</template>

<script>
import jsonblocks from "@/util/mockdata/codeBlocks.json";
import CodeBlock from "@/components/CodeBlock";
import apiHandlers from "@/util/apiHandler";

export default {
  name: "File",
  components: {
    CodeBlock
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    gameId: {
      type: Number,
      required: true
    },
    codeBlocks: Array,
    selectedFillBlock: {},
    selectedCodeBlockId: Number
  },
  methods: {
    // Show codeFills for the selected blockId.
    showCodeFills(id) {
      this.codeBlocks.forEach(block => {
        if (block.id === id) {
          this.$emit("showCodeFills", block);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/file";
</style>
