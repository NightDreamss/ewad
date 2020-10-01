<template>
  <div id="app">
    <createPostForm />
  </div>
</template>

<script>
import createPostForm from "@/components/createPostForm";

export default {
  name: "App",
  components: {
    createPostForm,
  },
};
</script>