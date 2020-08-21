import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import PrivateHome from "../views/PrivateHome.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "PrivateHome",
    component: PrivateHome,
    meta: { Auth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const Auth = to.matched.some((record) => record.meta.Auth);
  const Authenticated = firebase.auth().currentUser;
  if (Auth && !Authenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
