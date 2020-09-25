<template>
  <header class="text-gray-900 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <span class="ml-3 text-xl text-blue-600">Uni Magazine</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center font-serif">
        <router-link v-if="loggedIn" to="/home" class="mr-5 hover:text-gray-900 cursor-pointer">Home</router-link>
        <router-link v-else to="/" class="mr-5 hover:text-gray-900 cursor-pointer">Home</router-link>
        <a v-if="loggedIn" class="mr-5 hover:text-gray-900 cursor-pointer" @click="signOut">Sign Out</a>
        <router-link v-else to="/login" class="mr-5 hover:text-gray-900 cursor-pointer">Login</router-link>
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
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.$router.replace({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
