<template>
  <v-app-bar color="black" app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title> <router-link to="/" style="text-decoration: none; color: inherit">Productivus</router-link></v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu v-if="user">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <img v-if="user?.photoURL" :src="user?.photoURL" alt="" height="40" style="border-radius: 50%" />
          <v-icon v-else icon="mdi-account"></v-icon>
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-card-text>
          <p>Hello, {{ user.displayName }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary">Profile</v-btn>
          <v-btn @click="handleSignOut" color="red">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="item in navItems" :key="item.title" :title="item.title" :prepend-icon="item.icon" :to="item.to"> </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref(null);

getAuth().onAuthStateChanged((currentUser) => {
  if (currentUser) {
    user.value = currentUser;
  } else {
    user.value = null;
    console.log("No user");
  }
});

const handleSignOut = () => {
  signOut(getAuth())
    .then(() => {
      router.push("/signin");
    })
    .catch((error) => {
      console.log(error);
    });
};

const drawer = ref(false);
const navItems = [
  { title: "To-Do", icon: "mdi-check", to: "/todo" },
  { title: "Blogs", icon: "mdi-newspaper-variant-multiple", to: "/blogs" },
  { title: "Habit Tracker", icon: "mdi-calendar-check", to: "/habittracker" },
  { title: "Timer", icon: "mdi-timer-outline", to: "/timers" },
  { title: "Journal", icon: "mdi-notebook-outline", to: "/journal" },
];
</script>
