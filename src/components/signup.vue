<template>
  <section
    class="md:h-screen h-auto w-full py-24 flex align-middle bg-gray-100"
  >
    <div class="container max-w-2xl w-full my-auto mx-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <h1 class="font-semibold text-2xl text-center py-10">Welcome To</h1>
          <p id="errorAuth" class="text-xs text-red-500 text-center pb-6"></p>
          <p id="errorDB" class="text-xs text-red-500 text-center pb-6"></p>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
                >User</label
              >
            </div>
            <ValidationProvider
              name="User"
              rules="required"
              v-slot="{ errors }"
              class="md:w-full md:pr-20"
            >
              <ejs-dropdownlist
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                :dataSource="userList"
                :fields="userFields"
                :change="onUserSelected"
                name="user"
                id="user"
                v-model="formData.user"
              ></ejs-dropdownlist>
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div
            class="md:flex md:items-center mb-6"
            id="faculty-field"
            v-show="Hidden === true"
          >
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
                >Faculty</label
              >
            </div>
            <ValidationProvider
              name="Faculty"
              rules="required"
              v-slot="{ errors }"
              class="md:w-full md:pr-20"
            >
              <ejs-dropdownlist
                :dataSource="facultyList"
                :fields="facultyFields"
                name="faculty"
                id="faculty"
                v-model="formData.faculty"
              ></ejs-dropdownlist>
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
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
                type="email"
                v-model="formData.email"
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
                class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Signup
              </button>
            </div>
          </div>
          <div class="text-center pt-6">
            <h4 class="text-gray-500">
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
import Vue from "vue";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";

Vue.use(DropDownListPlugin);

export default {
  methods: {
    onUserSelected: function() {
      let userType = document.getElementById("user").value;
      if (userType != "Marketing Manager") {
        this.Hidden = true;
        this.formData.faculty = "";
      } else {
        this.Hidden = false;
        this.formData.faculty = "0";
      }
    },
    async onSubmit() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .catch(function(e) {
            const error = document.getElementById("errorAuth");
            const errorMessage = document.createTextNode(e.message);
            error.appendChild(errorMessage);
          })
          .then(() => {
            const id = firebase.auth().currentUser.uid;
            db.collection("users")
              .doc(`${id}`)
              .set({
                userType: `${this.formData.user}`,
                faculty: `${this.formData.faculty}`,
                email: `${this.formData.email}`,
                password: `${this.formData.password}`,
              })
              .catch(function(e) {
                const error = document.getElementById("errorDB");
                const errorMessage = document.createTextNode(e.message);
                error.appendChild(errorMessage);
              })
              .then(() => {
                if (this.formData.user === "3") {
                  this.$router.replace({ name: "StudentHome" });
                } else if (this.formData.user == "2") {
                  this.$router.replace({ name: "CoordinatorHome" });
                } else if (this.formData.user == "1") {
                  this.$router.replace({ name: "MarketingHome" });
                }
              });
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data: function() {
    return {
      Hidden: false,
      dataQuery: "All",
      userList: [
        { Users: "Marketing Manager", UserId: "1" },
        { Users: "Marketing Coordinator", UserId: "2" },
        { Users: "Student", UserId: "3" },
      ],
      userFields: { text: "Users", value: "UserId" },
      facultyList: [
        { Faculty: "Computer Science", FacultyId: "1" },
        { Faculty: "Business Management", FacultyId: "2" },
        { Faculty: "Graphic Design", FacultyId: "3" },
      ],
      facultyFields: { text: "Faculty", value: "FacultyId" },
      formData: {
        user: "",
        faculty: "",
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>
