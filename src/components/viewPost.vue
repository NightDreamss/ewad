<template>
  <section class="md:min-h-screen h-auto w-full flex align-middle bg-gray-100">
    <div class="container px-5 py-24 mx-auto">
      <div class="md:flex my-4">
        <div class="my-auto">
          <router-link
            v-bind:to="{
              name: 'EditPost',
              params: {
                post_id: post_id,
              },
            }"
            class="mr-5 hover:text-gray-900 cursor-pointer"
          >
            <button
              class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="button"
            >
              Edit Post
            </button>
          </router-link>
        </div>
      </div>
      <section
        class="h-auto w-full flex align-middle bg-white p-6 pb-12 mb-6 rounded-lg"
      >
        <h1 class="container w-full my-auto mx-auto">
          <h1
            class="inline-block py-1 px-3 rounded bg-gray-400 text-sm font-medium tracking-widest mb-4"
            v-if="this.status == 'UNPUBLISHED'"
          >
            {{ this.status }}
          </h1>
          <h1
            class="inline-block py-1 px-3 rounded bg-gray-400 text-sm font-medium tracking-widest mb-4"
            v-else
          >
            {{ this.status }}
          </h1>
          <h1 class="mb-2 text-base">Created by {{ this.email }}</h1>
          <h1 class="mb-4 text-gray-500 text-sm">{{ this.date }}</h1>

          <img
            class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded"
            alt="hero"
            v-bind:src="this.imageURL"
          />
          <div class="flex flex-col text-center w-full">
            <h1 class="font-bold text-2xl title-font mb-4 text-gray-900">
              {{ this.title }}
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-sm mb-4">
              {{ this.description }}
            </p>
            <a
              class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:w-1/3 mx-auto w-full"
              type="button"
              :href="this.fileURL"
            >
              Download Word Doc
            </a>
          </div>
        </h1>
      </section>
      <Comments v-bind:postID="postID" />
    </div>
  </section>
</template>

<script>
import Comments from "./comments";
import { db } from "../main";
export default {
  components: {
    Comments,
  },
  props: ["post_id"],
  methods: {},
  created() {
    db.collection("post")
      .doc(this.post_id)
      .get()
      .then((doc) => {
        this.title = doc.data().title;
        this.studentID = doc.data().id;
        this.description = doc.data().description;
        this.faculty = doc.data().faculty;
        this.fileURL = doc.data().fileURL;
        this.imageURL = doc.data().imageURL;
        this.imagePath = doc.data().imagePath;
        this.filePath = doc.data().filePath;
        this.status = doc.data().status;
        this.date = doc.data().date.toDate();
        db.collection("users")
          .doc(this.studentID)
          .get()
          .then((doc) => {
            this.email = doc.data().email;
          });
      });
    this.postID = this.post_id;
  },
  data: () => ({
    email: "",
    title: "",
    studentID: "",
    description: "",
    faculty: "",
    fileURL: "",
    imageURL: "",
    imagePath: "",
    filePath: "",
    status: "",
    date: "",
    postID: "",
  }),
};
</script>
