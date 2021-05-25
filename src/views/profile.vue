<template>
  <div class="grid md:grid-cols-6 mt-20">
    <div class="col-start-2 col-span-4 bg-gray-800 jet text-white p-3 rounded-md">
      <div v-if="flag">
        <p>user email : {{useremail}}</p>
        <p>total codes saved : {{tc}}</p>
      </div>
      <div v-else >user is not authenticated to access this link plz login first </div>
    </div>
  </div>
</template>

<script>
import {db, fa} from "@/firebase/fireconfig";

export default {
  name: "profile",
  data(){
    return{
      useremail:'',
      tc:0,
      flag : false,
      uid:''
    }
  },
  mounted() {
    fa.onAuthStateChanged((user) => {
      if (user)
      {
        this.flag = true;
        this.uid = user.uid
        this.useremail = user.email

        db.collection("usercodes").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.id.toString().slice(0,28) === this.uid.toString()){
              this.tc = this.tc + 1
            }
          });
        });

      }
      else {
        this.flag = false;
        console.log("user not found")
      }
    });

  }
}
</script>

<style scoped>

</style>