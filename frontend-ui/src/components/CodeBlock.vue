<template>
    <div v-on="listener" class="code_block">
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
    computed:{
       
    },
    methods: { 
        listener() {
            if(this.adjustable) {
                return { click: this.selected };
            }
            return null;
        },
        selected() {
            this.$emit('selected', this.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/codeBlock.css";
</style>