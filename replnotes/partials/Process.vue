<template>
  <section class="bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 text-indigo-200">
      <div class="pt-12 pb-12 md:pt-24 md:pb-24">
        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-8 md:pb-12">
          <h2
            class="
              text-3xl
              font-bold
              text-indigo-400
              sm:text-4xl
              lg:text-5xl
              my-4
            "
            data-aos="fade-up"
          >
            Get started in three quick steps
          </h2>
        </div>

        <!-- Items -->
        <div
          class="
            max-w-sm
            mx-auto
            grid
            gap-8
            md:grid-cols-3
            lg:gap-16
            items-start
            md:max-w-none
          "
        >
          <!-- 1st item -->
          <div class="relative flex flex-col items-center" data-aos="fade-up">
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
              data-aos-delay="200"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <h4 class="text-2xl font-bold mb-2">
              <span class="text-gray-400">1</span>. Create an account
            </h4>
            <p class="text-md text-indigo-200 text-center">
              Create an account and get a free subdomain at
              username.replnotes.com to host your blog. You can also set up your
              own custom domain under the premium plan.
            </p>
          </div>

          <!-- 2nd item -->
          <div class="relative flex flex-col items-center" data-aos="fade-up">
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
              data-aos-delay="200"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4"
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
            <h4 class="text-2xl font-bold mb-2">
              <span class="text-gray-400">2</span>. Upload a notebook
            </h4>
            <p class="text-md text-indigo-200 text-center">
              Creating a blog post is as easy as uploading your Jupyter
              notebook. We'll scan the notebook and autopopulate various details
              like image thumbnail previews for the post, but you can always
              customize them to your satisfaction.
            </p>
          </div>

          <!-- 3rd item -->
          <div class="relative flex flex-col items-center" data-aos="fade-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4"
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
            <h4 class="text-2xl font-bold mb-2">
              <span class="text-gray-400">3</span>. Save and publish
            </h4>
            <p class="text-md text-indigo-200 text-center">
              Just hit save and the blog post will be online at
              username.replnotes.com/url, and your custom domain if you have it
              set up.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Process",
};
</script>