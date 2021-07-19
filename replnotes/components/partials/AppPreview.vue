<template>
  <!-- Hero image -->
  <div class="relative">
    <div class="absolute inset-0 flex flex-col" aria-hidden="true">
      <div class="flex-1"></div>
      <div class="flex-1 w-full bg-gray-900"></div>
    </div>
    <div>
      <div
        class="relative flex justify-center items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <img
          class="mx-auto rounded-lg"
          src="/appImage.png"
          width="1024"
          height="504"
          alt="Hero"
        />
        <a
          class="absolute group"
          href="#0"
          aria-controls="modal"
          @click.prevent.stop="videoModalOpen = true"
        >
          <svg
            class="
              w-16
              h-16
              sm:w-20
              sm:h-20
              hover:opacity-75
              transition
              duration-150
              ease-in-out
            "
            viewBox="0 0 88 88"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="a"
                x1="78.169%"
                y1="9.507%"
                x2="24.434%"
                y2="90.469%"
              >
                <stop stop-color="#EBF1F5" stop-opacity=".8" offset="0%" />
                <stop stop-color="#EBF1F5" offset="100%" />
              </linearGradient>
            </defs>
            <circle fill="url(#a)" cx="44" cy="44" r="44" />
            <path
              class="fill-current text-purple-600"
              d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
            />
          </svg>
        </a>
      </div>

      <!-- Modal -->
      <Modal
        id="modal"
        aria-label="modal-headline"
        :show="videoModalOpen"
        @handleClose="videoModalOpen = false"
      >
        <iframe
          width="1424"
          height="595"
          src="https://www.youtube.com/embed/6Pvrk1Qt-B4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/layouts/Modal.vue";

export default {
  components: { Modal },
};
</script>

<style>
</style>