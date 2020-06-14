<template>
  <div id="app">


    <el-container>
      <el-header v-if="showHeader==1">

        <el-row>
          <el-col :span="6">
            <div class="logo">
              <a href="#/">
                <i class="el-icon-s-promotion"></i>
              </a>
            </div>
          </el-col>

          <el-col :span="18">

            <el-row>
              <el-col :span="2">
                <div class="header-menu">
                  <span class="menu-title" @click='go2Page("/")'>首页</span>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="header-menu">
                  <span class="menu-title" @click='go2Page("note-detail")'>设计</span>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="header-menu">
                  <span class="menu-title" @click="go2Page('note-write')">DIY</span>
                </div>
              </el-col>

              <el-col :span="4" :offset="1">
                <div class="header-menu">
                  <el-input
                    @keyup.enter.native="doQuery()"
                    placeholder="请输入搜索内容"
                    v-model="queryInput">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </el-col>

              <el-col :span="2">
                <el-dropdown>
                  <span class="el-dropdown-link">
                     消息<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>评论</el-dropdown-item>
                    <el-dropdown-item>点赞</el-dropdown-item>
                    <el-dropdown-item>关注</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>

              <el-col :span="2">
                <div class="header-menu">
                  <span class="menu-title">反馈</span>
                </div>
              </el-col>

              <el-col :span="2">


                <el-dropdown>
                  <span class="el-dropdown-link">
                    <div class="el-avatar">
                      <img src="http://pic.ruiwen.com/allimg/201607/35-160g41tq3s1.jpg"/>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>

              <el-col :span="6">
                <div class="header-menu">
                  <el-button type="primary" @click="go2Page('register')">注册</el-button>
                  <el-button type="success" @click="go2Page('login')">登录</el-button>
                </div>
              </el-col>


            </el-row>

          </el-col>

        </el-row>

      </el-header>
      <div class="header-holder"></div>

      <el-main>
        <router-view/>
      </el-main>

      <el-footer v-if="showFooter==1">
        <el-row>

          <el-col :span="4" :offset="6">
            <div class="qrcode">
              <img src="@/assets/qrcode-test.jpg"/>
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

      </el-footer>

    </el-container>

    <!--修改查询参数-->
    <!--<notelist ref="nodeListQuery" @childQueryParams="setQueryValue"></notelist>-->

  </div>
</template>

<script>
  import notelist from './components/note/note-list.vue';

  export default {
    name: 'App',
    components: {
      notelist
    },
    data() {
      return {
        activeIndex: '1',
        queryInput: '',
        showHeader:1,
        showFooter:1,
      }
    },
    mounted() {
      console.log("after")
      this.showHeader = localStorage.getItem('showHeader');
      this.showFooter = localStorage.getItem('showFooter');


      var query = localStorage.getItem('queryInput');
      localStorage.removeItem('queryInput');
      if(query == undefined || query == null){
        query = '';
      }
      this.setQueryValue(query);
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      doQuery() {
        // console.log(this.queryInput);
        if (this.queryInput == '') {
          console.log("no data input");
          return;
        }
        // params encoding
        var query = encodeURIComponent(this.queryInput);
        // localStorage.setItem('queryInput', this.queryInput);
        if (document.location.href.indexOf("note-list") != -1) {
          console.log("aready here");
          // console.log(window.location.hash);
          // console.log(window.location.href);
          var oldUri = window.location.hash;
          var newUri = '#/note-list/' + query;
          var oldUrl = window.location.href;
          var newUrl = oldUrl.replace(oldUri,newUri);
          // console.log(newUrl);
          //update url
          window.history.pushState({}, "", newUrl);

          //call child query
          notelist.methods.doQueryNoteList(query);
          //this.$refs.nodeListQuery.doQueryNoteList(query);
          return;
        }
        this.$router.push({
          path: "note-list/" + query
        });
      },
      setQueryValue(params){
        var query = decodeURIComponent(params);
        console.info("set params:" + query);
        this.queryInput = query;
      },
      go2Page(path) {
        // console.log(window.location.hash)
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
      setShowHeader(params){
        if(params == 0){
          localStorage.setItem('showHeader', 0);
        }else{
          localStorage.setItem('showHeader', 1);
        }
      }
    }
  }
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: #fafafa;
  }

  .el-header {
    background-color: #333;
    text-align: center;
    line-height: 68px;
    position: fixed;
    width: 100%;
    height: 68px !important;
    z-index: 999999;
  }

  .el-header .logo i {
    font-size: 2.6rem;
    color: #409EFF;
    padding-top: 0.7rem;
    cursor: pointer;
  }

  .el-header .header-menu {
    float: left;
    cursor: pointer;
  }

  .el-header .menu-title {
    color: white;
  }

  .el-header .el-dropdown-link {
    color: white;
    cursor: pointer;
    font-size: 16px;
  }

  .el-header .el-avatar {
    width: 3.6em;
    height: 3.6em;
    margin-top: 0.55em;
    border-radius: 50%;
    cursor: pointer;
  }

  .header-holder {
    height: 60px;
    width: 100%;
  }

  .el-main {
    min-height: 1024px;
    width: 100%;
  }

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
