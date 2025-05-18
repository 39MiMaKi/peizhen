<template>
  <div class="header-container">
    <!-- 左侧tag部分 -->
    <div class="header-left flex-box">
      <!-- 折叠图标，点击事件调用store的commit方法出发对折叠菜单值的取反操作 -->
      <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"
        ><Fold
      /></el-icon>

      <ul class="flex-box">
        <li
          v-for="(item, index) in selectMenu"
          :key="item.path"
          :class="{ selected: route.path === item.path }"
          class="tab flex-box">
          <el-icon size="12"><component :is="item.icon"></component></el-icon>
          <router-link class="text flex-box" :to="{ path: item.path }">{{
            item.name
          }}</router-link>

          <el-icon class="close" size="12" @click="closeTab(item, index)"
            ><Close
          /></el-icon>
        </li>
      </ul>
    </div>
    <!-- 右侧个人资料部分 -->
    <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

          <p class="user-name">admin</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
// 当前的路由对象
import { useRoute, useRouter } from "vue-router";

// 拿到store实例
const store = useStore();
const route = useRoute();
const router = useRouter();

// Vuex的模块化结构是将模块的状态挂载到根state下，所以访问路径是 store.state.模块名.状态名
const selectMenu = computed(() => store.state.menu.selectMenu);

// 点击关闭tab事件
const closeTab = (item, index) => {
  store.commit("closeMenu", item);
  // 删除的非当前页tag
  if (route.path !== item.path) {
    return;
  }
  const selectMenuData = selectMenu.value;
  // 删除的是最后一项，往前移动
  if (index === selectMenuData.length) {
    // 如果只有一个tag
    if (!selectMenuData.length) {
      router.push("/");
    } else {
      router.push({
        path: selectMenuData[index - 1].path,
      });
    }
  } else {
    // 删除的是中间位置tag
    router.push({
      path: selectMenuData[index].path,
    });
  }
};
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-container {
  display: flex;
  // 水平方向上靠边
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;

  .header-left {
    height: 100%;

    .icon {
      width: 45px;
      height: 100%;

      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }

    .selected {
      color: var(--el-color-primary);
      .text {
        color: var(--el-color-primary);
      }
    }
    .tab {
      padding: 0 10px;
      height: 100%;

      .text {
        margin: 0 5px;
      }
      .close {
        visibility: hidden;
      }
      &:hover {
        background-color: #f5f5f5;
        .close {
          visibility: visible;
          color: #000;
          cursor: pointer;
        }
      }
    }
  }

  .header-right {
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }

    .user-name {
      margin-left: 10px;
    }
  }

  a {
    height: 100%;
    color: black;
    font-size: 15px;
  }
}
</style>
