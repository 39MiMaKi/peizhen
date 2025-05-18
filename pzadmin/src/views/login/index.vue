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
      <el-form
        :model="loginForm"
        style="max-width: 600px"
        class="demo-ruleForm">
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
        <el-form-item v-if="formType" prop="validCode">
          <el-input
            v-model="loginForm.validCode"
            placeholder="验证码"
            :prefix-icon="Lock">
            <template #append>
              <span @click="countDownChange">{{ countDown.validText }}</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="login" class="login-button" @click="handleChange">{{
        formType ? "注册" : "登录"
      }}</el-button>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

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

// 发送手机号，首先校验手机号格式，然后发送验证码
// 验证码倒计时
const countDown = reactive({
  validText: "获取验证码",
  time: 60,
});
// 防止重复发送验证码，造成数据错乱
let flag = false;

const countDownChange = () => {
  // 如果已发送就不处理
  if (flag) return;
  // 判断手机号格式
  const phoneReg =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
  const phoneMsg = () => {
    ElMessage({
      message: "请检查手机号格式是否正确",
      type: "warning",
    });
  };
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    return phoneMsg();
  }
  // 倒计时
  setInterval(() => {
    if (countDown.time <= 0) {
      countDown.time = 60;
      countDown.validText = `获取验证码`;
      flag = false;
    } else {
      countDown.time -= 1;
      countDown.validText = `剩余${countDown.time}秒`;
    }
  }, 1000);
  flag = true;
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
