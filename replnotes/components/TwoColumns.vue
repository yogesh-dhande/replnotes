<template>
    <div class="lg:grid lg:grid-cols-2">
        <div class="col-span-1">
            <slot name="left"></slot>
        </div>
        <div class="col-span-1">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'two-columns',
}
</script>

<style>
</style>