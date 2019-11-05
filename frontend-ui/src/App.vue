<template>
  <div id="app">
    <div class="files">
      <tabs>
        <tab :name="file.name" v-for="file in files" :key="file.id">
          <File v-on:showCodeFills="showCodeFills" v-bind="file"></File>
        </tab>
      </tabs>
    </div>
    <div class="code_fills_container">
      <ul class="code_fills">
        <li class="code" v-for="code_fill in usable_code_fills" v-bind:key="code_fill.id">
          <CodeFill v-on:selectCodeFill="selectCodeFill" v-bind="code_fill"></CodeFill>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import File from "@/components/File";
import CodeFill from "@/components/CodeFill";
import jsonFiles from "@/util/mockdata/files.json";
import jsonCodefills from "@/util/mockdata/codeFills.json";


export default {
  name: "app",
  components: {
    File,
    CodeFill
  },
  data() {
    return {
      files: Array,
      code_fills: Array,
      usable_code_fills: Array,
      selected_code_block: Object
    };
  },
  methods: {
    showCodeFills(code_block) {
      this.selected_code_block = code_block;
      this.usable_code_fills = this.code_fills.filter(fill => fill.code_block_id == code_block.id);
    },
    selectCodeFill(codeFill) {
      if(this.selected_code_block.id == codeFill.code_block_id) {
        this.selected_code_block.code = codeFill.code;
      }
    }
  },
  created() {
    this.files = jsonFiles;
    this.code_fills = jsonCodefills;
  }
};
</script>

<style lang="scss" >
@import "./styles/tabs.css";

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  width: 98vw;
  height: 98vh;
}

.files {
  background-color: red;
}

.code_fills_container {
  background-color: green;
  padding: 10em 2em 3em 2em;
}

.files,
.code_fills_container {
  width: 45%;
  height: 100%;
}
</style>
