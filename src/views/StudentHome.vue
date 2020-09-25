<template>
  <div id="app">
    <Navbar />
    <Home />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Home from "@/components/studentHome";
import Footer from "@/components/footer";

export default {
  name: "App",
  components: {
    Navbar,
    Home,
    Footer,
  },
};
</script>
