export default {
  options(h, data) {
    const arr = [];
    data &&
      data.__slot__.options.forEach(element => {
        if (data.__config__.optionType === "default") {
          arr.push(
            <el-checkbox label={element.value} border={data.border}>
              {element.label}
            </el-checkbox>
          );
        } else {
          arr.push(
            <el-checkbox-button border={data.border} label={element.value}>
              {element.label}
            </el-checkbox-button>
          );
        }
      });
    return arr;
  }
};
