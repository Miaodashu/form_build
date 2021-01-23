/* eslint-disable no-unused-vars */
import http from "../axios";
export const filterObj = obj => {
  if (!(typeof obj == "object")) return;
  for (var key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] == null || obj[key] === undefined || obj[key] === "")
    )
      delete obj[key];
  }
  return obj;
};
const regexp = (pattern, msg, type, trigger) => {
  return { type: type || "string", pattern: pattern, message: msg, trigger };
};
const required = (msg, type, trigger) => {
  return {
    type: type || "string",
    required: true,
    message: msg || "该项为必填项",
    trigger
  };
};
const requiredNoType = (msg, trigger) => {
  return {
    required: true,
    message: msg || "该项为必填项",
    trigger: trigger || "blur"
  };
};
const remote = (url, val, params) => {
  return {
    validator: (rule, value, callback) => {
      let parameter = {};
      parameter[val] = value;
      if (params) {
        let paramsKey = Object.keys(params);
        if (paramsKey.length > 0) {
          paramsKey.forEach(v => {
            parameter[v] = params[v];
          });
        }
      }
      http({
        url: url,
        method: "post",
        data: filterObj(parameter)
      }).then(res => {
        let resData = res.data;
        if (resData.code == "0") callback();
        else callback(resData.msg);
      });
    }
  };
};
export const dataCheck = {
  /*email*/
  email: (type, message = "请输入正确的邮件格式", trigger = "blur") => {
    return { type: type || "email", message, trigger };
  },
  /*数字*/
  number: (type, message = "请输入数字", trigger = "blur") => {
    return { type: type || "number", message, trigger };
  },
  /*整数*/
  integer: (type, message = "请输入整数", trigger = "blur") => {
    return { type: type || "integer", message, trigger };
  },
  /*浮点数*/
  float: (type, message, trigger) => {
    return {
      type: type || "float",
      message: message || "请输入格式为1.00的数字",
      trigger: trigger || "blur"
    };
  },
  /*时间*/
  time: (type, message, trigger) => {
    return {
      type: type || "string",
      message: message || "请选择时间",
      trigger: trigger || "change"
    };
  },
  /*时间范围*/
  range: (type, message, trigger) => {
    return {
      type: type || "array",
      message: message || "请选择时间范围!",
      trigger: trigger || "change"
    };
  },
  /*手机*/
  mobile_phone: (type, message, trigger) => {
    return regexp(
      /^1[0-9]{10,10}$/,
      message || "请输入正确格式的手机号",
      type || "string",
      trigger || "blur"
    );
  },
  /*邮政编码*/
  zip_code: (type, message, trigger) => {
    return regexp(
      /^[0-9]{6}$/,
      message || "请输入正确的邮政编码",
      type || "string",
      trigger || "blur"
    );
  },
  /*密码*/
  password: (type, message, trigger) => {
    return regexp(
      /^(?=.*\d)(?=.*[a-zA-Z~!@#$%^&*()_+`\-={}:";'<>?,.\\/“”，。？！【】：·、；]).{6,16}$/,
      message || "密码必须为6-16位数字和字符或符号的组合",
      type || "string",
      trigger || "blur"
    );
  },
  /*身份证*/
  id_num: (type, message, trigger) => {
    return regexp(
      /^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/,
      message || "请输入有效的身份证号码",
      type || "string",
      trigger || "blur"
    );
  },
  /*正则*/
  regexp: (type, message, trigger, pattern) => {
    return regexp(pattern, message, type, trigger);
  },
  /*必填*/
  required: (type, msg, trigger) => {
    return required(msg, type, trigger);
  }
  /*远程验证*/
  // remote: remote
};
