<template>
  <router-view></router-view>
  <img src="@/assets/USUS.png">
</template>

<script>
const accepted_hrefs = [
    '/',
    '/menu',
    '/menu/1',
    '/menu/3',
    '/menu/0',
]
export default {
  name: "App",
  mounted() {
    if (accepted_hrefs.indexOf(location.pathname) === -1) {
      location.replace('/');
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: black;
}

* {
  -webkit-tap-highlight-color: transparent;
}

html {
  background-color: #63b4f5;
}
img {
  position: fixed;
  height: 40px;
  bottom: 50px;
  left: 50%;
  opacity: .1;
  transform: translate(-50%, 10px);
}
</style>