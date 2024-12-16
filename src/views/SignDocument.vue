<template>
  <v-container id="main">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2>Upload document to sign</h2>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center" style="margin-top: 8px">
        <h3>
          Click below to upload your document or drag and drop it here. Accepted file formats: PDF,
          JPG, PNG, DOCX
        </h3>
      </v-col>
    </v-row>
  </v-container>

  <v-container id="main" class="fill-height d-flex justify-center align-center">
    <v-row class="d-flex justify-center align-center" style="width: 100%; height: 50vh">
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div
          ref="uploadArea"
          class="upload-area"
          @dragover.prevent
          @dragenter.prevent
          @drop.prevent="handleDrop"
        >
          <v-icon v-if="!file" class="upload-icon">mdi-cloud-upload</v-icon>
          <p v-if="!file" class="text-center">
            Drag & Drop <br />
            OR <br />
          </p>
          <p v-if="file">{{ file.name }} selected</p>

          <input type="file" ref="fileInput" style="display: none" @change="handleFileSelect" />

          <div class="button-container">
            <v-btn v-if="!file" @click="triggerFileInput" size="large">Select File</v-btn>
            <v-btn v-else @click="removeFileInput" size="large">Cancel</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <button v-if="!file" class="custom-button">Sign document</button>
    <button v-else class="custom-button">
      Download
      <i
        class="mdi mdi-download"
        :style="{ fontSize: '30px', marginLeft: '3px', marginTop: '1px' }"
      ></i>
    </button>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const file = ref(null)

const fileInput = ref(null)

const uploadArea = ref(null)

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
  file.value = selectedFile
  if (file.value) {
    if (file.value.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const fileUrl = reader.result
        uploadArea.value.style.backgroundImage = `url(${fileUrl})`
        uploadArea.value.style.backgroundSize = 'cover'
        uploadArea.value.style.backgroundPosition = 'center'
      }
      reader.readAsDataURL(file.value)
    } else {
      uploadArea.value.style.backgroundImage = ''
    }
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const removeFileInput = () => {
  file.value = null
  uploadArea.value.style.backgroundImage = ''
}
</script>

<style scoped>
.upload-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  width: 100%;
  border: 2px dashed #8c8a8a;
  position: relative;
  background-color: #d4d0d0;
}

.button-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.upload-icon {
  font-size: 72px;
  position: absolute;
  top: 8px;
}

.upload-area p {
  font-size: 20px;
  font-weight: semi-bold;
  color: #141414;
  margin-top: 10px;
}
</style>
