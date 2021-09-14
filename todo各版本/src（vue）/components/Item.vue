<template>
  <li @mouseenter="enterHandle" @mouseleave="leaveHandle">
    <label>
      <input type="checkbox" v-bind:checked="todos.isDone" @click="updateTodo(todos.id)" />
      <span :class="todos.isDone?'active':'' ">{{todos.todoName}}</span>
    </label>
    <button class="btn btn-danger" :style="styleObj" @click="deleteTodo(todos.id)">删除</button>
  </li>
</template>

<script>
import { mapMutations, mapState} from 'vuex'
export default {
  props:['todos'],
  data(){
    return{
      styleObj:{'display':'none'}
    }
  },
  methods:{
    enterHandle(){
      return this.styleObj = {'display':'block'}
    },
    leaveHandle(){
       return this.styleObj = {'display':'none'}
    },
    ...mapMutations(['updateTodo','deleteTodo'])
  },
  computed:{
    ...mapState(['todoList'])
  },
  updated(){
    localStorage.setItem('todos',JSON.stringify(this.todoList))
  }

}
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  /* display:flex; */
  /* align-items: center; */
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
.active{
  text-decoration: line-through;
  color: #999;
}
</style>
