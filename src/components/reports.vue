<template>
  <div class="flex flex-row flex-wrap flex-grow mt-2">
    <Bar />
  </div>
</template>
<script>
import Bar from "./Bar";
export default {
  props: ["cs", "bm", "gd"],
  created() {},
  components: {
    Bar,
  },
};
</script>
