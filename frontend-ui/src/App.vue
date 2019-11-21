<template>
  <div id="app">
    <div class="selected_game">
      Selected game:
      <select v-model="selectedGameName">
        <option
          class="option"
          v-for="game in availableGames"
          :key="game.name"
          :value="game.name"
        >{{game.name}} ({{ game.id }})</option>
      </select>
      <p @click="getAvailableGames()" class="refresh">&#8635;</p>
    </div>
    <div class="action_buttons">
      <button class="button__reset" @click="reset">Reset</button>
      <button class="button__deploy">Deploy</button>
    </div>
    <div class="container">
      <div class="files">
        <tabs @changed="tabChanged">
          <tab :name="file.name" v-for="file in files" :key="file.id">
            <File
              @showCodeFills="showCodeFills"
              v-bind="file"
              :selected_code_block_id="selected_code_block.id"
            ></File>
          </tab>
        </tabs>
      </div>
      <div class="code_fills_container">
        <div class="title_code_fill">{{ tabTitle }}</div>
        <ul class="code_fills">
          <li class="code" v-for="code_fill in usable_code_fills" :key="code_fill.id">
            <CodeFill
              @selectCodeFill="selectCodeFill"
              v-bind="code_fill"
              :selected_code_fill_id="selected_code_fill_id"
            ></CodeFill>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import File from "@/components/File";
import CodeFill from "@/components/CodeFill";
// import jsonFiles from "@/util/mockdata/files.json";
// import jsonCodefills from "@/util/mockdata/codeFills.json";

export default {
  name: "app",
  components: {
    File,
    CodeFill
  },
  data() {
    return {
      apiUrl: "http://localhost:8000/api/",
      files: [],
      code_fills: [],
      usable_code_fills: [],
      selected_code_block: {},
      selected_code_fill: {},
      selected_tab: "",
      selected_code_fill_id: 0,
      availableGames: [],
      selectedGameName: "",
      selectedGameId: 0
    };
  },
  computed: {
    tabTitle() {
      return Object.keys(this.selected_code_block).length !== 0
        ? this.selected_tab
        : "Select a CodeBlock!";
    }
  },
  watch: {
    selectedGameName(name) {
      this.getSelectedGameId(name);
    },
    selectedGameId(id) {
      this.getFiles(id);
    }
  },
  methods: {
    showCodeFills(codeBlock) {
      this.selected_code_block = codeBlock;
      this.usable_code_fills = this.code_fills.filter(
        fill => fill.code_block_id === codeBlock.id
      );
      if (typeof this.selected_code_block.code_fill_id !== "undefined") {
        this.selected_code_fill_id = this.selected_code_block.code_fill_id;
      }
    },
    selectCodeFill(codeFill) {
      this.selected_code_fill = codeFill;
      if (this.selected_code_block.id === codeFill.code_block_id) {
        this.selected_code_block.code = codeFill.code;
        this.selected_code_block.code_fill_id = codeFill.id;
        this.selected_code_fill_id = this.selected_code_block.code_fill_id;
      }
    },
    tabChanged(selectedTab) {
      this.usable_code_fills = null;
      this.selected_tab = selectedTab.tab.name;
      this.selected_code_block = {};
    },
    reset() {
      location.reload();
    },
    getAvailableGames() {
      this.fetchData(`${this.apiUrl}connections`, games => {
        this.availableGames = games;
      });
    },
    getFiles(id) {
      this.fetchData(`${this.apiUrl}files/${id}`, files => {
        this.files = files;
        console.log(files);
      });
    },
    getCodeFills() {
      this.fetchData(`${this.apiUrl}codeFills`, fills => {
        this.code_fills = fills;
      });
    },
    getSelectedGameId(name) {
      this.fetchData(`${this.apiUrl}games/${name}`, game => {
        this.selectedGameId = game.id;
      });
    },
    fetchData(url, callback) {
      fetch(url)
        .then(response => response.json())
        .then(json => callback(json.data));
    }
  },
  created() {
    this.getAvailableGames();

    window.onbeforeunload = function() {
      return "Are you sure you want to reset the game?";
    };
  }
};
</script>

<style lang="scss" >
@import "./assets/styles/components/app";
</style>
