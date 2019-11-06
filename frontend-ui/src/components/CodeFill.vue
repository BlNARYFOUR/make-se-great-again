<template>
    <div v-on:click="select" class="code_fill">
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
    },
    methods: {
        select() {
            this.$emit('selectCodeFill', this._props);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/codeFill";
</style>