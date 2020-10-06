<template>
  <header class="text-gray-900 body-font">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <img src="../assets/images/logo.png" class="h-10" />

      <nav
        class="md:ml-auto flex flex-wrap items-center text-base justify-center font-serif"
      >
        <router-link
          v-if="userType == '1'"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          :to="{ name: 'AllPost' }"
          >Home</router-link
        >
        <router-link
          v-else-if="userType == '2'"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          :to="{ name: 'CoordinatorHome' }"
          >Home</router-link
        >
        <router-link
          v-else-if="userType == '3'"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          :to="{ name: 'Post' }"
          >Home</router-link
        >
        <router-link
          v-else-if="userType == '4'"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          :to="{ name: 'Reports' }"
          >Home</router-link
        >
        <router-link
          v-else
          to="/"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          >Home</router-link
        >
        <a
          v-if="loggedIn"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          @click="signOut"
          >Sign Out</a
        >
        <router-link
          v-else
          to="/login"
          class="mr-5 hover:text-gray-900 cursor-pointer"
          >Login</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  created() {
    firebase.auth().onAuthStateChanged((userLogged) => {
      this.loggedIn = !!userLogged;
    });
  },
  props: ["userType"],
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.$router.push({ name: "Home" }).catch(() => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
