import Vue from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import router from "./router";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import { firestorePlugin } from "vuefire";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(firestorePlugin);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC3FXMFpdWR62Ggvq4HlDZjLi8yF83KhYE",
  authDomain: "ewad-7d098.firebaseapp.com",
  databaseURL: "https://ewad-7d098.firebaseio.com",
  projectId: "ewad-7d098",
  storageBucket: "ewad-7d098.appspot.com",
  messagingSenderId: "4090332240",
  appId: "1:4090332240:web:f580d5bcec9c8fcae07d55",
});
// Initialize Firebase
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

const db = firebaseApp.firestore();
export { db };
