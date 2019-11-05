<template>
    <div class="code_block">
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
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/codeBlock.css";
</style>