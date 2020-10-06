import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import GuestLogin from "../views/GuestLogin.vue";
import StudentHome from "../views/StudentHome.vue";
import MarketingHome from "../views/MarketingHome.vue";
import CoordinatorHome from "../views/CoordinatorHome.vue";
import CreatePost from "../components/createPostForm.vue";
import EditPost from "../components/editpost.vue";
import ViewPost from "../components/viewPost.vue";
import ViewAllPost from "../components/ViewAllPost.vue";
import ViewFacultyPost from "../components/ViewFacultyPost";
import FacultyPost from "../components/FacultyPost.vue";
import AllPost from "../components/AllPost.vue";
import Post from "../components/Post.vue";
import Reports from "../components/reports.vue";
import ChooseFaculty from "../components/chooseFaculty.vue";
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
    props: true,
    children: [
      {
        path: "ChooseFaculty",
        name: "ChooseFaculty",
        component: ChooseFaculty,
        props: true,
      },
      {
        path: "Reports",
        name: "Reports",
        component: Reports,
        props: true,
      },
    ],
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
    props: true,
    children: [
      {
        path: "AllPost",
        name: "AllPost",
        component: AllPost,
        props: true,
      },
      {
        path: ":post_id",
        name: "ViewAllPost",
        component: ViewAllPost,
        props: true,
      },
    ],
  },
  {
    path: "/CoordinatorHome",
    name: "CoordinatorHome",
    component: CoordinatorHome,
    meta: { Auth: true },
    children: [
      {
        path: "FacultyPost",
        name: "FacultyPost",
        component: FacultyPost,
        props: true,
      },
      {
        path: ":post_id",
        name: "ViewFacultyPost",
        component: ViewFacultyPost,
        props: true,
      },
    ],
  },
  {
    path: "/StudentHome",
    name: "StudentHome",
    component: StudentHome,
    meta: { Auth: true },
    props: true,
    children: [
      {
        path: "CreatePost",
        name: "CreatePost",
        component: CreatePost,
        props: true,
      },
      {
        path: "Post",
        name: "Post",
        component: Post,
        props: true,
      },
      {
        path: "EditPost",
        name: "EditPost",
        component: EditPost,
        props: true,
      },
      {
        path: ":post_id",
        name: "ViewPost",
        component: ViewPost,
        props: true,
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
