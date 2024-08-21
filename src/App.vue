<script setup lang="ts">
import MainTodo from '@/components/MainTodo.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <div class="warp">
    <TheHeader />
    <main class="main"><MainTodo /></main>
    <TheFooter />
  </div>
</template>
