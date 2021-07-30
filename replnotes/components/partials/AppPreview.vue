<template>
  <!-- Hero image -->
  <div class="mx-auto">
    <div id="browser-window" class="mx-4 sm:mx-8">
      <div id="controls" class="px-3 sm:py-1">
        <span class="close rounded-full w-3 h-3 sm:w-4 sm:h-4"></span>
        <span class="minimize rounded-full w-3 h-3 sm:w-4 sm:h-4"></span>
        <span class="maximize rounded-full w-3 h-3 sm:w-4 sm:h-4"></span>
      </div>
      <div class="viewport">
        <div class="content">
          <img
            class="sm:hidden rounded-lg shadow-lg mx-auto w-full"
            src="~/static/demo-sm.gif"
            alt="App screenshot"
          />
          <img
            class="hidden sm:block rounded-lg shadow-lg mx-auto w-full"
            src="~/static/demo-lg.gif"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#browser-window {
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  /* fix height for controls*/
  text-align: left;
  box-shadow: 0 0 10px #2f7083;
}

#controls {
  background: #e7eaed;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top: 1px solid white;
}

#controls span {
  display: inline-block;
  margin-left: 5px;
  background: #333;
}

#controls span.close {
  background: #ed6a5e;
}

#controls span.minimize {
  background: #f6be50;
}

#controls span.maximize {
  background: #62c555;
}

.viewport {
  overflow: scroll;
  height: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.content img {
  width: 100%;
}
</style>