export default {
  options(h, data) {
    const arr = [];
    data &&
      data.__slot__.options.forEach(element => {
        if (data.__config__.optionType === "default") {
          arr.push(
            <el-radio label={element.value} border={data.border}>
              {element.label}
            </el-radio>
          );
        } else {
          arr.push(
            <el-radio-button border={data.border} label={element.value}>
              {element.label}
            </el-radio-button>
          );
        }
      });
    return arr;
  }
};
