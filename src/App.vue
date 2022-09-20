<template>
  <nav>
    <router-link to="/report" class="third after">財報分析</router-link> |
    <router-link to="/moat" class="third after">護城河優勢</router-link> |
    <router-link to="/risk" class="third after">風險扣分</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: #aebad2;
}

nav a:focus {
  /* color: #AEBAD2; */
  color: #222831;
}

/* nav a.router-link-exact-active {
  color: #17223F;
} */

.form-check-label {
  user-select: none;
}

a,
a:visited,
a:hover,
a:active {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  transition: 0.5s color ease;

  /* color: #aebad2; */
  /* font-size: 2.5em; */
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
  background: #e8eefb;
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
</style>
