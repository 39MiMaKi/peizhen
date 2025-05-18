<template>
  <el-row class="login-container">
    <el-card>
      <!-- #header 具名插槽 -->
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
    </el-card>
  </el-row>
</template>

<script setup>
// 在Vite中，public目录下的静态资源可以直接通过根路径访问
const imgUrl = "/login-head.png";
</script>

<style lang="less" scoped>
:deep(.el-card__container) {
  padding: 0;
}

.login-container {
  // 是让元素在父元素中水平居中，不是父元素自身在页面居中
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 480px;
  .card-header {
    background-color: #899fe1;
    .img {
      width: 430px;
    }
  }
}
</style>
