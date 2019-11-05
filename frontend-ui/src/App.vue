<template>
  <div id="app">
    <div class="files">
      <tabs>
        <tab :name="file.name" v-for="file in files" :key="file.id">
          <File v-bind="file"></File>
        </tab>
      </tabs>
    </div>
    <div class="code_fills">yoot</div>
  </div>
</template>

<script>
import File from "@/components/File";
import jsonFiles from "@/util/mockdata/files.json";
import jsonCodefills from "@/util/mockdata/codeFills.json";


export default {
  name: "app",
  components: {
    File
  },
  data() {
    return {
      files: Array,
      code_fills: Array
    };
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

.code_fills {
  background-color: green;
}

.files,
.code_fills {
  width: 45%;
  height: 100%;
}
</style>
