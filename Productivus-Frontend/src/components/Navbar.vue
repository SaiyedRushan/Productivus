<template>
 <v-app-bar color="black" app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title> <router-link to="/" style="text-decoration: none; color:inherit">Productivus</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon="mdi-account">
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="item in navItems" :key="item.title" :title="item.title" :prepend-icon="item.icon" :to="item.to">     
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
const navItems = [
  { title: 'To-Do', icon: 'mdi-check', to:"/todo" },
  { title: 'Blogs', icon: 'mdi-newspaper-variant-multiple', to:"/blogs" },
  { title: 'Habit Tracker', icon: 'mdi-calendar-check', to:"/habittracker" },
  { title: 'Timer', icon: 'mdi-timer-outline', to:"/timers" },
  { title: 'Journal', icon: 'mdi-notebook-outline', to:"/journal" },
];

</script>
