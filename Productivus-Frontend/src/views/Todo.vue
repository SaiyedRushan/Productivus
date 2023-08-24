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
            <v-list-item
              v-for="item in todoLists"
              :key="item.title"
              :title="item.title"
              link
              @click="currentTodoListId = item.id"
              :class="{ 'highlighted-item': item.id === currentTodoListId }"
            >
            </v-list-item>
          </v-list>
          <v-footer>
            <v-btn @click="createNewListDialog = true" color="primary">
              <v-icon>mdi-plus</v-icon>
              <span class="mx-2">New List</span>
            </v-btn>
          </v-footer>
        </v-navigation-drawer>

        <v-dialog v-model="createNewListDialog" width="400px">
          <v-card class="pa-5">
            <v-text-field label="List Name" v-model="newListName"></v-text-field>
            <v-btn color="primary" @click="createNewList"> Create </v-btn>
          </v-card>
        </v-dialog>

        <v-main>
          <v-container class="pa-5" fluid>
            <v-row
              v-for="todo in todoLists.find((list) => list.id === currentTodoListId).todos"
              :id="todo.id"
              align-content="center"
              class="mx-5"
            >
              <div style="width: 40px">
                <v-checkbox v-model="todo.done" @click="markComplete(todo)" direction="vertical" density="compact"></v-checkbox>
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

              <v-col style="max-width: 300px">
                <!-- <v-label>Due Date</v-label> -->
                <VueDatePicker v-model="todo.dueDate"></VueDatePicker>
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
import makeHTTPRequest from "../utils/fetch.js";

const datepicker = ref(null);
const dueDate = ref(null);
const currentTodoListId = ref(-1);
const newTodo = ref("");
const todoListDrawer = ref(false);
const todoLists = ref([{ id: -1, title: "General", todos: [] }]);
const user = ref(null);
const allTodos = ref([]);
const createNewListDialog = ref(false);
const newListName = ref("");

onMounted(async () => {
  user.value = getAuth().currentUser;
  getTodoLists();
});

// gets all the todos for all the lists for the current user
async function getAllTodos() {
  let data = await makeHTTPRequest(`/api/todos/getAllTodos/${user.value.uid}`, "GET");

  allTodos.value = data.map((todo) => {
    return {
      id: todo.TodoId,
      title: todo.TodoText,
      done: todo.IsCompleted,
      dueDate: todo.DueDate,
      ListId: todo.ListId,
    };
  });
  console.log(allTodos.value);
}

// gets all the lists for the current user
async function getTodoLists() {
  await getAllTodos();
  let data = await makeHTTPRequest(`/api/todos/getTodoLists/${user.value.uid}`, "GET");

  if (data?.length > 0) {
    todoLists.value = data.map((list) => {
      return {
        id: list.ListId,
        title: list.ListName,
        todos: [],
      };
    });

    currentTodoListId.value = todoLists.value[0].id;

    // get the todos for each list
    todoLists.value.forEach((list) => {
      list.todos = allTodos.value.filter((todo) => todo.ListId == list.id);
    });

    console.log(todoLists.value);
  }
}

async function addTodo() {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  let data = false;

  // if this is the first todo ever added, insert this list in the backend
  if (currentTodoListId.value === -1) {
    let currentTodoListName = todoLists.value.find((list) => list.id === currentTodoListId.value).title;

    data = await makeHTTPRequest(`/api/todos/addTodoList/${user.value.uid}`, "POST", {
      listName: currentTodoListName,
    });
    console.log(data);
    currentTodoListId.value = data[0].ListId;

    // update the todolists.value
    // todoLists.value = [{id: data.ListId, title: data.ListName, todos: []}}]
  } else {
    data = true;
  }

  // if the list was added successfully or if it already existed
  if (data) {
    let addedTodo = await makeHTTPRequest(`/api/todos/addTodo/${user.value.uid}/${currentTodoListId.value}`, "POST", {
      todoText: newTodo.value,
      dueDate: dueDate.value,
    });

    console.log(addedTodo);

    // if the todo was added successfully
    if (addedTodo) {
      todos.push({
        id: addedTodo[0].TodoId,
        title: newTodo.value,
        done: false,
      });
      newTodo.value = "";
      dueDate.value = null;
    }
  }
}

async function deleteTodo(id) {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  let deletedTodo = await makeHTTPRequest(`/api/todos/deleteTodo/${id}`, "DELETE");
  if (deletedTodo) {
    todos.splice(
      todos.findIndex((todo) => todo.id === id),
      1
    );
  }
}

async function markComplete(todo) {
  todo.done = !todo.done;
  await makeHTTPRequest(`/api/todos/markComplete/${todo.id}`, "PUT", {
    isCompleted: todo.done,
  });
}

async function createNewList() {
  let data = await makeHTTPRequest(`/api/todos/addTodoList/${user.value.uid}`, "POST", {
    listName: newListName.value,
  });

  if (data) {
    todoLists.value.push({
      id: data[0].ListId,
      title: newListName.value,
      todos: [],
    });

    newListName.value = "";
    createNewListDialog.value = false;
    currentTodoListId.value = data[0].ListId;
  }
}

async function clearAll() {
  let todos = todoLists.value.find((list) => list.id === currentTodoListId.value).todos;

  todos.splice(0, todos.length);
}
</script>

<style>
.highlighted-item {
  background-color: #f0f0f0; /* Set the background color to highlight the selected item */
}
</style>
