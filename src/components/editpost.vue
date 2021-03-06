  <template>
  <section
    class="md:min-h-screen h-auto w-full py-24 flex align-middle bg-gray-100"
  >
    <div class="container max-w-4xl w-full my-auto mx-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="bg-white shadow-md rounded px-8 pt-2 pb-8"
        >
          <h1 class="font-semibold text-2xl text-center pt-10">Update Post</h1>
          <p id="errorAuth" class="text-xs text-red-500 text-center pb-6"></p>
          <!--First input -->
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >Title</label
              >
            </div>

            <ValidationProvider
              name="Title"
              rules="required"
              v-slot="{ errors }"
              class="md:w-full md:pr-32"
            >
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="title"
                v-model="formData.title"
                type="text"
              />
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!--Second input -->
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >Description</label
              >
            </div>

            <ValidationProvider
              name="Description"
              rules="required"
              v-slot="{ errors }"
              class="md:w-full md:pr-32"
            >
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="description"
                v-model="formData.description"
                type="text"
              />
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!--Third input -->
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >Image</label
              >
            </div>
            <div class="md:w-full md:pr-32">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="image"
                type="file"
                ref="image"
                accept="image/*"
                @change="imageData"
              />
              <span v-if="noImage" class="text-red-500 text-xs"
                >Please select an image</span
              >
            </div>
          </div>

          <!--Fourth input -->
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >Word File</label
              >
            </div>
            <div class="md:w-full md:pr-32">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="file"
                type="file"
                ref="doc"
                accept=".doc, .docx"
                @change="fileData"
              />
              <span v-if="noFile" class="text-red-500 text-xs"
                >Please select a doc file</span
              >
            </div>
          </div>
          <div class="flex">
            <div class="my-auto mx-auto w-1/3">
              <button
                class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
          <div class="flex">
            <div class="my-auto mx-auto w-1/3 mt-6">
              <router-link
                :to="{ name: 'Post' }"
                class="mr-5 hover:text-gray-900 cursor-pointer"
              >
                <button
                  class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="button"
                >
                  Cancel
                </button>
              </router-link>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { db } from "../main";
export default {
  name: "editPost",
  props: ["post_id"],
  created() {
    db.collection("post")
      .doc(this.post_id)
      .get()
      .then((doc) => {
        this.formData.title = doc.data().title;
        this.formData.description = doc.data().description;
        this.formData.fileURL = doc.data().fileURL;
        this.formData.imageURL = doc.data().imageURL;
        this.formData.imagePath = doc.data().imagePath;
        this.formData.filePath = doc.data().filePath;
        this.formData.id = this.post_id;
      });
  },
  data: () => ({
    noImage: false,
    noFile: false,
    formData: {
      id: "",
      title: "",
      description: "",
      image: null,
      file: null,
      imageURL: "",
      fileURL: "",
      filePath: "",
      imagePath: "",
    },
  }),
  methods: {
    fileData(e) {
      let file = e.target.files[0];
      this.formData.file = file;
      this.noFile = false;
    },
    imageData(e) {
      let image = e.target.files[0];
      this.formData.image = image;
      this.noImage = false;
    },
    async onSubmit() {
      if (this.formData.image != null) {
        if (this.formData.file != null) {
          await firebase
            .storage()
            .ref("files/" + `${this.formData.filePath}`)
            .delete()
            .then(() => {
              firebase.storage().ref;
              this.formData.imagePath = Date.now() + this.formData.image.name;
              this.formData.filePath = Date.now() + this.formData.file.name;

              firebase
                .storage()
                .ref("images/" + `${this.formData.imagePath}`)
                .put(this.formData.image)
                .then((snapshot) => {
                  snapshot.ref.getDownloadURL().then((imageURL) => {
                    this.formData.imageURL = imageURL;
                    firebase
                      .storage()
                      .ref("files/" + `${this.formData.filePath}`)
                      .put(this.formData.file)
                      .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((fileURL) => {
                          this.formData.fileURL = fileURL;
                        });
                      })
                      .catch(function (e) {
                        const error = document.getElementById("errorDB");
                        const errorMessage = document.createTextNode(e.message);
                        error.appendChild(errorMessage);
                      })
                      .then(() => {
                        db.collection("post")
                          .doc(this.formData.id)
                          .update({
                            title: this.formData.title,
                            description: this.formData.description,
                            fileURL: this.formData.fileURL,
                            imageURL: this.formData.imageURL,
                            filePath: this.formData.filePath,
                            imagePath: this.formData.imagePath,
                          })
                          .catch(function (e) {
                            const error = document.getElementById("errorDB");
                            const errorMessage = document.createTextNode(
                              e.message
                            );
                            error.appendChild(errorMessage);
                          })
                          .then(() => {
                            window.location.reload();
                            alert("You've successfully updated your post");
                          });
                      });
                  });
                });
            });
        } else {
          this.noFile = true;
        }
      } else {
        this.noImage = true;
      }
    },
  },
};
</script>
