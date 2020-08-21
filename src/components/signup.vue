<template>
  <section
    class="md:h-screen h-auto w-full py-24 flex align-middle bg-gray-100"
  >
    <div class="container max-w-2xl w-full my-auto mx-auto ">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 "
        >
          <h1 class="font-semibold text-2xl text-center py-10">
            Welcome To
          </h1>

          <div class="md:flex md:items-center mb-6">
            <div class=" md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Username
              </label>
            </div>
            <ValidationProvider
              name="Name"
              rules="required|alpha"
              v-slot="{ errors }"
              class="md:w-full md:pr-20"
            >
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="username"
                v-model="formData.username"
                type="text"
              />
              <span class=" text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class=" md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Email
              </label>
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
                type="email"
                v-model="formData.email"
              />
              <span class=" text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class=" md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Password
              </label>
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
              <span class=" text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="flex">
            <div class="my-auto mx-auto w-1/3">
              <button
                class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Signup
              </button>
            </div>
          </div>
          <div class=" text-center pt-6">
            <h4 class=" text-gray-500">
              Already have an account?
              <router-link to="/login" class="text-indigo-500 cursor-pointer"
                >Login</router-link
              >
            </h4>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";

export default {
  methods: {
    async onSubmit() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          );
        this.$router.replace({ name: "PrivateHome" });
        const id = await firebase.auth().currentUser.uid;
        db.collection("app")
          .doc("users")
          .collection(id)
          .add({
            username: `${this.formData.username}`,
            email: `${this.formData.email}`,
            password: `${this.formData.password}`,
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data: () => ({
    formData: {
      username: "",
      email: "",
      password: "",
    },
  }),
};
</script>
