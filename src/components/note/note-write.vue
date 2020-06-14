<template>

  <el-container class="icu-article-container">
    <el-header>

      <el-row>

        <el-col :span="1" class="icu-broswer">
          <i class="el-icon-s-platform" title="预览" @click="go2Broswer()"></i>
        </el-col>

        <el-col :span="4" class="icu-editor-title">
          <span class="main-title">互联网面试题</span><span class="seperate">&nbsp;&nbsp;/&nbsp;&nbsp;</span><span
          class="sec-title">Redis核心知识点</span>
        </el-col>

        <el-col :span="10" class="icu-article-title">
          <el-input v-model="articleTitle" placeholder="请输入标题"></el-input>
        </el-col>

        <el-col :span="1" :offset="6" class="icu-article-save">
          <el-button>保存</el-button>
        </el-col>
        <el-col :span="1" class="icu-article-publish">
          <el-button type="primary">发布</el-button>
        </el-col>
        <el-col :span="1" class="icu-article-more">
          <el-dropdown @command="selectMore">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more-outline"></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">
                <i class="el-icon-top-left">&nbsp;&nbsp;放弃并返回</i>
              </el-dropdown-item>
              <el-dropdown-item command="1">
                <i class="el-icon-delete">&nbsp;&nbsp;删除</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>


      </el-row>

    </el-header>
    <div class="header-holder"></div>

    <el-main>

      <div class="icu-content">

        <el-row>
          <el-col :span="10" :offset="5">
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light" style="height: 354px;margin-bottom: 10px;"></div>
          </el-col>
        </el-row>

      </div>

    </el-main>

  </el-container>

</template>

<script>

  export default {
    data() {
      return {
        articleTitle: ""
      }
    },
    components: {
      app
    },
    mounted() {

    },
    methods: {
      go2Broswer() {
        console.log("预览")
      },
      go2Page(path) {
        if (path == '/') {
          if (window.location.hash == '#/') {
            console.log("aready here");
            return;
          }
          this.$router.push({
            path:path
          });
          return;
        }
        if (document.location.href.indexOf(path) != -1) {
          console.log("aready here");
          return;
        }
        this.$router.push({
          path:path
        });
      },
      selectMore(cmd){
        switch (cmd){
          case '0':{
            this.go2Page('/');
          }break;
          case '1':{

          }break;
          default:break;
        }
      }

    }
  }
</script>

<style lang="less">

  @import "../../assets/css/common.css";

  .icu-article-container .el-header {
    background-color: #fff;
    text-align: center;
    line-height: 68px;
    position: fixed;
    width: 100%;
    height: 68px !important;
    z-index: 999999;
    box-shadow: #e4e3e3 1px 1px 1em 1px;
  }

  .icu-content .el-col {
    background-color: white;
  }

  .icu-broswer i {
    font-size: 2.4em;
    color: #409EFF;
    cursor: pointer;
    padding: 0.4em 1em 0 0;
  }

  .icu-editor-title {
    font-size: 14px;
    text-align: left;
  }

  .icu-editor-title .main-title {
    cursor: pointer;
  }

  .icu-editor-title .seperate {

  }

  .icu-editor-title .sec-title {
    cursor: pointer;
    font-weight: 700;
  }

  .icu-article-container .icu-article-more {
    font-size: 18px;
    color: darkgray;
    cursor: pointer;
  }


  .icu-article-container .icu-article-title .el-input{
    height: 50px;
    font-size: 32px;
    border: none;
  }
  .icu-article-container .icu-article-title .el-input .el-input__inner{
    border: none;
    font-weight: 700;
  }



  .icu-article-container .icu-article-more .el-dropdown-link {
    color: darkgray;
  }

  /* WebKit browsers  */
  .icu-article-container input::-webkit-input-placeholder {
    color: darkgray;
    /* 字体大小直接写样式即可 */
    font-size: 32px;
  }
  /*  Mozilla Firefox 4-18使用伪类 */
  .icu-article-container input:-moz-placeholder {
    color: darkgray;
  }
  /* Mozilla Firefox 19+ 使用伪元素  */
  .icu-article-container input::-moz-placeholder {
    color: darkgray;
  }
  /* IE10使用伪类 */
  .icu-article-container input:-ms-input-placeholder {
    color: darkgray;
  }



</style>
