<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-bind:checked="toDone === allDone" @change="allChecked" />
    </label>
    <span> <span>已完成{{toDone}}</span> / 全部{{allDone}} </span>
    <button class="btn btn-danger" @click="deleteDone">清除已完成任务</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['todoList']),
    allDone(){
     return this.todoList.length
    },
    toDone(){
      return this.todoList.filter(item=>item.isDone).length
    }
  },
  methods:{
    ...mapMutations(['allChecked','deleteDone'])
  }
}
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
