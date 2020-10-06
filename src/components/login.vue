<template>
  <section
    class="md:min-h-screen h-auto w-full py-24 flex align-middle bg-gray-100"
  >
    <div class="container max-w-2xl w-full my-auto mx-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="bg-white shadow-md rounded px-8 pt-2 pb-8"
        >
          <h1 class="font-semibold text-2xl text-center pt-10">
            Welcome Back To
          </h1>
          <h1 class="font-semibold text-2xl text-center pb-6 text-blue-600">
            Uni Magazine
          </h1>
          <p id="errorAuth" class="text-xs text-red-500 text-center pb-6"></p>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
                >Email</label
              >
            </div>

            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
              class="md:w-full md:pr-20"
            >
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="email"
                v-model="formData.email"
                type="email"
              />
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
                >Password</label
              >
            </div>
            <ValidationProvider
              name="Password"
              rules="required|max:12|min:8"
              v-slot="{ errors }"
              class="md:w-full md:pr-20"
            >
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="password"
                v-model="formData.password"
                type="password"
              />
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="flex">
            <div class="my-auto mx-auto w-1/3">
              <button
                class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
          <div class="text-center py-4">
            <h4 class="text-lg text-gray-500">or</h4>
          </div>
          <div class="flex">
            <div class="my-auto mx-auto w-1/3">
              <router-link
                to="/signup"
                class="mr-5 hover:text-gray-900 cursor-pointer"
              >
                <button
                  class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="button"
                >
                  Signup
                </button>
              </router-link>
            </div>
          </div>
          <div class="text-center py-4">
            <h4 class="text-lg text-gray-500">or</h4>
          </div>
          <div class="text-center">
            <h4 class="text-gray-500">
              <router-link
                to="/guest_login"
                class="text-indigo-500 cursor-pointer"
                >Guest Login</router-link
              >
            </h4>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";

export default {
  methods: {
    async onSubmit() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .catch(function (e) {
            const error = document.getElementById("errorAuth");
            const errorMessage = document.createTextNode(e.message);
            error.innerHTML = errorMessage.textContent;
          })
          .then(() => {
            const id = firebase.auth().currentUser.uid;
            db.collection("users")
              .doc(id)
              .get()
              .then((doc) => {
                const userAccount = doc.data().userType;
                if (userAccount == "1") {
                  this.$router.replace({ name: "MarketingHome" });
                } else if (userAccount == "2") {
                  this.$router.replace({ name: "CoordinatorHome" });
                } else if (userAccount == "3") {
                  this.$router.replace({ name: "StudentHome" });
                }
              });
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
};
</script>
