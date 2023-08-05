// Composables
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/signin",
    component: () => import("@/views/LoginRegister.vue"),
  },

  {
    path: "/todo",
    component: () => import("@/views/Todo.vue"),
  },
];

async function authenticated() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== "/signin" && !(await authenticated())) {
    console.log("not authenticated");
    next("/signin");
  } else {
    next();
  }
});

export default router;
