<template>
    <div class="code_block">
        {{ code }}
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