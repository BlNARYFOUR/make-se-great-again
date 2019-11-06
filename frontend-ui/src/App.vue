<template>
  <div id="app">
    <div class="selected_game">
      Selected game:
      <select>
        <option value="flappyBird">Flappy Bird</option>
        <option disabled="disabled" value="mario">Super Mario</option>
        <option disabled="disabled" value="breakout">Breakout</option>
      </select>
    </div>
    <div class="container">
      <div class="files">
        <tabs v-on:changed="tabChanged">
          <tab :name="file.name" v-for="file in files" :key="file.id">
            <File v-on:showCodeFills="showCodeFills" v-bind="file" :selected_code_block_id="selected_code_block.id"></File>
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
      files: [],
      code_fills: [],
      usable_code_fills: [],
      selected_code_block: {}
    };
  },
  methods: {
    showCodeFills(codeBlock) {
      this.selected_code_block = codeBlock;
      this.usable_code_fills = this.code_fills.filter(
        fill => fill.code_block_id === codeBlock.id
      );
    },
    selectCodeFill(codeFill) {
      if (this.selected_code_block.id === codeFill.code_block_id) {
        this.selected_code_block.code = codeFill.code;
      }
    },
    tabChanged() {
      this.usable_code_fills = null;
    }
  },
  created() {
    this.files = jsonFiles;
    this.code_fills = jsonCodefills;
  }
};
</script>

<style lang="scss" >
@import "./assets/styles/components/app";
</style>
