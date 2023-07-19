<template>
  <nav>
    <router-link to="/instructions" class="third after">使用說明</router-link> |
    <router-link to="/report" class="third after">財報分析</router-link> |
    <router-link to="/moat" class="third after">護城河優勢</router-link> |
    <router-link to="/risk" class="third after">風險扣分</router-link> |
    <router-link to="/reits" class="third after">REITs評分標準</router-link> |
    <router-link to="/bank" class="third after">銀行股評分標準</router-link> |
    <router-link to="/roi" class="third after">年化報酬率計算</router-link>
  </nav>
  <router-view />
</template>

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
