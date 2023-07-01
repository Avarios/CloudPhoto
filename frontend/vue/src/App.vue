<script lang="ts" setup>
import AppBar from './components/AppBar.vue';
</script>

<template>
  <div id="main" class="container-fluid">
    <AppBar class="appBar" />
    <router-view class=".main"/>
  </div>
</template>

<style>
.container {
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'footer footer footer footer footer footer';
  gap: 10px;
  padding: 10px;
  grid-template-rows: 200px 1fr 100px;
}

.appBar {
  grid-template-areas: "header";
}

.main {
  grid-template-areas: "main";
  position: relative;
}
.footer {
  grid-template-areas: "footer";
}

#app {
  margin: 20px 20px 0 0px;
}
</style>
