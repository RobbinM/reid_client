<template>
  <div class='register'>
    <el-form rel='form' :model='form' label-width='80px'>
      <el-form-item label='用户名'>
        <el-input v-model='form.name'>请输入用户名</el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input v-model='form.pass' show-password></el-input>
      </el-form-item>
      <el-form-item label='重复密码'>
        <el-input v-model='form.pass_again' show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>立即注册</el-button>
        <el-button @click='goLogin'>去登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

let {remote} = require("electron")

export default {
  name: 'register',
  data: function () {
    return {
      form: {
        name: '',
        pass: '',
        pass_again: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      if (this.form.name !== '' && this.form.pass !== '' && this.form.pass_again !== '') {
        if (this.form.pass === this.form.pass_again) {
          console.log('register: username: ' + this.form.name + ' password: ' + this.form.pass)
          let user = this.$db.get('users').find({name: this.form.name}).value()
          if (user) {
            alert('该用户已存在')
          } else {
            this.$db.defaults({users: []}).write()
            this.$db.get('users')
                .push({name: this.form.name, pass: this.form.pass})
                .write()
            this.$router.push('main')
            // let size = remote.screen.getPrimaryDisplay().workAreaSize;
            let width = parseInt('1000');
            let height = parseInt('650');
            remote.getCurrentWindow().setSize(width, height);
          }
        } else {
          alert('两次输入的密码不一致')
        }
      } else {
        alert('请输入用户名和密码')
      }
    },
    goLogin: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.register {
  width: 300px;
  padding-top: 10px;
}
</style>