<template>
  <section class="text-gray-700 body-font bg-gray-100">
    <div
      class="container mx-auto md:h-screen h-auto md:w-auto flex px-5 py-24 md:flex-row flex-col items-center"
    >
      <h1>Welcome back</h1>
      <div class=" ml-5">
        <ul>
          <li v-for="userData in userInfo" v-bind:key="userData.id">
            <div>{{ userData.email }}</div>
            {{ userData.username }}
          </li>
        </ul>
      </div>
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
    };
  },
  created() {
    const id = firebase.auth().currentUser.uid;
    db.collection("app")
      .doc("users")
      .collection(id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            username: doc.data().username,
            email: doc.data().email,
          };
          this.userInfo.push(data);
        });
      });
  },
};
</script>
