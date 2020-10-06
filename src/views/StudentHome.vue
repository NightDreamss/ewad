<template>
  <div id="app">
    <Navbar v-bind:userType="userType" />
    <Home v-bind:post="post" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Home from "@/components/studentHome";
import Footer from "@/components/footer";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";

export default {
  name: "App",
  components: {
    Navbar,
    Home,
    Footer,
  },
  created() {
    const id = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        const userType = doc.data().userType;
        this.userType = doc.data().userType;
        const email = doc.data().email;
        if (userType == "1") {
          this.$router.replace({ name: "MarketingHome" });
        } else if (userType == "2") {
          this.$router.replace({ name: "CoordinatorHome" });
        } else if (userType == "3") {
          this.$router
            .push({ name: "Post" })
            .catch(() => {})
            .then(() => {
              db.collection("post")
                .where("id", "==", id)
                .get()
                .then((query) => {
                  query.forEach((doc) => {
                    const data = {
                      id: doc.id,
                      email: email,
                      studentID: doc.data().id,
                      title: doc.data().title,
                      description: doc.data().description,
                      faculty: doc.data().faculty,
                      fileURL: doc.data().fileURL,
                      imageURL: doc.data().imageURL,
                      status: doc.data().status,
                      date: doc.data().date.toDate(),
                    };
                    this.post.push(data);
                  });
                });
            });
        }
      });
  },
  data() {
    return {
      post: [],
      userType: "",
    };
  },
};
</script>
