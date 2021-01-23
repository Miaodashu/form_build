<template>
  <div>
    <el-upload
      ref="upload"
      :action="url"
      :data="qiniuToken"
      accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
    >
      <i slot="default" class="el-icon-plus"></i>
      <!-- <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div> -->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: 1 //1MB默认
    },
    limit: {
      default: 3 //最多上传三张
    }
  },
  data() {
    return {
      url: `https://up.qbox.me/`,
      dialogImageUrl: "",
      qiniuToken: {
        token: "",
        key: ""
      },
      domain: "",
      dialogVisible: false,
      disabled: false,
      uploadList: []
    };
  },
  mounted() {
    this.getToken();
  },
  methods: {
    getToken() {
      this.$http.get(`/base/qiniu/token`).then(res => {
        if (res.data.code === 0) {
          this.domain = res.data.data.domain;
          sessionStorage.setItem("domain", res.data.data.domain);
          this.qiniuToken.token = res.data.data.token;
        }
      });
    },
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      let size = this.size;
      const isLt2M = file.size / 1024 / 1024 < size;
      let randomNum = Math.floor(Math.random() * 1000); //随机数
      let name = Date.parse(new Date()) + randomNum;
      this.qiniuToken.key = name;
      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${size}MB!`);
      }
      if (this.uploadList.length > this.limit) {
        this.$message.error(`上传图片张数不能超过 ${this.limit}个!`);
        return false;
      }
      return isLt2M;
    },
    handleSuccess(res, file, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, file, fileList);
      file.url = this.domain + file.response.key;
      this.uploadList.push(file.url);
      this.$emit('uploadSuccess', this.uploadList)
    },
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fileList = this.uploadList.filter(el => el !== file.url);
      console.log(this.fileList);
      this.$emit('uploadSuccess', this.uploadList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
