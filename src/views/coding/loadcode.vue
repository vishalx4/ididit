<template>
  <div v-if="flag" class="grid md:grid-cols-8 ">

    <div class="col-start-2 col-span-6 bg-gray-900 text-green-400 mt-20 jet p-5 ">

      <p v-if="codename.length > 0">codename -> {{codename}}</p>
      <p v-if="category.length > 0">category -> {{category}}</p>
      <p v-if="description.length > 0">code description -> {{description}}</p>
      <a v-if="questionlink.length > 0" :href="questionlink"> questionLink</a>

      <div class="">
        <pre class="" v-highlightjs> <code :class="selectedLang">{{code}}</code> </pre>
      </div>

    </div>

  </div>
  <div v-else>
    <p class="text-center jet text-center font-bold "> User is not Authenticated to view this page plz login first </p>
  </div>
</template>

<script>
import {db, fa} from "@/firebase/fireconfig";

export default {
  name: "loadcode",
  data(){
    return{
      id: this.$route.params.id,
      code:'',
      codename:'',
      selectedLang:'',
      description:"",
      questionlink:"",
      category:"",
      flag : false
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

    db.collection('usercodes').doc(this.$route.params.id)
      .get()
      .then( (doc)=>{
          this.code = doc.get('code')
          this.codename = doc.get('codename')
          this.selectedLang = doc.get('language')
          this.description = doc.get('description')
          this.questionlink = doc.get('question')
          this.category = doc.get('category')
      })
      .catch( (error)=>{

      })
  }
}
</script>

<style scoped>

</style>