<template>
  <div id="app">
    <Navbar />
    <Login />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Login from "@/components/login";

export default {
  name: "App",
  components: {
    Navbar,
    Login,
    Footer,
  },
};
</script>
