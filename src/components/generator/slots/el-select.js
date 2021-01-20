export default {
  options(h, data) {
    const arr = [];
    data &&
      data.__slot__.options.forEach(element => {
        arr.push(
          <el-option label={element.label} value={element.value}></el-option>
        );
      });
    return arr;
  }
};
