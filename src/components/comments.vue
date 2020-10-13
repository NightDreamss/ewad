  <template>
  <section
    class="text-gray-700 body-font overflow-hidden p-6 bg-white rounded-lg"
  >
    <div class="container py-12 mx-auto">
      <div class="-my-8">
        <h1
          v-if="comments === undefined || comments.length == 0"
          class="text-center font-semibold text-2xl pt-4"
        >
          No Comments
        </h1>
        <div
          class="py-8 flex flex-wrap md:flex-no-wrap border-b-2 border-gray-200"
          v-for="comments in comments"
          v-bind:key="comments.id"
        >
          <div class="md:w-3/6 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span
              class="tracking-widest font-medium title-font text-gray-900"
              >{{ comments.email }}</span
            >
            <span class="mt-1 w-2/3 text-gray-500 text-sm">{{
              comments.date
            }}</span>
          </div>
          <div class="md:flex-grow">
            <p class="leading-relaxed">
              {{ comments.commentMade }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <section class="text-gray-700 body-font pb-12 relative">
      <div class="container px-5 mx-auto">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(onSubmit)"
            class="lg:w-1/2 md:w-2/3 mx-auto"
          >
            <div class="p-2 w-full">
              <ValidationProvider
                name="Comment"
                rules="required"
                v-slot="{ errors }"
                class="md:w-full md:pr-32"
              >
                <textarea
                  class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                  id="comment"
                  v-model="comment"
                  type="text"
                  placeholder="Comment"
                />
                <span class="text-red-500 text-xs">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="p-2 w-full">
              <button
                class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </section>
  </section>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { db } from "../main";
export default {
  props: ["postID"],
  name: "Comments",
  data: () => ({
    comment: "",
    comments: [],
  }),
  methods: {
    checkComments() {
      db.collection("comments")
        .where("post", "==", this.postID)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            db.collection("users")
              .doc(doc.data().id)
              .get()
              .then((userDoc) => {
                const data = {
                  id: doc.id,
                  commentMade: doc.data().comment,
                  userID: doc.data().id,
                  date: doc.data().date.toDate(),
                  email: userDoc.data().email,
                };
                this.comments.push(data);
              });
          });
        });
    },
    onSubmit() {
      const id = firebase.auth().currentUser.uid;
      db.collection("comments")
        .add({
          id: id,
          comment: this.comment,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          post: this.postID,
        })
        .then((this.comment = ""), this.checkComments());
    },
  },
  created() {
    this.checkComments();
  },
};
</script>
