<template>

  <Nav/>
  <router-view/>

</template>

<script>
import Nav from "./views/navbar.vue"
export default {

  components:{
    Nav
  }
}
</script>

<style>

.html{
  font-family:'JetBrains Mono', monospace;
}

.jet{
  font-family: 'JetBrains Mono', monospace;
}

</style>