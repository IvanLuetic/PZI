<template>
  <v-container id="main">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2>Upload document to sign</h2>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="position-relative">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center" style="margin-top: -2%">
        <h3>
          Click below to upload your document or drag and drop it here. Accepted file formats: PDF,
          JPG, PNG, DOCX
        </h3>
      </v-col>
    </v-row>
  </v-container>

  <v-container id="main" class="fill-height d-flex justify-center align-center position-relative">
    <v-row class="d-flex justify-center align-center" style="width: 100%; height: 50vh">
      <v-col cols="12" md="9" lg="6" class="d-flex justify-center align-center">
        <div
          ref="uploadArea"
          class="upload-area"
          @dragover.prevent
          @dragenter.prevent
          @drop.prevent="handleDrop"
          :class="{ uploading: isUploading }"
        >
          <v-row v-if="isSigning" class="justify-center">
            <v-col cols="12" class="d-flex justify-center" style="position: relative">
              <p style="position: absolute; z-index: 1"><b>Signing your document...</b></p>
              <v-progress-linear
                color="primary"
                height="15"
                class="my-6"
                striped
                indeterminate
                style="
                  position: absolute;
                  top: 32%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 14vw;
                "
              ></v-progress-linear>
            </v-col>
          </v-row>
          <v-icon v-if="!file" class="upload-icon">mdi-cloud-upload</v-icon>
          <p v-if="!file" class="text">
            Drag & Drop <br />
            OR <br />
          </p>
          <img
            v-if="image"
            :src="image"
            alt="Uploaded Document"
            :class="[isSigning ? 'background-image-signing' : 'background-image']"
          />
          <canvas v-if="file && !image" ref="pdfCanvas" style="width: 100%; height: auto"></canvas>

          <input type="file" ref="fileInput" style="display: none" @change="handleFileSelect" />
          <p style="position: absolute; z-index: 1" v-if="file">{{ file.name }} selected</p>

          <div class="button-container">
            <v-btn class="button-responsive" v-if="!file" @click="triggerFileInput" size="large"
              >Select File</v-btn
            >
            <v-btn class="button-responsive" v-else @click="removeFileInput" size="large"
              >Cancel</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>

    <button v-if="!isSigned" class="custom-button" @click="signDocument">Sign document</button>
    <button v-else class="custom-button">
      Download
      <i class="mdi mdi-download" :style="{ fontSize: '1.2em' }"></i>
    </button>
  </v-container>
</template>

<script setup>
import * as pdfjsLib from 'pdfjs-dist'
import { ref } from 'vue'
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.mjs'

const isUploading = ref(false)
const file = ref(null)
const isSigned = ref(false)
const isSigning = ref(false)

const image = ref(null)
const fileInput = ref(null)
const uploadArea = ref(null)
const pdfCanvas = ref(null)

const handleDrop = (event) => {
  const droppedFiles = event.dataTransfer.files
  handleFile(droppedFiles[0])
}

const handleFileSelect = (event) => {
  const selectedFile = event.target.files[0]

  if (selectedFile) {
    handleFile(selectedFile)
  }
}

const handleFile = (selectedFile) => {
  isUploading.value = true
  file.value = selectedFile
  if (file.value) {
    if (file.value.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const fileUrl = reader.result
        image.value = fileUrl

        pdfCanvas.value.style.display = 'none'
      }
      reader.readAsDataURL(file.value)
    } else if (file.value.type === 'application/pdf') {
      renderPDF(file.value)
      image.value = null
    } else {
      uploadArea.value.style.backgroundImage = ''
    }
    setTimeout(() => {
      isUploading.value = false
    }, 2000)
  }
}

const renderPDF = (pdfFile) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const arrayBuffer = e.target.result
    const loadingTask = pdfjsLib.getDocument(arrayBuffer)
    loadingTask.promise
      .then((pdf) => {
        pdf.getPage(1).then((page) => {
          const scale = 1.5
          const viewport = page.getViewport({ scale: scale })
          var outputScale = window.devicePixelRatio || 1

          const canvas = pdfCanvas.value
          const context = canvas.getContext('2d')

          canvas.width = Math.floor(viewport.width * 2 * outputScale)
          canvas.height = Math.floor(viewport.height * outputScale)

          page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
            console.log('PDF rendered as image')
          })
        })
      })
      .catch((error) => {
        console.error('Error loading PDF:', error)
      })
  }

  reader.readAsArrayBuffer(pdfFile)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const removeFileInput = () => {
  file.value = null
  image.value = null
  isSigned.value = false
  isSigning.value = false
  fileInput.value.value = null
}

const signDocument = async () => {
  if (file.value) {
    isSigning.value = true
    await new Promise((resolve) => {
      setTimeout(() => {
        isSigning.value = false
        if (file.value) {
          isSigned.value = true
        }
        resolve()
      }, 3000)
    })
  } else {
    alert('Please upload a document to sign')
  }
}
</script>

<style scoped>
.upload-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  width: 100%;

  border: 2px dashed #8c8a8a;
  position: relative;
  background-color: #d4d0d0;
}

.background-image {
  filter: blur(1px);

  width: 100%;
  border: 2px dashed #8c8a8a;
  position: absolute;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.background-image-signing {
  filter: blur(5px);
  min-height: 280px;
  width: 100%;
  border: 2px dashed #8c8a8a;
  position: absolute;
  height: 100%;
  background-size: cover;
  background-position: center;
}

canvas {
  min-height: 40vh;
  width: 100%;
  border: 2px dashed #8c8a8a;
  position: absolute;
  height: 100%;
}

.uploading {
  animation:
    backgroundChange 1s ease-in-out,
    scaleUp 0.5s ease-in-out;
}

.v-progress-linear {
  position: absolute;
  z-index: 1;
  width: 150%;
  height: 30vw;
  justify-content: center;

  border-radius: 8px;

  background-color: rgba(255, 255, 255, 0.6);
}

.button-container {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #393838;
}

.upload-icon {
  font-size: 450%;
  position: absolute;
  top: 6%;
}

.upload-area p {
  font-size: 20px;
  font-weight: semi-bold;
  color: #141414;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 600px) {
  .h2 {
    max-width: 1vw;
  }
  .upload-area {
    max-height: 10vh;
  }

  .upload-icon {
    font-size: 500%;
  }
  .button-container {
    bottom: 10%;
  }
  .button-responsive {
    font-size: 1em;
    padding: 10px 20px;
    font-weight: bold;
  }
}
@media (min-width: 767px) {
  .upload-area p {
    font-size: 3rem;
  }
  .upload-area p {
    font-size: 2rem;
  }
  .upload-icon {
    font-size: 400%;
  }

  .button-responsive {
    font-size: 0.8em;
    text-align: center;
    width: 30vw;
    height: 5vh;
  }
}
@media (min-width: 992px) {
  .upload-area p {
    font-size: 1.3rem;
  }
  .button-responsive {
    font-size: 1em;

    width: 10vw;
    height: 5vh;
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>
