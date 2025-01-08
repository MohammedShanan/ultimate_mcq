import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import CreateView from "@/views/Quiz/CreateView.vue";
import ShowView from "@/views/Quiz/ShowView.vue";
import EditView from "@/views/Quiz/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
      meta: { auth: true },
    },
    {
      path: "/quizzes/:id",
      name: "show",
      component: ShowView,
    },
    {
      path: "/edit/quiz/:id",
      name: "edit",
      component: EditView,
      meta: { auth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authstore = useAuthStore();
  await authstore.getUser();
  try {
  } catch {}
  if (authstore.user && to.meta.guest) {
    return { name: "home" };
  }
  if (!authstore.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
