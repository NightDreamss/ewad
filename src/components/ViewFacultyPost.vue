<template>
  <section class="md:min-h-screen h-auto w-full flex align-middle bg-gray-100">
    <div class="container px-5 py-24 mx-auto">
      <section class="h-auto w-full flex align-middle bg-white rounded-lg p-4">
        <h1 class="container w-full my-auto mx-auto">
          <h1
            class="inline-block py-1 px-3 rounded bg-gray-400 text-sm font-medium tracking-widest mb-4"
            v-if="post_status == 'UNPUBLISHED'"
          >
            {{ post_status }}
          </h1>
          <h1
            class="inline-block py-1 px-3 rounded bg-gray-400 text-sm font-medium tracking-widest mb-4"
            v-else
          >
            {{ post_status }}
          </h1>
          <h1 class="mb-2 text-base">Created by {{ post_email }}</h1>
          <h1 class="mb-4 text-gray-500 text-sm">{{ post_date }}</h1>

          <img
            class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded"
            alt="hero"
            v-bind:src="post_image"
          />
          <div class="flex flex-col text-center w-full">
            <h1 class="font-bold text-2xl title-font mb-4 text-gray-900">
              {{ post_title }}
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-sm mb-4">
              {{ post_description }}
            </p>
            <a
              class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:w-1/3 mx-auto w-full"
              type="button"
              :href="post_file"
            >
              Download Word Doc
            </a>
          </div>
        </h1>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    "post_email",
    "post_title",
    "post_description",
    "post_faculty",
    "post_file",
    "post_id",
    "post_image",
    "post_status",
    "post_studentID",
    "post_date",
  ],
  methods: {},
};
</script>
