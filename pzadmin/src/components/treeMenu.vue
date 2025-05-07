<template>
  <!-- 使用 template v-for 遍历菜单数据 -->
  <template v-for="(item, index) in props.menuData">
    <!-- 如果当前菜单项没有子菜单 (item.children 不存在或长度为 0) -->
    <el-menu-item
      @click="handleClick(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length == 0"
      :index="`${props.index}-${item.meta.id}`"
      :key="`${props.index}-${item.meta.id}`">
      <!-- Element Plus 图标组件 -->
      <el-icon size="20">
        <!-- 动态组件，根据 item.meta.icon 的值渲染对应的图标 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 菜单项名称 -->
      <span>{{ item.meta.name }}</span>
    </el-menu-item>

    <!-- 如果当前菜单项有子菜单 -->
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <!-- 子菜单标题 -->
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>

      <!-- 递归调用 TreeMenu 组件，渲染子菜单 -->
      <!-- :index: 传递新的索引，保证唯一性 -->
      <!-- :menuData: 传递子菜单数据 -->
      <tree-menu
        :index="`${props.index}-${item.meta.id}`"
        :menuData="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter } from "vue-router";
// 使用 defineProps 获取父组件传递过来的数据
// props.menuData: 菜单数据数组
// props.index: 当前菜单的索引，用于生成唯一的 key 和 index
const props = defineProps(["menuData", "index"]);
// console.log(props, "props"); // 打印 props，用于调试

// 创建router实例
const router = useRouter();
// 点击菜单
const handleClick = (item, active) => {
  console.log(item, "item");

  router.push(item.meta.path);
};
</script>

<style lang="less" scoped>
/* scoped 表示样式只作用于当前组件 */
</style>
