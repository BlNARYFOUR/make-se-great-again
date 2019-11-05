<template>
    <div v-on:click="selected" class="code_block">
        <div class="code"  v-bind:class="{ adjustable: adjustable}">
            {{ code }}
        </div>
    </div>
</template>

<script>
export default {
    name: "CodeBlock",
    props: {
        id: {
            type: Number,
            required: true,
        },
        code: {
            required: true,
            validator: name => typeof name === 'string' || name === null,
        },
        adjustable: {
            type: Boolean,
            required: true
        },
        file_id: {
            type: Number,
            required: true,
        },
    },
    // watch: {
    //     code() {
    //         /*eslint no-console: ["error", { allow: ["log", "error"] }] */
    //         console.log(this.code);
    //     }
    // },
    methods: {
        selected() {
            if(this.adjustable) {
                this.$emit('selected', this);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/codeBlock.css";
</style>