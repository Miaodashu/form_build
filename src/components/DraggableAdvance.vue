<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <draggable
          class="list-group"
          tag="ul"
          v-model="list1"
          v-bind="options1"
        >
          <li
            class="list-group-item"
            v-for="element in list1"
            :key="element.name + 5"
          >
            {{ element.name }}
          </li>
        </draggable>
      </el-col>
      <el-col :span="6">
        <draggable
          class="list-group"
          tag="ul"
          v-model="list2"
          @add="onAdd"
          v-bind="options2"
        >
          <li
            class="list-group-item"
            v-for="element in list2"
            :key="element.name + element.id"
          >
            {{ element.name }}
          </li>
        </draggable>
      </el-col>
      <el-col :span="6">
        <h3>List 1</h3>
        <pre style="text-align: start; background: #f3f3f3">{{
          JSON.stringify(list1, null, 2)
        }}</pre>
      </el-col>
      <el-col :span="6">
        <h3>List 2</h3>
        <pre style="text-align: start; background: #f3f3f3">{{
          JSON.stringify(list2, null, 2)
        }}</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      options1: {
          animation: 200,
          group: { name: 'people', pull: 'clone', put: false }, // 配置项
          disabled: false,
          ghostClass: 'ghost',
        },
      options2: {
        animation: 200,
        group: "people",
        disabled: false,
        ghostClass: "ghost",
      },
      list1: [
        { name: "Jesus", id: 1 },
        { name: "Paul", id: 2 },
        { name: "Peter", id: 3 },
      ],
      list2: [
        { name: "Luc", id: 5 },
        { name: "Thomas", id: 6 },
        { name: "John", id: 7 },
      ],
    };
  },
  methods:{
      onAdd(evt){
        //    alert(evt.to + '->' + evt.from);
        console.log(evt.item);
      }
  }
};
</script>
<style lang="less">
*{
    list-style: none;
    margin: 0;
    padding: 0;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  height: 200px;
  overflow: scroll;
  list-style: none;
  background: #c7c7c7;
}
.list-group-item {
  cursor: move;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(122, 122, 122);
}
</style>