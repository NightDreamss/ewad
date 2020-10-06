<template>
  <div id="app">
    <Navbar v-bind:userType="userType" />
    <GuestLogin />
    <Footer />
  </div>
</template>

<script>
import GuestLogin from "@/components/guestlogin";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default {
  name: "App",
  components: {
    GuestLogin,
    Navbar,
    Footer,
  },
  created() {
    this.$router.push({ name: "ChooseFaculty" });
  },
  data() {
    return {
      userType: "4",
    };
  },
};
</script>
