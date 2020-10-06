<template>
  <router-view
    class="md:min-h-screen h-auto w-full flex align-middle bg-gray-100"
    v-bind:post="post"
  ></router-view>
</template>

<script>
export default {
  props: ["post"],
};
</script>
