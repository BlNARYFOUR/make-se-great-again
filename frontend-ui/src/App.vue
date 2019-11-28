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
                <tabs @changed="tabChanged" :options="{ defaultTabHash: 'empty-tab' }">
                    <tab :name="file.name" v-for="file in files" :key="file.id">
                        <File
                                @showCodeFills="showCodeFills"
                                v-bind="file"
                                :gameId="file.game_id"
                                :selectedCodeBlockId="selectedCodeBlock.id"
                        />
                    </tab>
                    <tab v-if="files.length === 0" id="empty-tab" name="Default">
                        Please select a game!
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
                                :codeBlockId="codeFill.code_block_id"
                                :execId="codeFill.exec_id"
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
    import apiHandlers from "@/util/apiHandler";
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
                this.getSelectedGameIdByName(selectedGame.name);
            },
            selectedGameId(id) {
                this.getFilesByGameId(id);
                // TODO: Get codefills by gameid
                this.getCodeFills();
            }
        },
        methods: {
            showCodeFills(codeBlock) {
                this.selectedCodeBlock = codeBlock;
                this.usableCodeFills = this.codeFills.filter(
                    fill => fill.code_block_id === codeBlock.id
                );
                if (typeof this.selectedCodeBlock.codeFillId !== "undefined") {
                    this.selectedCodeFillId = this.selectedCodeBlock.codeFillId;
                }
            },
            selectCodeFill(codeFill) {
                this.selectedCodeFill = codeFill;
                if (this.selectedCodeBlock.id === codeFill.codeBlockId) {
                    this.selectedCodeBlock.code = codeFill.code;
                    this.selectedCodeBlock.codeFillId = codeFill.id;
                    this.selectedCodeFillId = this.selectedCodeBlock.codeFillId;
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
                apiHandlers.getAvailableGames()
                    .then(data => this.availableGames = data)
                    .catch(err => console.log('getAvailableGames',err));
            },
            getFilesByGameId(id) {
                apiHandlers.getFilesByGameId(id)
                    .then(data => this.files = data)
                    .catch(err => console.log('getFilesByGameId', err))
                console.log(this.files.size);

            },
            getCodeFills() {
                apiHandlers.getCodeFills()
                    .then(data => {
                        this.codeFills = data})
                    .catch(err => console.log('getCodeFills', err));
            },
            getSelectedGameIdByName(name) {
                apiHandlers.getSelectedGameIdByName(name)
                    .then(data => this.selectedGameId = data.id)
                    .catch(err => console.log('getSelectedGameByIdName', err));
            },
            
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
