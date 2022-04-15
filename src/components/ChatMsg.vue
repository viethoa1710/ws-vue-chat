<template>
    <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg m-2">
            <img src="@/assets/UserIcon.png" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer_send" v-bind:class="{my:myMsg}">
            <div><strong>{{message.User}}</strong></div>
            {{message.Msg}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatMsg",
        props: ['message'],
        computed:{
            myMsg(){
                return this.message.User === this.$store.state.UserName
            }
        }
    }
</script>

<style scoped>
.my{
    background-color: #0084FF;
    border-radius: 20px 20px 20px 0px;
}
.msg_cotainer_send{
    min-width: 15%;
}
</style>