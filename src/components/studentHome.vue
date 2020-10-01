<template>
  <router-view
    class="h-auto w-full flex align-middle bg-gray-100"
  ></router-view>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";
export default {
  created() {
    const id = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        const userType = doc.data().userType;
        if (userType == "1") {
          this.$router.replace({ name: "MarketingHome" });
        } else if (userType == "2") {
          this.$router.replace({ name: "CoordinatorHome" });
        } else if (userType == "3") {
          this.$router.push({ name: "Post" }).catch(() => {});
        }
      });
  },
};
</script>
