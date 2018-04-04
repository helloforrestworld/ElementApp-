<template>
  <div class="star" class="starType">
    <span v-for="itemClass,index in itemClasses" :class="itemClass" :key="index">
    </span>
  </div>
</template>
<script>
export default {
  name: "star",
  props: {
    'size' : {type: Number},
    'score': {type: Number}
  }
  data() {
    return {};
  },
  computed: {
    starType() {
      return;
    },
    itemClasses() {
      return;
    }
  }
};
</script>
<style lang="less" scoped>
</style>