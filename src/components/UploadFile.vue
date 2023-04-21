<template>
  <div class="contain" @click="changeImage">
    <div class="image-input-wrapper img">
      <img
        class="el-upload-list__item-thumbnail avatar"
        v-if="imageUrl && check"
        :src="imageUrl"
      >
      <img
        class="el-upload-list__item-thumbnail avatar"
        v-else-if="image && check"
        :src="image"
      >
      <div v-else-if="image && !check">
        <i class="el-icon-document iconImg"></i>
        <p class="file-name">{{ fileName }}</p>
      </div>
      <div v-else-if="imageUrl && !check">
        <i class="el-icon-document iconImg"></i>
        <p class="file-name">{{ fileName }}</p>
      </div>
      <i class="el-icon-plus iconImg" v-else></i>
    </div>
    <div class="noImg">
      <input
        type="file"
        name="profile_avatar"
        class="input"
        id="uploadImg"
        hidden
        @change="onChangeAvatar"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  props: ['image', 'imageUrl', 'check', 'fileName'],
  data() {
    return {
      file: null,
      fileUrl: null,
      typeImages: [
        'jpg',
        'jpeg',
        'PNG',
        'png'
      ],
    }
  },
  methods: {
    changeImage() {
      document.getElementById('uploadImg').click()
    },
    onChangeAvatar(e) {
      if (e.target.files.length) {
        this.file = e.target.files[0];
        this.fileUrl = URL.createObjectURL(e.target.files[0]);
      }
      let data = {
        image: this.file,
        imageUrl: this.fileUrl,
        file: this.file.name,
        checked: this.checkTypeFile(this.file['type'])
      }
      this.$emit('onChangeAvatar', data);
    },
    checkTypeFile(path) {
      let isCheckType = false
      let index = path.lastIndexOf('/')
      let type = path.substring(index + 1)
      this.typeImages.forEach((item) => {
        if (item === type) {
          isCheckType = true
        }
      })
      return isCheckType
    },
  },
}
</script>

<style scoped lang="scss">
.contain {
  width: 150px;
  height: 150px;
  border: 1px solid #e0e3e9;
  border-radius: 2px;

  .iconImg {
    margin-top: 60px;
    margin-left: 60px;
    font-size: 30px;
    color: #e0e3e9;
  }

  .file-name {
    color: #968e8e;
    margin: 10px;
    font-size: 12px;
  }

  .input {
    width: 100%;
    height: 100%;
  }

  .iconDelete {

  }
}

.img {
  width: 100%;
  height: 100%;
}

.avatar {
  width: 100%;
  height: 100%;
}
</style>