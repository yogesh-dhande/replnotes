<template>
  <section class="bg-gray-800 leading-relaxed">
    <div class="max-w-7xl mx-auto px-6 sm:px-12 text-indigo-200">
      <div class="py-12 sm:py-24">
        <!-- Section header -->
        <div class="text-center">
          <h2
            class="text-4xl sm:text-5xl text-indigo-100 font-extrabold"
            data-aos="fade-up"
          >
            Get started in three quick steps
          </h2>
        </div>

        <!-- Items -->
        <div
          class="
            max-w-md
            mx-auto
            grid
            gap-8
            lg:grid-cols-3
            items-start
            lg:max-w-none
            mt-12
            text-center
          "
        >
          <!-- 1st item -->
          <div
            class="
              relative
              flex flex-col
              items-center
              bg-gray-900
              px-4
              py-8
              rounded-xl
              bg-opacity-50
              hover:bg-opacity-100
            "
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              aria-hidden="true"
              class="
                absolute
                h-1
                border-t border-dashed border-gray-700
                hidden
                md:block
              "
              style="
                width: calc(100% - 32px);
                left: calc(50% + 48px);
                top: 32px;
              "
              data-aos="fade-in"
              data-aos-delay="400"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <h4 class="text-2xl font-bold mb-2 text-indigo-100">
              <span>1</span>. Create an account
            </h4>
            <p class="text-lg text-indigo-200 text-center">
              Create an account and get a free subdomain at
              <span class="italic">username.replnotes.com</span> to host your
              blog. You can also set up your own custom domain under the premium
              plan.
            </p>
          </div>

          <!-- 2nd item -->
          <div
            class="
              relative
              flex flex-col
              items-center
              bg-gray-900
              px-4
              py-8
              rounded-xl
              bg-opacity-50
              hover:bg-opacity-100
            "
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div
              aria-hidden="true"
              class="
                absolute
                h-1
                border-t border-dashed border-gray-700
                hidden
                md:block
              "
              style="
                width: calc(100% - 32px);
                left: calc(50% + 48px);
                top: 32px;
              "
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h4 class="text-2xl font-bold mb-2 text-indigo-100">
              <span>2</span>. Upload a notebook
            </h4>
            <p class="text-lg text-indigo-200 text-center">
              Creating a blog post is as easy as uploading your Jupyter
              notebook. The notebook is scanned to autofill all necessary
              details but you can always customize them to your satisfaction.
            </p>
          </div>

          <!-- 3rd item -->
          <div
            class="
              relative
              flex flex-col
              items-center
              bg-gray-900
              px-4
              py-8
              rounded-xl
              bg-opacity-50
              hover:bg-opacity-100
            "
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <h4 class="text-2xl font-bold mb-2 text-indigo-100">
              <span>3</span>. Save and publish
            </h4>
            <p class="text-lg text-indigo-200 text-center">
              Just hit save and the blog post will be online on your custom
              domain. No need to write any HTML or Javascript. We handle the
              website creation and deployment for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Process',
}
</script>