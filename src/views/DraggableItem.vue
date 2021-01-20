<script>
import draggable from "vuedraggable";
import render from "@/components/generator/render.js";
// 一些其他组件  如删除按钮，复制按钮等
const components = {
  // eslint-disable-next-line no-unused-vars
  itemBtns(h, currentItem, index, list) {
    const { delItem, copyItem } = this.$listeners;
    return (
      <div class="btn-group">
        <div
          class="btn"
          title="复制"
          onClick={event => {
            event.stopPropagation();
            copyItem(currentItem, index);
          }}
        >
          <i class="el-icon-document-copy"></i>
        </div>
        <div
          class="btn"
          title="删除"
          onClick={event => {
            delItem(currentItem, index);
            event.stopPropagation();
          }}
        >
          <i class="el-icon-delete"></i>
        </div>
      </div>
    );
  }
};
// 通过组件的layout字段 来匹配返回的节点
const layouts = {
  // eslint-disable-next-line no-unused-vars
  colFormItem(h, currentItem, index, list) {
    let { activeItem } = this.$listeners;
    let config = currentItem.__config__;
    let labelWidth = config.labelWidth ? config.labelWidth + "px" : null;
    let children = renderChildren.apply(this, arguments);
    let className =
      this.activeId === config.formId
        ? "drawing-item active-item"
        : "drawing-item";
    if (config.showLabel === false) labelWidth = "0";
    return (
      <el-col
        span={config.span}
        class={className}
        nativeOnClick={event => {
          event.stopPropagation();
          activeItem(currentItem);
        }}
      >
        <el-form-item
          label-width={labelWidth}
          label={config.showLabel ? config.label : ""}
          required={config.required}
        >
          <render
            renderKey={config.renderKey}
            conf={currentItem}
            onInput={event => this.$set(config, "defaultValue", event)}
            onCustomEmit={(event, index, obj, key) =>
              this.$set(currentItem[obj][key][index], "content", event)
            }
          >
            {children}
          </render>
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    );
  },
  // eslint-disable-next-line no-unused-vars
  raw(h, currentItem, index, list) {
    let { activeItem } = this.$listeners;
    const config = currentItem.__config__;
    const child = renderChildren.apply(this, arguments);
    let className =
      this.activeId === config.formId
        ? "drawing-item hot active-item"
        : "drawing-item hot";
    return (
      <div
        class={className}
        onClick={event => {
          event.stopPropagation();
          activeItem(currentItem);
        }}
      >
        <render
          key={config.renderKey}
          conf={currentItem}
          onInput={event => {
            this.$set(config, "defaultValue", event);
          }}
        >
          {child}
        </render>
        {components.itemBtns.apply(this, arguments)}
      </div>
    );
  }
};
function renderChildren(h, currentItem) {
  let config = currentItem.__config__;
  if (!Array.isArray(config.children)) return null;
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout];
    if (layout) {
      return layout.call(this, h, el, i, config.children);
    } else {
      return h("div", "没有匹配的layout");
    }
  });
}

export default {
  name: "DraggableItem",
  components: {
    draggable,
    render
  },
  props: ["currentItem", "index", "drawingList", "activeId", "formConf"],
  render(h) {
    const layout = layouts[this.currentItem.__config__.layout];
    if (layout) {
      return layout.call(
        this,
        h,
        this.currentItem,
        this.index,
        this.drawingList
      );
    }
    return h("div", "没有匹配的layout");
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-rate {
  line-height: 47px;
}
</style>
