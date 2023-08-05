<template>
  <div class="text-center pa-5">
    <p class="text-h4 my-5" v-if="!isSignedIn">
      Welcome, Login and Register here
    </p>
    <p class="text-h4 my-5" v-else>Welcome, {{ user }}</p>
    <br />
    <div v-if="!isSignedIn" id="firebaseui-auth-container"></div>
    <br />
    <div v-if="isSignedIn">
      <v-btn @click="handleSignOut" color="primary">Sign Out</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { getAuth, signOut } from "firebase/auth";

const user = ref(null);
const isSignedIn = ref(false);
const ui = ref(null);

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      console.log(authResult);
      user.value = authResult.user.displayName;
      isSignedIn.value = true;
      return true;
    },
    signInFailure: function (error) {
      console.log(error);
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "http://localhost:3000/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

onMounted(() => {
  var ui = firebaseui.auth.AuthUI.getInstance();
  if (!ui) ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);

  getAuth().onAuthStateChanged((authUser) => {
    if (authUser) {
      isSignedIn.value = true;
      user.value = getAuth().currentUser.displayName;
    } else {
      isSignedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(getAuth())
    .then(() => {
      user.value = null;
      isSignedIn.value = false;
      var ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
