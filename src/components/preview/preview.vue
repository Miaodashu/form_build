<template>
  <div>
    "<div><el-form 
                    ref="elForm"
                    
                    labelPosition="right"
                    :rules="rules"
                    :model="formData"
                    label-width="100px">
                        <el-col :span="undefined"><titleCom :styleOptions="{"width":"100%","text-align":"center"}" content="我是标题" :level="2"></titleCom></el-col>
                        <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
                    </el-form></div>"
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>