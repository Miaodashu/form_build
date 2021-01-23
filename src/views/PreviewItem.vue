<script>
import render from "@/components/generator/render.js";
// 通过组件的layout字段 来匹配返回的节点
const layouts = {
  // eslint-disable-next-line no-unused-vars
  colFormItem(h, currentItem, index, list) {
    let { activeItem } = this.$listeners;
    let config = currentItem.__config__;
    let labelWidth = config.labelWidth ? config.labelWidth + "px" : null;
    let children = renderChildren.apply(this, arguments);
    if (config.showLabel === false) labelWidth = "0";
    return (
      <el-col
        span={config.span}
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
            onCustomEmit={(event, index, customKey, obj, key) =>
              this.$set(currentItem[obj][key][index], customKey, event)
            }
          >
            {children}
          </render>
        </el-form-item>
      </el-col>
    );
  },
  // eslint-disable-next-line no-unused-vars
  raw(h, currentItem, index, list) {
    let { activeItem } = this.$listeners;
    const config = currentItem.__config__;
    const child = renderChildren.apply(this, arguments);
    return (
      <div
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
    render
  },
  props: ["currentItem", "drawingList", "formConf"],
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
