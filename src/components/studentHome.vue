<template>
  <section class="h-auto w-full flex align-middle bg-gray-100">
    <div class="container px-5 py-24 mx-auto">
      <h1
        v-for="userData in userInfo"
        v-bind:key="userData.id"
        class="text-center font-semibold text-2xl"
      >
        Welcome back <br />{{ userData.email }}
      </h1>
      <div class="md:flex md:justify-between">
        <div class="md:flex my-4">
          <div class="my-auto">
            <router-link
              :to="{ name: 'CreatePost' }"
              class="mr-5 hover:text-gray-900 cursor-pointer"
            >
              <button
                class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="button"
                @click="postCreate"
              >
                Create Post
              </button>
            </router-link>
          </div>
        </div>
        <div class="md:flex my-4">
          <div class="my-auto">
            <router-link
              :to="{ name: 'Post' }"
              class="mr-5 hover:text-gray-900 cursor-pointer"
            >
              <button
                class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="button"
                @click="postCreate"
              >
                View Posts
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";
export default {
  data() {
    return {
      userInfo: [],
      post: true,
    };
  },
  created() {
    const id = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        const data = {
          id: doc.id,
          email: doc.data().email,
        };
        const userType = doc.data().userType;
        if (userType == "1") {
          this.$router.replace({ name: "MarketingHome" });
        } else if (userType == "2") {
          this.$router.replace({ name: "CoordinatorHome" });
        } else if (userType == "3") {
          this.$router.push({ name: "StudentHome" }).catch(() => {});
        }
        this.userInfo.push(data);
      });
  },
  methods: {
    postCreate() {
      this.post = false;
    },
  },
};
</script>
