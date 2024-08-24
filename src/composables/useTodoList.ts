import { ref } from 'vue'

export const useTodoList = () => {
  const todoList = ref<{ id: number; task: string; checked: boolean }[]>([])
  const ls = localStorage.todoList

  // ローカルストレージにtodoListが存在していればparseし、
  // なければ空配列をセット
  todoList.value = ls ? JSON.parse(ls) : []

  const findById = (_id: number) => {
    return todoList.value.find((todo) => todo.id === _id)
  }

  const findIndexById = (_id: number) => {
    return todoList.value.findIndex((todo) => todo.id === _id)
  }

  const add = (_task: string) => {
    const id = new Date().getTime()
    todoList.value.push({ id: id, task: _task, checked: false })
    localStorage.todoList = JSON.stringify(todoList.value)
  }

  const edit = (_id: number) => {
    const todo = findById(_id)
    const idx = findIndexById(_id)
    if (!todo) return
    if (todo?.task === '') {
      del(_id)
    } else {
      todoList.value.splice(idx, 1, todo) // splice関数で_idxを元にTODOを置換
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  const del = (_id: number) => {
    const todo = findById(_id)
    if (todo) {
      const idx = findIndexById(_id)
      todoList.value.splice(idx, 1)
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  const check = (_id: number) => {
    const todo = findById(_id)
    const idx = findIndexById(_id)

    if (todo) {
      todo.checked = !todo.checked //反転
      todoList.value.splice(idx, 1, todo)
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  return { todoList, add, edit, check }
}
