<template>
  <div class="text-center pa-10">
    <p class="text-h1">{{ greetingMessage }}</p>
    <p class="text-h5">{{ subtitle }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const greetingMessage = ref("Welcome Champ");
const subtitle = ref("You have made a wise choice");
</script>
