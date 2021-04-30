<template>
    <div>
        <div :id="id" class="relative">
            <label
                for="id"
                class="block text-sm font-medium text-indigo-100 mt-2 mb-0"
                >{{ label }}</label
            >
            <div
                id="id"
                class="relative flex flex-wrap shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 p-2 text-sm bg-gray-800 rounded-md"
                :class="{ focus: hasFocus }"
                @click.self="$refs.search.focus()"
                @keydown.left="traverseSelected('left')"
                @keydown.right="traverseSelected('right')"
                @keyup.delete="traverseSelectedDelete"
            >
                <badge
                    v-for="(itm, index) in selectedList"
                    :key="index"
                    class="mx-1 py-0.5 px-3"
                >
                    <span
                        class="rounded-md italic"
                        :class="{ active: activeHorizontal === index }"
                    >
                        <span class="mr-1 font-bold">{{ itm }}</span>
                        <button
                            type="button"
                            @click="removeSelected(index)"
                            tabindex="-1"
                        >
                            <span class="text-lg font-bold">&times;</span>
                        </button>
                    </span>
                </badge>
                <input
                    type="text"
                    class="outline-none mx-2 bg-gray-800"
                    ref="search"
                    :style="{ width: searchTermWidth }"
                    v-model.trim="searchTerm"
                    @keydown.down="traverseList('next')"
                    @keydown.up="traverseList('prev')"
                    @keydown.delete="backspaceDelete"
                    @keyup.enter="addActive"
                    @keyup="lastTerm = searchTerm"
                    @focus="
                        showSuggestPanel = true
                        hasFocus = true
                        activeHorizontal = -1
                    "
                    @blur="
                        showSuggestPanel = false
                        hasFocus = false
                    "
                />
                <div ref="tester" class="absolute invisible w-auto h-auto">
                    {{ searchTerm }}
                </div>
                <div
                    class="absolute top-full left-0 w-full bg-gray-800 z-10"
                    v-show="showSuggestPanel"
                    ref="panel"
                >
                    <div
                        class="suggest-item px-4 py-2 active:bg-gray-600 disabled:bg-gray-200 disabled:line-through"
                        :class="{
                            'bg-gray-600': activeVertical === index,
                            hidden: selectedList.includes(row.value || row),
                        }"
                        v-for="(row, index) in filteredSuggest"
                        :key="index"
                        @mousedown.prevent="addActive(row)"
                        @mouseover="activeVertical = index"
                        v-html="hightlightWord(row)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Badge from '@/components/Badge'

export default {
    name: 'multi-choice',
    props: {
        id: {
            type: String,
        },
        label: {
            type: String,
        },
        value: {
            type: Array,
        },
        options: {
            type: Array,
            default: () => [],
        },
        allowInsertionOfNewKeys: {
            type: Boolean,
            default: true,
        },
    },
    components: { Badge },
    data() {
        return {
            selectedList: this.value,
            searchTerm: '',
            searchTermWidth: '',
            lastTerm: '',
            activeVertical: 0,
            activeHorizontal: -1,
            showSuggestPanel: false,
            hasFocus: false,
        }
    },
    computed: {
        sanitizedTerm() {
            return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        },
        filteredSuggest() {
            if (!this.searchTerm) return this.suggestedList

            const ex = RegExp(this.sanitizedTerm, 'i')
            const filtered = this.suggestedList.filter((ele) => ex.test(ele))
            const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`
            let newTerm = this.allowInsertionOfNewKeys
                ? [{ label, value: this.searchTerm }]
                : []
            return filtered.length ? filtered : newTerm
        },
        suggestedList() {
            return this.options
        },
    },
    watch: {
        filteredSuggest() {
            this.activeVertical = 0
        },
        searchTerm() {
            this.$nextTick().then(() => this.calcTextWidth())
        },
        selectedList(newList) {
            this.$emit('input', newList)
        },
        value(newValue) {
            this.selectedList = newValue
        },
    },
    methods: {
        addSelected(val) {
            if (this.selectedList.includes(val)) return
            if (!this.allowInsertionOfNewKeys && !this.options.includes(val))
                return
            this.selectedList.push(val)
            this.searchTerm = ''
            this.activeHorizontal = -1
        },
        addActive() {
            const value = this.filteredSuggest[this.activeVertical]
            if (value && this.showSuggestPanel)
                this.addSelected(value.value ? value.value : value)
        },
        removeSelected(index) {
            this.selectedList.splice(index, 1)
        },
        traverseList(direction) {
            if (direction === 'next' && !this.showSuggestPanel) {
                this.activeVertical = -1
            }

            const lastIndex = this.filteredSuggest.length - 1
            let newIndex =
                direction === 'next'
                    ? this.activeVertical + 1
                    : this.activeVertical - 1

            if (newIndex <= lastIndex && newIndex >= 0) {
                this.activeVertical = newIndex
            }

            this.scrollToView()
        },
        traverseSelected(direction) {
            const lastIndex = this.selectedList.length - 1

            if (this.activeHorizontal === -1) {
                this.activeHorizontal = lastIndex + 1
            }

            let newIndex =
                direction === 'left'
                    ? this.activeHorizontal - 1
                    : this.activeHorizontal + 1

            if (newIndex === this.selectedList.length) {
                this.activeHorizontal = -1
                return
            }

            if (newIndex <= lastIndex && newIndex >= 0) {
                this.activeHorizontal = newIndex
            }
        },
        traverseSelectedDelete() {
            if (this.activeHorizontal === -1) return
            this.removeSelected(this.activeHorizontal)
        },
        backspaceDelete() {
            if (this.activeHorizontal !== -1) return
            if (!this.selectedList.length) return
            if (this.lastTerm) return

            const lastIndex = this.selectedList.length - 1
            if (lastIndex !== -1) this.removeSelected(lastIndex)
        },
        scrollToView() {
            if (!this.showSuggestPanel) return

            this.$nextTick().then(() => {
                const container = this.$refs.panel
                const item = this.$el.querySelector('.suggest-item.active')

                const sy1 = container.scrollTop
                const sy2 = container.offsetHeight + sy1

                const ty1 = item.offsetTop
                const th = item.offsetHeight
                const ty2 = th + ty1

                if (ty1 <= sy2 && sy2 < ty2) {
                    this.$refs.panel.scrollTop = sy1 + (ty1 - sy2) + th
                } else if (ty1 < sy1 && sy1 <= ty2) {
                    this.$refs.panel.scrollTop = sy1 + (ty2 - sy1) - th
                }
            })
        },
        calcTextWidth() {
            const textWidth = this.$refs.tester.clientWidth
            const finalWidth = textWidth ? textWidth + 10 : 50
            this.searchTermWidth = `${finalWidth}px`
        },
        hightlightWord(val) {
            if (val.label) return val.label
            if (!this.searchTerm) return val

            const termRegex = RegExp(`(${this.sanitizedTerm})`, 'i')
            return val.replace(
                termRegex,
                (m, t) => `<span class="bg-pink-300">${t}</span>`
            )
        },
    },
}
</script>

<style scoped>
</style>
