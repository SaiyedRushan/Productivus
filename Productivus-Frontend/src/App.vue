<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="justify-center">
      <div class="text-center">
        <p>Productivus &copy; 2023. Stay Hard</p> 
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
  import Navbar from './components/Navbar.vue'
</script>
