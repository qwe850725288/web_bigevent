$(function () {
  // 点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 表单正则检查
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    username: function (value, item) {
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }
    },
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (value != pwd) {
        console.log(pwd, value);
        return "两次密码不一致！";
      }
    },
  });

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() };
    $.post("http://ajax.frontend.itheima.net/api/reguser", data, function (r) {
      if (r.status != 0) {
        return layer.msg(r.message);
      }
      layer.msg("注册成功,请登录");
      $("#link_login").click();
    });
  });

  // 监听登录表单的提交事件
  $("#form-login").on("submit", function (e) {
    e.preventDefault();
    $.post("http://ajax.frontend.itheima.net/api/login", $(this).serialize(), function (r) {
      if (r.status != 0) {
        return layer.msg(r.message);
      }
      console.log(r.token);
      localStorage.setItem("token", r.token);
      location.href = "/index.html";
    });
  });
});
