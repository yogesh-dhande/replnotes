<template>
  <div>
    <div
      class="mx-auto my-auto justify-center p-4 bg-gray-800 rounded-md"
      @drop.prevent="handleFileDrop"
      @dragover.prevent
    >
      <div class="space-y-1 text-center">
        <div class="text-md">
          <label :for="refKey">
            <span
              class="
                relative
                cursor-pointer
                rounded-md
                font-medium
                text-indigo-300
                hover:text-indigo-500
                focus-within:outline-none
                focus-within:ring-2
                focus-within:ring-offset-2
                focus-within:ring-indigo-500
              "
              >{{ label }}</span
            >
            <input
              :id="refKey"
              :ref="refKey"
              type="file"
              class="sr-only"
              @change="handleFileInput"
            />
          </label>
          <span class="pl-1">or drag and drop</span>
        </div>
      </div>
      <div v-if="photoUrl" class="mt-2">
        <div
          class="mx-auto h-48 w-48 bg-cover bg-center flex justify-center"
          :class="{ ' rounded-full': showThumbnail }"
          :style="{
            backgroundImage: 'url(' + photoUrl + ')',
          }"
        >
          <button
            type="button"
            class="
              my-auto
              mb-10
              bg-red-500
              py-2
              px-3
              rounded-md
              shadow-sm
              text-sm
              leading-4
              font-medium
              text-white
              hover:bg-red-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-red-300
            "
            @click="remove"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const maxWidth = 1000
const maxHeight = 1000

function resizeImage(img) {
  const canvas = document.createElement('canvas')

  let width = img.width
  let height = img.height

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      // height *= maxWidth / width;
      height = Math.round((height *= maxWidth / width))
      width = maxWidth
    }
  } else if (height > maxHeight) {
    // width *= maxHeight / height;
    width = Math.round((width *= maxHeight / height))
    height = maxHeight
  }

  // resize the canvas and draw the image data into it
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.7) // get the data from canvas as 70% JPG (can be also PNG, etc.)
}

export default {
  name: 'ImageInput',
  props: {
    imageSrc: {
      type: String,
      default: null,
    },
    refKey: {
      type: String,
      default: null,
    },
    showThumbnail: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: 'Upload an image',
    },
  },
  data() {
    return {
      file: null,
      photoUrl: this.imageSrc,
    }
  },
  methods: {
    remove() {
      this.file = null
      this.photoUrl = null
      this.$emit('remove')
    },
    handleFileInput() {
      this.selectFile(this.$refs[this.refKey].files[0])
    },
    handleFileDrop(event) {
      const droppedFiles = event.dataTransfer.files
      if (droppedFiles) {
        this.selectFile(droppedFiles[0])
      }
    },
    selectFile(file) {
      this.file = file
      this.$emit('input', this.file)

      // read the files
      const reader = new FileReader()
      reader.readAsArrayBuffer(this.file)

      reader.onload = (event) => {
        // blob stuff
        const blob = new Blob([event.target.result]) // create blob...
        window.URL = window.URL || window.webkitURL
        const blobURL = window.URL.createObjectURL(blob) // and get it's URL

        // helper Image object
        const image = new Image()
        image.src = blobURL
        // preview.appendChild(image); // preview commented out, I am using the canvas instead
        image.onload = () => {
          // have to wait till it's loaded
          this.photoUrl = resizeImage(image) // send it to canvas
          this.$emit('url', this.photoUrl)
        }
      }
    },
  },
}
</script>

<style>
</style>