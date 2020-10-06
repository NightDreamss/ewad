<template>
  <section class="md:min-h-screen h-auto w-full flex align-middle bg-gray-100">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          Please Select A Faculty
        </h1>
      </div>
      <div class="flex flex-wrap -m-4 text-center justify-center">
        <div class="p-4 md:w-1/4 sm:w-1/2 w-full" v-bind:key="cs_id">
          <router-link
            v-bind:to="{
              name: 'Reports',
              params: {
                cs: cs,
              },
            }"
          >
            <div
              class="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white cursor-pointer"
              @click="guestCS"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M8 17l4 4 4-4m-4-5v9" />
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
              </svg>
              <h2 class="title-font font-medium text-xl text-gray-900">
                Computer Science
              </h2>
            </div>
          </router-link>
        </div>
        <div class="p-4 md:w-1/4 sm:w-1/2 w-full" v-bind:key="bm_id">
          <router-link
            v-bind:to="{
              name: 'Reports',
              params: {
                bm: bm,
              },
            }"
          >
            <div
              class="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white cursor-pointer"
              @click="guestBM"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
              </svg>
              <h2 class="title-font font-medium text-xl text-gray-900">
                Business Management
              </h2>
            </div>
          </router-link>
        </div>
        <div class="p-4 md:w-1/4 sm:w-1/2 w-full" v-bind:key="gd_id">
          <router-link
            v-bind:to="{
              name: 'Reports',
              params: {
                gd: gd,
              },
            }"
          >
            <div
              class="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white cursor-pointer"
              @click="guestGD"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M3 18v-6a9 9 0 0118 0v6" />
                <path
                  d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
                />
              </svg>
              <h2 class="title-font font-medium text-xl text-gray-900">
                Graphic Design
              </h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    guestCS() {
      firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          console.log(error);
        });
    },
    guestBM() {
      firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          console.log(error);
        });
    },
    guestGD() {
      firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  data: () => ({
    cs: "1",
    bm: "2",
    gd: "3",
    cs_id: "ComputerScience",
    bm_id: "BusinessManagement",
    gd_id: "GraphicDesign",
  }),
};
</script>
