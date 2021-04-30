<template>
    <span
        class="outline-none mx-2 px-2 my-1 py-1 rouded-lg bg-yellow-400 text-yellow-700"
    >
        <input
            class="hidden"
            type="checkbox"
            v-model="localValue"
            @input="input"
        />
        {{ label }}
    </span>
</template>

<script>
export default {
    name: 'toggle',
    props: ['value', 'label'],
    data() {
        return {
            localValue: this.value,
        }
    },
    methods: {
        input() {
            this.$emit('input', this.localValue)
        },
    },
}
</script>

<style>
</style>