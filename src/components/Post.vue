<template>
  <div class="md:min-h-screen h-auto w-full flex align-middle bg-gray-100">
    <div class="container px-5 py-24 mx-auto">
      <div class="md:flex my-4">
        <div class="my-auto">
          <router-link
            :to="{ name: 'CreatePost' }"
            class="mr-5 hover:text-gray-900 cursor-pointer"
          >
            <button
              class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="button"
            >
              Create A Post
            </button>
          </router-link>
        </div>
      </div>
      <h1
        v-if="post === undefined || post.length == 0"
        class="text-center font-semibold text-2xl pt-4"
      >
        No Post Created
      </h1>
      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <div v-for="post in post" v-bind:key="post.id" class="p-4 md:w-1/3">
            <router-link
              class="h-full cursor-pointer"
              v-bind:to="{
                name: 'ViewPost',
                params: {
                  post_id: post.id,
                },
              }"
            >
              <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  v-bind:src="post.imageURL"
                  alt="blog"
                />
                <div class="p-6">
                  <h2
                    class="inline-block py-1 px-3 rounded bg-gray-400 text-xs font-medium tracking-widest mb-2"
                    v-if="post.status == 'UNPUBLISHED'"
                  >
                    {{ post.status }}
                  </h2>
                  <h2
                    class="inline-block py-1 px-3 rounded bg-green-200 text-xs font-medium tracking-widest mb-2"
                    v-else
                  >
                    {{ post.status }}
                  </h2>
                  <h1 class="title-font text-base font-bold text-gray-900 mb-3">
                    {{ post.title }}
                  </h1>
                  <p class="leading-relaxed text-sm mb-3">
                    {{ post.description }}
                  </p>
                  <div class="flex items-center flex-wrap"></div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  name: "Post",
};
</script>
