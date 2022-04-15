<template>
  <li>
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img src="@/assets/UserIcon.png" class="rounded-circle user_img" />
      </div>
      <div class="user_info">
        <span>{{ name }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Person",
  props: ["name"],
};
</script>

<style scoped>
</style>