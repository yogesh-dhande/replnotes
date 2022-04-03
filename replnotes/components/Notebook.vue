<template>
  <div class="prose max-w-none text-indigo-200">
    <div v-if="html" id="server-rendered-notebook" v-html="html"></div>
  </div>
</template>

<script>
import { render, createRenderer } from "ipynb2html/lib/browser";
import "highlight.js/styles/monokai.css";
import "katex/dist/katex.min.css";
import { Document } from "nodom";

export default {
  props: {
    nbJson: {
      type: Object,
      default: () => {
        return {
          cells: [],
        };
      },
    },
  },
  data() {
    return {
      html: null,
    };
  },
  watch: {
    nbJson(newValue) {
      this.parseNotebook(newValue);
    },
  },
  created() {
    try {
      this.html = createRenderer(new Document())(this.nbJson).outerHTML;
    } catch (error) {
      // nbJson was probably null
    }
  },
  mounted() {
    // Bokeh JS loaded on the server does not work on the client
    this.parseNotebook(this.nbJson);
  },
  methods: {
    parseNotebook(nbJson) {
      if (nbJson && nbJson.cells && nbJson.cells.length > 0) {
        const element = render(nbJson);
        this.$el.prepend(element); // show the client-side rendered content first
        this.html = null; // remove the server-side rendered content
      }
    },
  },
};
</script>

<style>
.nb-notebook {
  line-height: 1.5;
}

.nb-cell + .nb-cell {
  margin-top: 1.4rem;
}

.nb-raw-cell {
  font-family: monospace;
  white-space: pre-wrap;
}

.nb-code-cell {
  position: relative;
}

.nb-html-output {
  overflow-x: auto;
}

.nb-source::before,
.nb-output::before {
  position: absolute;
  font-family: monospace;
  color: #c7d2fe;
  left: -7.5em;
  width: 7em;
  text-align: right;
}

.prose img {
  max-width: 100%;
  border-radius: 0.5em;
  background: white;
}

.prose video {
  max-width: 100%;
  border-radius: 0.5em;
}

/* .nb-source::before {
    content: 'In [' attr(data-execution-count) ']:';
}
.nb-output::before {
    content: 'Out[' attr(data-execution-count) ']:';
} */

.nb-source + .nb-output,
.nb-output + .nb-output {
  margin-top: 1.4rem;
}

.nb-source > pre {
  background-color: #111827;
  color: #c7d2fe;
  border: none;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0;
  overflow-x: auto;
}

.nb-markdown-cell > pre {
  background-color: #111827;
  color: #c7d2fe;
  border: none;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0;
  overflow-x: auto;
}

.nb-output {
  min-height: 1em;
  width: 100%;
}

.nb-output > pre {
  padding: 1em;
  margin: 0;
  overflow-x: auto;
  color: #c7d2fe;
}

.nb-markdown-cell > pre {
  padding: 1em;
  margin: 0;
  overflow-x: auto;
  color: #c7d2fe;
}

.nb-output > img {
  max-width: 100%;
}

.nb-stdout,
.nb-stderr {
  white-space: pre-wrap;
}

.nb-error,
.nb-stderr {
  background-color: #db2777;
  border-radius: 0.5em;
}

@media (max-width: 768px) {
  .nb-source::before,
  .nb-output::before {
    display: block;
    position: relative;
    left: 0;
    padding-bottom: 0.5em;
    text-align: left;
  }
}

.hljs-comment {
  color: #fef3c7;
}

code {
  background-color: #111827;
}

.prose p {
  color: #c7d2fe;
}

.prose strong {
  color: #a5b4fc;
}

.prose a code {
  color: #c7d2fe;
}

.prose code {
  color: #c7d2fe;
  padding: 3px 6px 3px 6px;
  margin: 0 3px 0 3px;
  border-radius: 0.5em;
  font-weight: 100;
  color: #c7d2fe;
  border: none;
  overflow-x: auto;
}

code::before,
code::after {
  display: none;
}

tr {
  text-align: right;
  border: none;
}

td {
  width: 1px;
  white-space: nowrap;
}

th {
  color: #e0e7ff;
}

.prose table {
  width: 0.1%;
}

iframe {
  background: white;
  border-radius: 0.5em;
}

.bk-plot-wrapper table {
  margin: 0 auto;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #e0e7ff;
}
</style>