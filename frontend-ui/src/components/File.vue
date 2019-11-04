<template>
  <div class="file">{{ code_blocks }}</div>
</template>

<script>
import jsonblocks from "@/util/mockdata/codeBlocks.json"

export default {
  name: "File",
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
    }
  },
  data() {
    return {
      code_blocks: Array
    }
  },
  created() {
    this.code_blocks = jsonblocks.filter(block => block.file_id == this.id);
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
