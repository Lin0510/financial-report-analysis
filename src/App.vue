<template>
  <nav>
    <router-link to="/report">財報分析</router-link> |
    <router-link to="/moat">護城河優勢</router-link> |
    <router-link to="/risk">風險扣分</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.form-check-label{
  user-select: none;
}
</style>
