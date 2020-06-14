<template>

  <div>
    <el-row>

      <el-col :span="4" :offset="6">
        <div class="qrcode">
          <img src="@/assets/image/qrcode-test.jpg"/>
        </div>
        <span class="qrcode-tip">某信扫一扫，一起探讨问题</span>

      </el-col>

      <el-col :span="9" class="beian">
        <div class="logo">
          <p>
            <i class="el-icon-s-promotion"></i>
            &nbsp;读书是一种信仰，分享是一份快乐
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            世事多因忙中错，好人半从苦中来
          </p>

          <p>亲爱的朋友们，感谢访问我的个人笔记，欢迎一起记录您精彩的人生</p>
          <p>Just do IT , I See You</p>
        </div>
        <p>QQ：674806334 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; E-mail：674806334@qq.com</p>
        <p>
          Copyright © 2014-2021 <a href="#">www.icunote.com.</a> All Rights Reserved ouyangxiaolong版权所有
        </p>
      </el-col>

    </el-row>
  </div>


</template>

<script>
  export default {
    name: 'icuFooter',
    data() {
      return {}
    }
  }
</script>

<style lang="less">

  .el-footer {
    background-color: #333;
    color: #b0b2cf;
    text-align: center;
    width: 100%;
    height: 19em !important;
    font-size: 13px;
    /*position:absolute;*/
    /*bottom:0;*/
  }

  .el-footer .qrcode {
    margin: 3.5em 0 0.5em 0;
  }

  .el-footer .qrcode img {
    width: 150px;
    height: 150px;
  }

  .el-footer .qrcode-tip {
  }

  .el-footer .logo {
    text-align: left;
    margin: 3em 0 0 0;
  }

  .el-footer .logo i {
    font-size: 2em;
    color: #409EFF;
  }

  .el-footer .beian p {
    text-align: left;
  }

  .el-footer .beian a {
    text-decoration-line: none;
    color: #409EFF;
    font-size: 14px;
  }

</style>
