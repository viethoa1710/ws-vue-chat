<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <UserBar />
      <ChatComponent />
    </div>
  </div>
</template>

<script>
import UserBar from "../components/UserBar";
import ChatComponent from "../components/ChatComponent";
export default {
  Name: "Chat",
  components: {
    UserBar,
    ChatComponent,
  },
};
</script>
