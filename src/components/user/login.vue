<template>
  <div class="login">
    <el-form rel="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name">请输入用户名</el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pass">请输入密码</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登陆</el-button>
        <el-button @click="goRegister">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let {remote} = require("electron");

export default {
  name: "login",
  data: () => {
    return {
      form: {
        name: "",
        pass: "",
      },
    };
  },
  methods: {
    onSubmit: function () {
      console.log(
          "login: username: " + this.form.name + " password: " + this.form.pass
      );
      let user = this.$db.get('user').find({name: this.form.name}).value()
      if (!user) {
        alert("没有这个用户")
      } else {
        this.$router.push("main");
        let size = remote.screen.getPrimaryDisplay().workAreaSize;
        let width = parseInt(size.width * 0.6);
        let height = parseInt(size.height * 0.7);
        remote.getCurrentWindow().setSize(width, height);
        console.log(user)
      }
    },
    goRegister: function () {
      this.$router.push("register");
    },
  },
};
</script>

<style scoped>
.login {
  width: 300px;
  padding-top: 50px;
}
</style>