<template>
    <div id="app">
        <div class="selected_game">
            Selected game:
            <select v-model="selectedGame">
                <option
                        class="option"
                        v-for="game in availableGames"
                        :key="game.name"
                        :value="game"
                >{{game.name}} ({{ game.id }})
                </option>
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
                                :selectedCodeBlockId="selectedCodeBlock.id"
                        />
                    </tab>
                </tabs>
            </div>
            <div class="code_fills_container">
                <div class="title_code_fill">{{ tabTitle }}</div>
                <ul class="code_fills">
                    <li class="code" v-for="codeFill in usableCodeFills" :key="codeFill.id">
                        <CodeFill
                                @selectCodeFill="selectCodeFill"
                                v-bind="codeFill"
                                :selectedCodeFillId="selectedCodeFillId"
                        />
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
                codeFills: [],
                usableCodeFills: [],
                selectedCodeBlock: {},
                selectedCodeFill: {},
                selectedTab: "",
                selectedCodeFillId: 0,
                availableGames: [],
                selectedGame: {},
                selectedGameId: 0
            };
        },
        computed: {
            tabTitle() {
                return Object.keys(this.selectedCodeBlock).length !== 0
                    ? this.selectedTab
                    : "Select a CodeBlock!";
            }
        },
        watch: {
            selectedGame(selectedGame) {
                this.getSelectedGameId(selectedGame.name);
            },
            selectedGameId(id) {
                this.getFiles(id);
            }
        },
        methods: {
            showCodeFills(codeBlock) {
                this.selectedCodeBlock = codeBlock;
                this.usableCodeFills = this.codeFills.filter(
                    fill => fill.code_block_id === codeBlock.id
                );
                if (typeof this.selectedCodeBlock.code_fill_id !== "undefined") {
                    this.selectedCodeFillId = this.selectedCodeBlock.code_fill_id;
                }
            },
            selectCodeFill(codeFill) {
                this.selectedCodeFill = codeFill;
                if (this.selectedCodeBlock.id === codeFill.code_block_id) {
                    this.selectedCodeBlock.code = codeFill.code;
                    this.selectedCodeBlock.code_fill_id = codeFill.id;
                    this.selectedCodeFillId = this.selectedCodeBlock.code_fill_id;
                }
            },
            tabChanged(selectedTab) {
                this.usableCodeFills = null;
                this.selectedTab = selectedTab.tab.name;
                this.selectedCodeBlock = {};
            },
            reset() {
                location.reload();
            },
            getAvailableGames() {
                this.fetchData(`${this.apiUrl}connections`, availableGames => {
                    this.availableGames = availableGames;
                });
            },
            getFiles(id) {
                this.fetchData(`${this.apiUrl}files/${id}`, files => {
                    this.files = files;
                });
            },
            getCodeFills() {
                this.fetchData(`${this.apiUrl}codeFills`, fills => {
                    this.codeFills = fills;
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
                    .then(json => callback(json.data))
                    .catch(err => console.log(err));
            }
        },
        created() {
            this.getAvailableGames();

            window.onbeforeunload = function () {
                return "Are you sure you want to reset the game?";
            };
        }
    };
</script>

<style lang="scss">
    @import "./assets/styles/components/app";
</style>
