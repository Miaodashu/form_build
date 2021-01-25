// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === "[object Date]") {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === "[object RegExp]") {
    const flags = [];
    if (obj.global) {
      flags.push("g");
    }
    if (obj.multiline) {
      flags.push("m");
    }
    if (obj.ignoreCase) {
      flags.push("i");
    }

    return new RegExp(obj.source, flags.join(""));
  }

  const result = Array.isArray(obj)
    ? []
    : obj.constructor
    ? new obj.constructor()
    : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}
/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
const callbacks = {};
export function loadScript(src, callback) {
  const existingScript = document.getElementById(src);
  const cb = callback || (() => {});
  if (!existingScript) {
    callbacks[src] = [];
    const $script = document.createElement("script");
    $script.src = src;
    $script.id = src;
    $script.async = 1;
    document.body.appendChild($script);
    const onEnd =
      "onload" in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script);
    onEnd($script);
  }

  callbacks[src].push(cb);

  function stdOnEnd(script) {
    script.onload = () => {
      this.onerror = this.onload = null;
      callbacks[src].forEach(item => {
        item(null, script);
      });
      delete callbacks[src];
    };
    script.onerror = () => {
      this.onerror = this.onload = null;
      cb(new Error(`Failed to load ${src}`), script);
    };
  }

  function ieOnEnd(script) {
    script.onreadystatechange = () => {
      if (this.readyState !== "complete" && this.readyState !== "loaded")
        return;
      this.onreadystatechange = null;
      callbacks[src].forEach(item => {
        item(null, script);
      });
      delete callbacks[src];
    };
  }
}

// 导出文件
/**
 * @author ZPP
 * @param {*} content 导出内容
 * @param {*} fileName 文件名称
 */
export function exportFile(content, fileName = "vueTemplate") {
  let eleLink = document.createElement("a");
  eleLink.download = `${fileName}.vue`;
  eleLink.style.display = "none";
  let blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
