<template>
  <div>
    <p v-if="flag === false">sorry y are not authenticated to acces this url</p>
  </div>
</template>

<script>
import {fa} from "../../firebase/fireconfig"

export default {
  name: "authenticated",
  data(){
    return{
      flag:false
    }
  },
  mounted() {

  }
};
</script>

<style scoped>

</style>