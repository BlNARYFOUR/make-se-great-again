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
                // All files which are loaded for the selected game.
                files: [],
                // All CodeFills from all the files.
                codeFills: [],
                // All CodeFills for selected CodeBlock.
                usableCodeFills: [],
                selectedCodeBlock: {},
                selectedCodeFill: {},
                selectedTab: "",
                selectedCodeFillId: 0,
                // The different games that can be connected with.
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
            // Everytime the selectedGame get's updated, this method runs to update the selectedGameId.
            selectedGame(selectedGame) {
                this.getSelectedGameIdByName(selectedGame.name);
            },
            // Everytime the selectedGameId updates (after selecting new game to connect), the files and codeFills are updated.
            selectedGameId(gameId) {
                this.getFilesByGameId(gameId);
                this.getCodeFillsByGameId(gameId);
            }
        },
        methods: {
            showCodeFills(codeBlock) {
                this.selectedCodeBlock = codeBlock;
                // Get the usableCodeFills by checking the codeBlockId of the codeFill.
                this.usableCodeFills = this.codeFills.filter(
                    fill => fill.code_block_id === codeBlock.id
                );
                // When switching to another file or codeBlock, 
                // this makes sure the selected codeFill is still selected when returning to the codeBlock.
                if (typeof this.selectedCodeBlock.codeFillId !== "undefined") {
                    this.selectedCodeFillId = this.selectedCodeBlock.codeFillId;
                }
            },
            selectCodeFill(codeFill) {
                this.selectedCodeFill = codeFill;
                // If the codeBlockId in the codeFill is the same, 
                // set the codeBlock with the code from the codeFill.
                if (this.selectedCodeBlock.id === codeFill.codeBlockId) {
                    this.selectedCodeBlock.code = codeFill.code;
                    this.selectedCodeBlock.codeFillId = codeFill.id;
                    this.selectedCodeFillId = this.selectedCodeBlock.codeFillId;
                }
            },
            // Executed when file tab changes.
            tabChanged(selectedTab) {
                this.usableCodeFills = null;
                this.selectedTab = selectedTab.tab.name;
                this.selectedCodeBlock = {};
            },
            reset() {
                location.reload();
            },
            // Get the games that are currently being played.
            getAvailableGames() {
                apiHandlers.getAvailableGames()
                    .then(data => this.availableGames = data)
                    .catch(err => console.log('getAvailableGames',err));
            },
            getFilesByGameId(id) {
                apiHandlers.getFilesByGameId(id)
                    .then(data => this.files = data)
                    .catch(err => console.log('getFilesByGameId', err));
            },
            getCodeFillsByGameId(gameID) {
                apiHandlers.getCodeFillsByGameId(gameID)
                    .then(data => {
                        this.codeFills = data})
                    .catch(err => console.log('getCodeFills', err));
            },
            // Used to get the gameId based on the selected game name.
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
