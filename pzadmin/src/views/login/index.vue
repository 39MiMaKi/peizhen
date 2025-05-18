<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <!-- #header 具名插槽 -->
      <template #header>
        <div class="card-header">
          <!-- 动态引入图片 -->
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <!-- 登录/注册切换链接 -->
      <div class="jump-link">
        <el-link type="primary" @click="handleChange">{{
          formType ? "返回登录" : "注册帐号"
        }}</el-link>
      </div>
      <!-- 登录/注册表单 -->
      <el-form :model="loginForm" label-width="120px">
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="手机号"
            :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password></el-input>
        </el-form-item>
        <el-form-item prop="validCode">
          <el-input
            v-model="loginForm.validCode"
            placeholder="验证码"
            :prefix-icon="Lock"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="login" class="login-button">注册帐号</el-button>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";

// 在Vite中，public目录下的静态资源可以直接通过根路径访问
const imgUrl = new URL("../../../public/login-head.png", import.meta.url).href;

// 表单数据
const loginForm = reactive({
  userName: "",
  passWord: "",
  validCode: "",
});

// 点击切换登录注册表单,默认登录
const formType = ref(0);

// 点击切换登录注册链接
const handleChange = () => {
  formType.value = formType.value ? 0 : 1;
};
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
  .el-form-item {
    width: 100%;
  }
  .login-button {
    background-color: #899fe1;
    color: #fff;
    width: 100%;
  }
}
</style>
