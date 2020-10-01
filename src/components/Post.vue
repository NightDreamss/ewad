<template>
  <div class="h-auto w-full flex align-middle bg-gray-100">
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
      <div class="container py-24 mx-auto">
        <div class="flex flex-wrap">
          <div v-for="post in post" v-bind:key="post.id" class="p-4 md:w-1/3">
            <router-link
              class="h-full cursor-pointer"
              v-bind:to="{ name: 'ViewPost', params: { post_id: post.id } }"
            >
              <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  v-bind:src="post.imageURL"
                  alt="blog"
                />
                <div class="p-6">
                  <h2
                    class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"
                  >
                    {{ post.status }}
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    {{ post.title }}
                  </h1>
                  <p class="leading-relaxed mb-3">
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
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";
export default {
  name: "Post",
  data() {
    return {
      post: [],
    };
  },
  created() {
    const id = firebase.auth().currentUser.uid;
    db.collection("post")
      .where("id", "==", id)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const data = {
            id: doc.id,
            studentID: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            faculty: doc.data().faculty,
            fileURL: doc.data().fileURL,
            imageURL: doc.data().imageURL,
            status: doc.data().status,
            date: doc.data().date,
          };
          this.post.push(data);
        });
      });
  },
};
</script>
