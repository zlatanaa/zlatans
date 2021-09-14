<template>
  <div class="row">
    <!-- 展示用户列表 -->
    <div class="card" v-for="item in userList" :key="item.id">
      <a target="_blank" :href="item.html_url">
        <img :src="item.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{item.login}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'List',
  data(){
    return{
      userList:[]
    }
  },
  methods:{
   async handle(username){
     if(!username)return
      const result = await axios({
        url:'https://api.github.com/search/users',
        params:{q:username}
      })
      console.log(result)
      this.userList = result.data.items
    }
  },
  mounted(){
    this.$bus.$on('getUserName',this.handle)
  }
}
// https://api.github.com/search/users
</script>
<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
