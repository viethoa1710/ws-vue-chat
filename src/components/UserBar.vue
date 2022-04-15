<template>
  <div class="col-md-4 col-xl-3 chat">
    <div class="card mb-sm-3 mb-md-0 contacts_card">
      <h2 class="text-center m-2">Online ({{users.length}})</h2>
      <div class="card-body contacts_body">
        <ui class="contacts">
          <Person v-for="user in users" :name="user"></Person>
        </ui>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script>
import Person from "./Person";
export default {
  name: "UserBar",
  components: {
    Person,
  },
  computed: {
    users() {
      return this.$store.state.Users;
    },
  },
};
</script>

<style scoped>
h2 {
  color: white;
}
</style>