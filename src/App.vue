<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="instructions">使用說明</el-menu-item>
    <el-sub-menu index="report">
      <template #title>美股財報分析</template>
      <el-menu-item index="report">財報關鍵指標評分</el-menu-item>
      <el-menu-item index="moat">護城河優勢</el-menu-item>
      <el-menu-item index="risk">風險扣分</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="reits">REITs評分標準</el-menu-item>
    <el-menu-item index="bank">銀行股評分標準</el-menu-item>
    <el-menu-item index="roi">年化報酬率計算</el-menu-item>
  </el-menu>
  <div class="h-6" />

  <router-view />
</template>
<script lang="ts" setup>
import { ref } from "vue";
const activeIndex = ref("1");
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  user-select: none;
}
nav {
  margin-bottom: 30px;
  padding: 1x;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  text-underline-offset: 3px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 20px;
}

nav a:focus {
  color: #222831;
}

nav a.router-link-exact-active {
  color: #0a58ca;
}

a,
a:visited,
a:hover,
a:active {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  transition: 0.5s color ease;
}
a.before:before,
a.after:after {
  content: "";
  transition: 0.5s all ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
}
a.before:before {
  top: -0.15em;
}
a.after:after {
  bottom: -0.15em;
}
a.before:before,
a.after:after {
  height: 5px;
  height: 0.15rem;
  width: 0;
  background: #0abde3;
}
a.third:after,
a.sixth:before,
a.sixth:after {
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
a.before:hover:before,
a.after:hover:after {
  width: 100%;
}

/* 禁止圖標 */
.disabled {
  color: #4f4f4f;
  font-family: Lato;
  font-size: 10pt;
  font-weight: bold;
  position: relative;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  cursor: no-drop;
}
</style>
