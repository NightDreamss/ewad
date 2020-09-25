<template>
  <div id="app">
    <Navbar />
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
};
</script>