<template>
<div class="file-upload">
    <input type="file" @change="onFileChange" />    <button @click="onUploadFile" class="upload-button"
    >Upload file</button>
</div>
</template>

<script>
export default {
data() {
    return {
      selectedFile: "",
    };
},
methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; 
      this.selectedFile = selectedFile;
      console.log(this.selectedFile)
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      // sending file to the backend
      this.$axios.$post("/upload", formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }
}
};
</script>

<style scoped>
    .file-upload {
      box-shadow: 2px 2px 9px 2px #ccc;
      border-radius: 1rem;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 1rem;
      width: 60%;
      margin: 0 auto;
    }
    
    input {
      font-size: 0.9rem;
    }
    
    input,
    div,
    button {
      margin-top: 2rem;
    }
    
    .upload-button {
      width: 7rem;
      padding: 0.5rem;
      background-color: #278be9;
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      border-radius: 1rem;
    }
    
    .upload-button:disabled {
      background-color: #b3bcc4;
      cursor: no-drop;
    }