<template>
    <div @click="selected" class="code_block">
        <div v-html="code"
             class="code"
             :class="{ adjustable: adjustable, empty: !code, selected: isSelected }"
        ></div>
    </div>
</template>

<script>
    export default {
        name: "CodeBlock",
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
                required: true,
                validator: type => typeof type === "string" || type === null
            },
            adjustable: {
                type: Boolean,
                required: true
            },
            fileId: {
                type: Number,
                required: true
            },
            codeFillId: Number,
            selectedCodeBlockId: Number
        },
        watch: {
            selectedCodeBlockId(id) {
                if (id === this.id) {
                    this.isSelected = true;
                } else if (this.isSelected) {
                    this.isSelected = false;
                }
            }
        },
        methods: {
            selected() {
                this.isSelected = true;
                if (this.adjustable) {
                    this.$emit("selected", this.id);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/styles/components/codeBlock";
</style>