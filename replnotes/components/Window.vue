<template>
    <div class="relative">
        <div class="absolute top-0 right-0">
            <slot name="top-right"> </slot>
        </div>
        <div class="absolute top-0 left-0">
            <slot name="top-left"> </slot>
        </div>
        <div>
            <slot name="body"> </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'window',
}
</script>

<style>
</style>