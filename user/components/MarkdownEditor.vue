<template>
  <v-md-editor
    v-model="localValue"
    :mode="editorMode"
    left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
    :right-toolbar="mode ? 'preview fullscreen' : ''"
    class="bg-gray-800"
    @input="$emit('input', localValue)"
    @click="editorMode = 'edit'"
    @blur="editorMode = 'preview'"
  ></v-md-editor>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      editorMode: this.mode ? this.mode : 'preview',
      localValue: this.value,
    }
  },
}
</script>

<style>
.v-md-editor__toolbar-item {
  color: #e0e7ff;
}

.v-md-editor__toolbar-item:hover {
  background: #374151;
}

.v-md-editor__toolbar-item--active {
  background: #374151;
}

.v-md-editor__toolbar-item--active:hover {
  background: #374151;
}

.v-md-editor {
  background: #111827;
}

.v-md-textarea-editor pre,
.v-md-textarea-editor textarea {
  color: #e0e7ff;
}

textarea {
  background: #1f2937;
}

.vuepress-markdown-body {
  background: #1f2937;
  color: #e0e7ff;
}

.vuepress-markdown-body a {
  color: #ec4899;
}

.vuepress-markdown-body .v-md-svg-outbound {
  color: #e0e7ff;
  display: none;
}

.v-md-editor__toolbar {
  border-bottom: 1px solid #e0e7ff;
}
</style>