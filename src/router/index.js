import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import GuestLogin from "../views/GuestLogin.vue";
import StudentHome from "../views/StudentHome.vue";
import MarketingHome from "../views/MarketingHome.vue";
import CoordinatorHome from "../views/CoordinatorHome.vue";
import CreatePost from "../views/CreatePost.vue";
import EditPost from "../views/EditPost.vue";
import ViewPost from "../views/ViewPost.vue";
import Post from "../views/Post.vue";
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
    path: "/guest_login",
    name: "Guest Login",
    component: GuestLogin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/MarketingHome",
    name: "MarketingHome",
    component: MarketingHome,
    meta: { Auth: true },
  },
  {
    path: "/CoordinatorHome",
    name: "CoordinatorHome",
    component: CoordinatorHome,
    meta: { Auth: true },
  },
  {
    path: "/StudentHome",
    name: "StudentHome",
    component: StudentHome,
    meta: { Auth: true },
    children: [
      {
        path: "CreatePost",
        name: "CreatePost",
        component: CreatePost,
      },
      {
        path: "Post",
        name: "Post",
        component: Post,
      },
      {
        path: "EditPost",
        name: "EditPost",
        component: EditPost,
      },
      {
        path: ":post_id",
        name: "ViewPost",
        component: ViewPost,
      },
    ],
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
