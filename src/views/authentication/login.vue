<template>

    <div v-if="flag" class="grid  grid-cols-1 md:grid-cols-6 mt-28">
        <div class="md:col-start-2 col-span-4 ">

            <div class="mb-5" v-if="error.length > 0">
              <p class="p-2 jet text-red-500 bg-gray-800 border-solid border-4 border-red-600 rounded-md"> {{error}} </p>
            </div>

            <div class="grid mr-10 ml-10 grid-cols-1 md:grid-cols-2 rounded-xl text-white font-bold  text-center items-center border-2 border-blue-500 bg-gray-800 p-6 md:p-20">

                <div class="jet font-bold text-3xl text-blue-500">
                        <p>LOGIN FORM -></p>
                </div>
                <div class="flex-wrap">
                        <input v-model="email" class="m-2 rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 " type="email"><br>
                        <input v-model="password" class="m-2 rounded-xl px-2 py-1  text-black border-2 border-blue-500 focus:ring-4 "  type="password"><br>
                        <button @click="login" class="rounded-sm bg-blue-500 px-4 py-1">Login</button>
                        <p @click="switchform" class="jet mt-3 cursor-pointer font-bold ">haven't register yet? </p>
                </div>

            </div>
        </div>
    </div>

    <div v-else class="grid  grid-cols-1 md:grid-cols-6 mt-28">
        <div class="md:col-start-2 col-span-4 ">
            <div class="grid mr-10 ml-10 grid-cols-1 md:grid-cols-2 rounded-xl text-white font-bold  text-center items-center border-2 border-blue-500 bg-gray-800 p-6 md:p-20">

                <div class="jet font-bold text-3xl text-blue-500">
                        <p>REGISTER FORM -></p>
                </div>
                <div class="flex-wrap">
                        <input v-model="email" class="m-2 rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 " type="email"><br>
                        <input v-model="password" class="m-2 rounded-xl px-2 py-1  text-black border-2 border-blue-500 focus:ring-4 "  type="password"><br>
                        <button @click="registerUser" class="rounded-sm bg-blue-500 px-4 py-1">register</button>
                        <p @click="switchform" class="jet mt-3 cursor-pointer font-bold ">alredy have an account</p>
                </div>

            </div>
        </div>
    </div>


    
</template>

<script>
import {fa} from "@/firebase/fireconfig";

export default {
    data() {
        return {
            flag : true,
            email:"",
            password:"",
            error:""
        }
    },
    methods: {
        switchform(){
            this.flag = !this.flag
            this.email = ""
            this.password = ""
        },
        login(){
            fa.signInWithEmailAndPassword(this.email,this.password)
              .then((userCredential)=>{
                this.email = userCredential.user.email
                this.error = " "
                this.$router.go(-1)
              })
              .catch((error)=>{
                console.log(error.code)
                console.log(error.message)
                this.error = error.message;
              })
        },
        registerUser(){
             fa.createUserWithEmailAndPassword(this.email, this.password)
                 .then((userCredential) => {
                   this.email = userCredential.user.email
                   this.error = " "
                   this.$router.go(-1)
                 })
                 .catch((error) => {
                   console.log(error.code)
                   console.log(error.message)
                   this.error = error.message;
                 });
        }

    },
}
</script>

<style scoped>

</style>