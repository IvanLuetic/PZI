<template>
  <v-container id="main">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h1>Sign your documents easily and securely.</h1>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h3>
          Easily authenticate and protect your contracts and agreements with a secure, digital
          signature—no physical paperwork required.
        </h3>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col class="pa-0 py-4">
      <div class="image-container">
        <img
          src="@/assets/images/digitalsignature.jpg"
          alt="Digital Signature"
          class="full-width-image"
        />

        <div class="button-container">
          <router-link v-if="!user" to="/register" class="no-underline"
            ><button class="custom-button">
              Get started
              <i
                class="mdi mdi-arrow-right"
                :style="{ fontSize: '30px', marginLeft: '3px', marginTop: '1px' }"
              ></i>
            </button>
          </router-link>
        </div>
        <div class="button-container">
          <router-link v-if="user" to="/sign_document" class="no-underline"
            ><button class="custom-button">
              Get started
              <i
                class="mdi mdi-arrow-right"
                :style="{ fontSize: '30px', marginLeft: '3px', marginTop: '1px' }"
              ></i>
            </button>
          </router-link>
        </div>
      </div>
    </v-col>
  </v-row>

  <v-container id="about">
    <v-row>
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <h2>How it works</h2>
        <p class="custom-border">
          <b>1. Upload Your Document </b> <v-icon> mdi-file-document-arrow-right-outline</v-icon
          ><br />
          Drag and drop or select the file you want to sign from your device. We accept a variety of
          file types, including PDF, JPG, and DOCX. <br />
          <b>2. Authenticate and Sign</b> <v-icon>mdi-file-document-edit</v-icon><br />Once the
          document is uploaded, our app uses PGP encryption to add a unique digital signature. This
          cryptographic signature ensures that the document is valid and hasn't been altered. <br />
          <b>3. Download Your Signed Document</b> <v-icon>mdi-text-box-check</v-icon><br />After
          signing, download the document with your secure digital signature. It’s ready for sharing
          or official use.
        </p>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col cols="12" md="5">
        <div><img src="@/assets/images/key.png" class="key" /></div>
      </v-col>
      <v-col cols="12" md="7" class="d-flex flex-column justify-center align-center">
        <h2>
          <b>Why use our digital signature app?</b>
        </h2>
        <ul style="margin-bottom: 15%">
          <li>
            <b>Secure and legally binding</b>
            <p>
              Your signature is verified using PGP encryption, making sure that no one can alter
              your signed document. Only you have access to your unique private key.
            </p>
          </li>
          <li>
            <b>Fast and easy </b>
            <p>
              Say goodbye to printing and scanning. With just a few clicks, your document is
              digitally signed, saving you time and effort.
            </p>
          </li>
          <li>
            <b>Legally binding </b>
            <p>
              A digital signature created using PGP is recognized as legally binding in many
              jurisdictions, ensuring that your signed documents are valid for legal purposes.
            </p>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>

  <v-footer class="bg-grey-lighten-3 text-center d-flex justify-center">
    <div>
      <v-btn variant="text"> Terms of Service</v-btn>

      <v-btn variant="text"> Privacy Policy</v-btn>
      <v-btn variant="text"> Contact</v-btn>
      <div>{{ new Date().getFullYear() }} — University of Mostar</div>
    </div>
  </v-footer>
</template>

<script setup>
import { useUserStore } from '../stores/userStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
</script>

<style scoped>
.image-container {
  margin-top: 32px;

  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  object-fit: cover;
}

.full-width-image {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  filter: blur(6px);
  object-fit: cover;
}

.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-button i {
  margin-left: 10px;
}

.custom-button:hover {
  background-color: #326ee7;
  color: #e7e7e7;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.heading {
  margin-bottom: 5%;
  text-align: center;
  width: 100%;
}

.icon-responsive {
  font-size: 300px;
  margin-top: 16px;
  margin-right: 40px;
  transform: scaleX(1.1);
}
.custom-border {
  border: 1px solid black;
  padding: 20px;
}
.key {
  margin-top: 2%;
  padding: 0px;
  width: 30vw;
  height: 45vh;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
  border-radius: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  background-image: url('/footer/Bhutan.png');
}

.footer a {
  color: inherit;
  text-decoration: none;
  margin: 0 10px;
}

.footer a:hover {
  text-decoration: underline; /* Add hover effect for links */
}
@media (max-width: 600px) {
  .h1 {
    max-width: 50vw;
  }
  .icon-responsive {
    font-size: 100px;
    margin-top: -10%;
    margin-bottom: -10%;
    margin-right: 0px;
  }
  .image-container {
    height: 50vh;
  }
  .key {
    mask-image: none;
    border-radius: 0px;
    width: 100vw;
    height: 30vh;
  }
}
</style>
