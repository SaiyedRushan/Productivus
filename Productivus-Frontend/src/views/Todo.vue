<template>
  <v-container fluid>
    <v-sheet class="pa-5">
      <v-layout style="height: 1000px">
        <v-app-bar elevation="1">
          <v-app-bar-nav-icon @click.stop="todoListDrawer = !todoListDrawer" icon="mdi-menu-right-outline"></v-app-bar-nav-icon>
          <v-toolbar-title>To-Dos</v-toolbar-title>
          <v-spacer></v-spacer>

          <span class="text-h6">
            {{ todoLists.find((list) => list.id == currentTodoListId).title }}
          </span>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn icon="mdi-delete-forever-outline" @click="clearAll">
            <v-icon icon="mdi-delete-forever-outline"></v-icon>
            <v-tooltip activator="parent">Clear All</v-tooltip>
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="todoListDrawer">
          <v-list>
            <v-list-item v-for="item in todoLists" :key="item.title" :title="item.title" link @click="currentTodoListId = item.id">
            </v-list-item>
          </v-list>
          <v-footer>
            <v-btn>
              <v-icon>mdi-plus</v-icon>
              <span class="mx-2">New List</span>
            </v-btn>
          </v-footer>
        </v-navigation-drawer>

        <v-main>
          <v-container class="pa-5" fluid>
            <v-row
              v-for="todo in todoLists.find((list) => list.id === currentTodoListId).todos"
              :id="todo.id"
              align-content="center"
              class="mx-5"
            >
              <div style="width: 40px">
                <v-checkbox v-model="todo.done" @click="todo.done = !todo.done" direction="vertical" density="compact"></v-checkbox>
              </div>

              <v-col class="text-center">
                <p
                  class="text-h6"
                  :style="{
                    'text-decoration': todo.done ? 'line-through' : null,
                  }"
                >
                  {{ todo.title }}
                </p>
              </v-col>

              <v-btn icon="mdi-delete" flat @click="deleteTodo(todo.id)"></v-btn>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Add a new to-do"
                  v-model="newTodo"
                  append-inner-icon="mdi-calendar"
                  @click:append-inner="() => datepicker.openMenu()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <VueDatePicker ref="datepicker" v-model="dueDate" class="my-2"></VueDatePicker>
              </v-col>
              <v-col cols="12" sm="1" class="my-2 text-center">
                <v-btn color="primary" @click="addTodo">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const datepicker = ref(null);
const dueDate = ref(null);
const currentTodoListId = ref(1);
const newTodo = ref("");
const todoListDrawer = ref(false);
const generalTodos = ref([]);
const todoLists = ref([{ id: 1, title: "General", todos: generalTodos.value }]);
const user = ref(null);

onMounted(async () => {
  user.value = getAuth().currentUser;
  getTodoLists();
  getAllTodos();
});

// gets all the todos for all the lists for the current user
async function getAllTodos() {
  let data = await fetch(`/api/todos/getAllTodos/${user.value.uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await data.json());
}

// gets all the lists for the current user
async function getTodoLists() {
  let data = await fetch(`/api/todos/getTodoLists/${user.value.uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await data.json());
}

async function addTodo() {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  todos.push({
    id: todos.length + 1,
    title: newTodo.value,
    done: false,
  });

  newTodo.value = "";
}

async function deleteTodo(id) {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );
}

async function clearAll() {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  todos.splice(0, todos.length);
}
</script>
