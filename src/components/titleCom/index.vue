<script>
export default {
  name: "titleCom",
  props: ["level", "styleOptions", "content"],
  data() {
    return {};
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return h(`h${this.level}`, { style: this.styleOptions }, this.content);
  },
  methods: {}
};
</script>

<style></style>
