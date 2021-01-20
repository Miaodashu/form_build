<template>
  <div>
    <el-radio-group v-model="radioValue" @change="handleChange">
      <el-radio v-for="item in options" :key="item.value" :label="item.value">{{
        item.label
      }}</el-radio>
    </el-radio-group>
    <template v-for="(item, index) in options">
      <el-form-item
        label=" "
        label-width="12px"
        v-if="item.remark && item.value === radioValue"
        :required="item.required"
        :key="item.value"
      >
        <el-input
          :maxlength="100"
          v-model="item.content"
          @input="event => handleInput(event, index)"
        ></el-input>
      </el-form-item>
    </template>
  </div>
</template>

<script>
export default {
  props: ["options", "defaultValue"],
  data() {
    return {
      radioValue: this.defaultValue
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e);
    },
    handleInput(event, index) {
      this.$emit("customEvent", event, index, "props", "options");
    }
  }
};
</script>

<style></style>
