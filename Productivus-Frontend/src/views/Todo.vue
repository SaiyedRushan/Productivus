<template>
  <v-container fluid>
    <v-sheet class="pa-5">
      <v-layout style="height: 1000px">
        <v-app-bar elevation="1">
          <v-app-bar-nav-icon
            @click.stop="todoListDrawer = !todoListDrawer"
            icon="mdi-menu-right-outline"
          ></v-app-bar-nav-icon>

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
            <v-list-item
              v-for="item in todoLists"
              :key="item.title"
              :title="item.title"
              link
              @click="currentTodoListId = item.id"
            >
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-sheet class="pa-5">
            <v-row
              v-for="todo in todoLists.find(
                (list) => list.id === currentTodoListId
              ).todos"
              :id="todo.id"
              align-content="center"
              class="mx-5"
            >
              <v-col>
                <div width="20px">
                  <v-checkbox
                    v-model="todo.done"
                    @click="todo.done = !todo.done"
                    direction="vertical"
                    density="compact"
                  ></v-checkbox>
                </div>
              </v-col>
              <v-col>
                <p
                  class="text-h6"
                  :style="{
                    'text-decoration': todo.done ? 'line-through' : null,
                  }"
                >
                  {{ todo.title }}
                </p>
              </v-col>
              <v-col>
                <v-btn
                  icon="mdi-delete"
                  flat
                  @click="deleteTodo(todo.id)"
                ></v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Add a new to-do"
                  v-model="newTodo"
                ></v-text-field>
              </v-col>
              <v-col cols="1" class="my-2">
                <v-btn color="primary" @click="addTodo">Add</v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-main>
      </v-layout>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const currentTodoListId = ref(1);
const newTodo = ref("");
const todoListDrawer = ref(false);
const todos = ref([
  { id: 1, title: "Learn Vue", done: true },
  { id: 2, title: "Learn React", done: false },
  { id: 3, title: "Learn Angular", done: false },
  { id: 4, title: "Learn Svelte", done: false },
  { id: 5, title: "Learn Flutter", done: false },
]);

const todoLists = ref([
  { id: 1, title: "General", todos: todos.value },
  { id: 2, title: "Groceries", todos: [] },
  { id: 3, title: "Clothes", todos: [] },
]);

async function addTodo() {
  let todos = todoLists.value.find(
    (list) => list.id === currentTodoListId.value
  ).todos;

  todos.push({
    id: todos.length + 1,
    title: newTodo.value,
    done: false,
  });

  newTodo.value = "";
}

async function deleteTodo(id) {
  let todos = todoLists.value.find(
    (list) => list.id === currentTodoListId.value
  ).todos;

  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );
}

async function clearAll() {
  let todos = todoLists.value.find(
    (list) => list.id === currentTodoListId.value
  ).todos;

  todos.splice(0, todos.length);
}
</script>
