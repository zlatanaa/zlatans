import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        todoList:JSON.parse(localStorage.getItem('todos')) || []
    }, 
    actions:{
        addTodo({commit},todoName){
            commit('add',todoName)
        }
    },
    mutations:{
        updateTodo(state,id){
            state.todoList.forEach((item)=>{
                if(item.id === id){
                    item.isDone = !item.isDone
                }
            })
        },
        add(state,todoName){
            const todo = {
                todoName,
                id:Date.now(),
                isDone:false
            }
            state.todoList.push(todo)
        },
        deleteTodo(state,id){
            state.todoList = state.todoList.filter((item)=>{
                if(item.id !== id){
                    return item
                }
            })
        },
        allChecked(state){
           const result = state.todoList.every(item=>item.isDone)
           state.todoList.forEach(item=>item.isDone = !result)
        },
        deleteDone(state){
            state.todoList = state.todoList.filter(item=>!item.isDone)
        }
    }
})