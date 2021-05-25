<template>

  <div class="grid mr-10 ml-10 lg:grid-cols-3 flex-wrap">
    <div
      class=" lg:col-start-2 p-2 text-xs jet  text-white bg-gray-800 font-bold mt-3 rounded-3xl  items-center"
    >

      <div v-if="flag === false" class="flex justify-around">
        <div class="mlg-6 items-center">
          <router-link :to="{name:'Home'}" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 class="w-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                 fill="#12B0E8">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </router-link>
          <p class="text-xs">home</p>
        </div>

        <div class="ml-6 justify-items-center ">
          <router-link :to="{name:'Login'}" >
            <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                  fill="none" viewBox="0 0 24 24"
                  stroke="#12B0E8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </router-link>
          <p class="text-xs">login</p>
        </div>
      </div>

      <div v-else class="flex justify-around">
        <div class="ml-6 justify-items-center">
          <router-link :to="{name:'Code'}" >
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                 viewBox="0 0 20 20"
                 fill="#12B0E8">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <p class="text-xs">code</p>
        </div>

        <div class="ml-6 items-center">
          <router-link :to="{name:'Profile'}">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                 viewBox="0 0 20 20" fill="#12B0E8">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <p class="text-xs">profile</p>
        </div>




        <div class="ml-6 justify-items-center ">
          <svg @click="logout" xmlns="http://www.w3.org/2000/svg"
               class="w-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
               fill="none"
               viewBox="0 0 24 24"
               stroke="#12B0E8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <p class="text-xs">logout</p>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {fa} from "../firebase/fireconfig.js";

export default {
    data() {
        return {
            flag :false
        }
    },
    methods: {
        logout(){
          fa.signOut().then(() => {
            console.log("user logout ")
              this.$router.go(-1)
          }).catch((error) => {

          });

        }
    },
  mounted() {
    fa.onAuthStateChanged((user) => {
      if (user) {
        this.flag = true;
        console.log(user.email + " found")
      } else {
        this.flag = false;
        console.log("user not found")
      }
    });
  }
};
</script>

<style scoped>


</style>