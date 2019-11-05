<template>
    <div class="code_fill">
        <div class="code">
            {{ code }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'CodeFill',
    props: {
        id: {
            type: Number,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        exec_id: {
            type: Number,
            required: true
        },
        code_block_id: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/codeFill.css";
</style>