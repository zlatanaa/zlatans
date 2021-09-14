<template>
   <div>
        <ul>
          <li>
            <router-link to='/home/message/detail/1'>message001</router-link>
          </li>
          <li>
            <router-link to='/home/message/detail/2'>message002</router-link>
          </li>
          <li>
            <router-link to='/home/message/detail/3'>message003</router-link>
          </li>
        </ul>
        <button @click="$router.push({
          name:'detail',
          params:{id:4}
        })">添加</button>
        <button @click="$router.replace({
          name:'detail',
          params:{id:5}
        })">替换</button>
        <router-view></router-view>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>