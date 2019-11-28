<template>
    <div @click="select" class="code_fill">
        <div class="code" :class="{ selected: isSelected }">{{ code }}</div>
    </div>
</template>

<script>
    export default {
        name: "CodeFill",
        data() {
            return {
                isSelected: false,
            };
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            code: {
                type: String,
                required: true
            },
            execId: {
                type: Number,
                required: true
            },
            codeBlockId: {
                type: Number,
                required: true
            },
            selectedCodeFillId: Number,
        },
        watch: {
            selectedCodeFillId(id) {
                if (id === this.id) {
                    this.isSelected = true;
                } else if (this.isSelected) {
                    this.isSelected = false;
                }
            }
        },
        methods: {
            select() {
                this.$emit("selectCodeFill", this._props);
            }
        },
        created() {
            if (this.selectedCodeFillId === this.id) {
                this.isSelected = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/styles/components/codeFill";
</style>