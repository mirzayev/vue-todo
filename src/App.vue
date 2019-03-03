<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todoList/>
  </div>
</template>

<script>
import todoList from "./components/todoList";

export default {
  name: "App",
  components: {
    todoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  height: 80px;
  margin: 20px auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
