<template>
    <div>
        <input type="text" v-model="name" > <br>
        <button @click="handle(0)">原序</button>
        <button @click="handle(1)">升序</button>
        <button @click="handle(2)">降序</button>
        <ul>
            <li v-for="item in newList" :key="item.age">
                {{item.name}}--{{item.age}}--{{item.sex}}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
    data(){
        return{
            name:'',
            sortType:0
        }
    },
    methods:{
        handle(sortType){
            this.sortType = sortType
        }
    },
    computed:{
        ...mapState(['userList']),
        newList(){
           const arr = this.userList.filter((item)=>{
                return item.name.includes(this.name)
                 
            })
            if(this.sortType !== 0){
                arr.sort((perA,perB)=>{
                 return this.sortType === 1?perA.age - perB.age:perB.age - perA.age
            })
            }
            return arr
        }
    },
}
</script>

<style>

</style>