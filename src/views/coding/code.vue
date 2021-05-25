<template>
  <div v-if="flag" class="mt-20" >
    <div class="grid md:grid-cols-6 jet ">
        <div class="rounded-xl md:col-start-2 col-span-4 bg-gray-800 text-white  mb-20 p-10 jet">

          <button @click="getallcodes" v-if="s" class="px-4 py-1 border-2 border-blue-600" >all codes</button>
          <button @click="s = !s" v-else class="px-4 py-1 border-2 border-blue-600">upload form</button>

          <div v-if="s" >
            <p class="text-center text-5xl mb-6 underline">upload code</p>

            <p>codename</p>
            <input v-model="codename" class="w-full rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 mb-2" type="link"><br>

            <p>question link</p>
            <input v-model="questionlink" class="w-full rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 mb-2" type="link"><br>

            <p>catagory</p>
            <div class="flex items-center">

              <input v-model="category" placeholder="category must not contain whitespaces" class="w-2/4 rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 mb-2" type="link">

              <select class="text-black ml-2" v-model="c" >
                <option  v-for="(k,index) in categorylist" :key="index" :value="k.cate"> {{k.cate}} </option>
              </select>

            </div>
            <br>



            <p class="mt-2">code description</p>
            <textarea
                v-model="description"
                class="mt-2 w-full rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 "
                name="code" id="description" cols="10" rows="5"></textarea><br>



            <p class="mt-6"> select language -></p>
            <select class="text-black"  v-model="selectedLang">
              <option value="cpp" >cpp</option>
              <option value="c">c</option>
              <option value="java">java</option>
              <option value="javascript">javascript</option>
              <option value="python">python</option>
            </select>


            <p class="mt-6">paste your code here </p>

            <textarea
                v-model="code"
                class="mt-2 w-full rounded-xl px-2 py-1 text-black border-2 border-blue-500 focus:ring-4 "
                name="code" id="code" cols="30" rows="5"></textarea><br>

            <!-- code highlighting -->
            <pre class="m-5 p-2 " v-highlightjs> <code :class="selectedLang">{{code}}</code> </pre>

            <button @click="upload" class="bg-blue-500 px-4 py-1 rounded-sm">upload</button>
            <p class="m-2 text-green-600">{{uploadprocess}}</p>
          </div>
          <div v-else class="mt-6">

              <div class="flex mb-14 items-center">
                <p>sort using category -> </p>
                <select class="text-black ml-2" v-model="c" >
                  <option value="all"> all </option>
                  <option  v-for="(k,index) in categorylist" :key="index" :value="k.cate"> {{k.cate}} </option>
                </select>
                <button @click="sortcode" class="ml-5 px-2 py-1 rounded-full bg-blue-700">go</button>
              </div>

              <div v-for="(item,index) in allcodes" :key="index">
                  <p @click="loadcode(item.docid)"  class="px-4 py-1 border-2 border-green-600 cursor-pointer hover:bg-green-600 mb-4">
                   codename -> {{ item.codename }} <br> category -> {{ item.category}}
                  </p>
              </div>
          </div>
             
        </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center jet text-center font-bold "> User is not Authenticated to view this page plz login first </p>
  </div>
</template>

<script>
import {db,fa} from "@/firebase/fireconfig";

export default {
    data() {
        return {
            flag :false,
            s:false,
            uid:'',
            email:'',
            code:'',
            codename:'',
            selectedLang:'',
            description:"",
            questionlink:"",
            category:"",
            allcodes:[],
            c:"",
            categorylist:[],
            uploadprocess:"uploadprocess"
        }
    },
  methods:{
      upload(){
        let suffix = new Date().toISOString()
        let x = this.uid+suffix

        if(this.category.length == 0) this.category = this.c
        // console.log(x.slice(0,this.uid.length) === this.uid)
        if((this.code.length > 0 && this.category.length > 0 && this.codename.length > 0) && (this.category.trim().indexOf(' ')<0) ){

        db.collection('usercodes').doc(x).set({
            category:this.category,
            code:this.code,
            description:this.description,
            language:this.selectedLang,
            question:this.questionlink,
            codename:this.codename
          }).then(()=>{
            this.uploadprocess = "uploaded successfully"
            console.log("uploaded successfully")
          }).catch((error)=>{
            this.uploadprocess = "error while uploading code"
            console.log("error while uploading code")
            console.log(error.message)
          })
        }
        else this.uploadprocess = "code is empty"
      },
      loadcode(id){
        this.$router.push({ path: `/loadcode/${id}` })
      },
      getallcodes(){
        this.s = !this.s
        this.allcodes = []
        this.categorylist = []
        db.collection("usercodes").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.id.toString().slice(0,28) === this.uid.toString()){
              this.allcodes.push({
                category:doc.get('category'),
                codename: doc.get('codename'),
                docid:doc.id.toString()
              })
              this.categorylist.push({
                cate:doc.get('category')
              })
            }
          });
        });
      },
      sortcode(){
          console.log(this.c)
          if( this.c.length >0 ){
            this.allcodes = []

            if(this.c === 'all'){
              this.categorylist = []
              db.collection("usercodes").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if(doc.id.toString().slice(0,28) === this.uid.toString()){
                    this.allcodes.push({
                      category:doc.get('category'),
                      codename: doc.get('codename'),
                      docid:doc.id.toString()
                    })
                    this.categorylist.push({
                      cate:doc.get('category')
                    })
                  }
                });
              });
            }
            else{
              db.collection("usercodes").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  let ca = doc.get('category').toString()
                  if(doc.id.toString().slice(0,28) === this.uid.toString() && this.c === ca){
                    this.allcodes.push({
                      category:doc.get('category'),
                      codename: doc.get('codename'),
                      docid:doc.id.toString()
                    })
                    console.log(this.allcodes)
                  }
                });
              });
            }

          }
      }

  },
  mounted() {

      fa.onAuthStateChanged((user) => {
        if (user)
        {
          this.flag = true;
          this.uid = user.uid
          this.email = user.email
          console.log(user.email + " found")
          console.log(fa.currentUser.uid)

          db.collection("usercodes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(doc.id.toString().slice(0,28) === this.uid.toString()){
                this.allcodes.push({
                  category:doc.get('category'),
                  codename: doc.get('codename'),
                  docid:doc.id.toString()
                })
                this.categorylist.push({
                  cate:doc.get('category')
                })
                console.log(this.allcodes[0])
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