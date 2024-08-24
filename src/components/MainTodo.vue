<script setup lang="ts">
import { ref } from 'vue'
import { useTodoList } from '@/composables/useTodoList'

const { todoList, add, edit, check } = useTodoList()

const todo = ref<string | undefined>()

const addTodo = () => {
  if (!todo.value) return
  add(todo.value)
  todo.value = ''
}

const editTodo = (_id: number) => {
  edit(_id)
}

const changeCheck = (_id: number) => {
  check(_id)
}
</script>

<template>
  <div>
    <input
      type="text"
      class="todo_input"
      v-model="todo"
      @keyup.enter="addTodo"
      placeholder="TODOを入力"
    />
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoList" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        />
        <input
          v-show="!todo.checked"
          type="text"
          class="task"
          @keyup.enter="editTodo(todo.id)"
          @blur="editTodo(todo.id)"
          v-model="todo.task"
        />
        <label v-show="todo.checked">{{ todo.task }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo_input {
  width: 250px;
  padding: 6px 8px;
  margin-right: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}

.box_list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.todo_list {
  display: flex;
  gap: 5px;
  align-items: center;
}

.todo {
  width: 300px;
  padding: 4px 1px;
}

.check {
  margin-right: 12px;
  transform: scale(1.6);
}

.task {
  width: 120px;
  font-size: 15px;
  border: 0px;
}

.fin {
  font-size: 15px;
  color: #777;
  text-decoration: line-through;
  background-color: #ddd;
}
</style>
