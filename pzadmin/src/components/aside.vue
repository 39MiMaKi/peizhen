<template>
  <!-- Element Plus 菜单组件 -->
  <el-menu
    :style="{ width: isCollapse ? '64px' : '230px' }"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse">
    <!-- Logo 标题 -->
    <p class="logo-title">{{ isCollapse ? "DIDI" : "DIDI陪诊" }}</p>
    <!-- TreeMenu 组件，用于显示层级菜单 -->
    <!-- :index="1"：传递给 TreeMenu 组件的初始索引 -->
    <!-- :menuData="menuData"：传递给 TreeMenu 组件的菜单数据 -->
    <TreeMenu :index="1" :menuData="menuData" />
  </el-menu>
</template>

<script lang="ts" setup>
import TreeMenu from "./treeMenu.vue";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

// 获取路由实例
const router = useRouter();
// console.log(router); // 打印路由信息，用于调试

// 定义菜单数据，使用 reactive使其成为响应式数据
// router.options.routes[0].children 获取的是路由配置中第一个路由的子路由作为菜单数据
const menuData = reactive(router.options.routes[0].children);
const store = useStore();
const isCollapse = computed(() => store.state.menu.isCollapse);

// el-menu 的 open 事件回调
const handleOpen = () => {};

// el-menu 的 close 事件回调
const handleClose = () => {};
</script>

<style lang="less" scoped>
/* scoped 表示样式只作用于当前组件 */
.aside-container {
  height: 100%; /* 容器高度占满父元素 */
  .logo-title {
    font-size: 20px; /* Logo 字体大小 */
    text-align: center; /* Logo 文本居中 */
    height: 50px; /* Logo 区域高度 */
    line-height: 50px; /* Logo 文本行高，使其垂直居中 */
    color: #f5f5f5; /* Logo 文本颜色 */
  }
}
</style>
