<template>
  <div id="app">
    <Navbar />
    <Signup />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Signup from "@/components/signup";

export default {
  name: "App",
  components: {
    Navbar,
    Signup,
    Footer,
  },
};
</script>
