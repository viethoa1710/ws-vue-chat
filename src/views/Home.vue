<template>
  <div class="home">
    <div class="p-2 m-4">
      <div class="container w-25">
        <form id="form" @submit.prevent="ConnectUser">
          <div class="mb-3">
            <label class="form-label">UserName</label>
            <input type="text" class="form-control" v-model="UserName" />
          </div>
          <button type="submit" class="btn btn-primary">Enter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return { UserName: "" };
  },
  methods: {
    ConnectUser: function () {
      if (this.UserName) {
        this.$store.state.UserName = this.UserName;
        var STORE_ = this.$store;
        STORE_.state.Connection = new WebSocket("ws://localhost:5000");
        STORE_.state.Connection.onopen = function () {
          STORE_.state.Connection.send(
            JSON.stringify({ Command: "ADD_USER", User: STORE_.state.UserName })
          );
          STORE_.state.Connection.send(
            JSON.stringify({ Command: "GET_USERS" })
          );
          console.log("connected");
        };
        STORE_.state.Connection.onmessage = function (response) {
          console.log("Message received");
          var responseJson = JSON.parse(response.data);
          if (responseJson.Command === "NEW_MESSAGE") {
            var NewMsg = { User: responseJson.User, Msg: responseJson.Msg };
            STORE_.state.messages.push(NewMsg);
          }
          if (responseJson.Command === "ADD_USER") {
            STORE_.state.Users.push(responseJson.User);
          }
          if (responseJson.Command === "REMOVE_USER") {
            STORE_.state.Users = STORE_.state.Users.filter((user) => {
              return user !== responseJson.User;
            });
          }
          if (
            responseJson.Command === "GET_USERS" &&
            !STORE_.state.isValidUsers
          ) {
            STORE_.state.Users = responseJson.Users;
            STORE_.state.isValidUsers = true;
          }
        };
        this.$router.push("/chat");
      }
    },
  },
};
</script>
