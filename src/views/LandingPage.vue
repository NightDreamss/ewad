<template>
  <div id="app">
    <Navbar />
    <LandingPage />
    <Footer />
  </div>
</template>

<script>
import LandingPage from "@/components/landingpage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default {
  name: "App",
  components: {
    LandingPage,
    Navbar,
    Footer,
  },
};
</script>
