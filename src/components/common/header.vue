<template>

  <div>
    <el-header class="icu-header-style">

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
                <span class="menu-title" @click="go2Page('/note-write')">DIY</span>
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
              <el-dropdown @command="selectMessageCommand">
                  <span class="el-dropdown-link">
                     消息<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="icu-dropdown-item" command="0">
                    <img src="@/assets/image/comment.png">&nbsp;评论
                  </el-dropdown-item>
                  <el-dropdown-item class="icu-dropdown-item" command="1">
                    <img src="@/assets/image/admire.png">&nbsp;点赞
                  </el-dropdown-item>
                  <el-dropdown-item class="icu-dropdown-item" command="2">
                    <img src="@/assets/image/concert.png">&nbsp;关注
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>

            <el-col :span="2">
              <div class="header-menu">
                <span class="menu-title">反馈</span>
              </div>
            </el-col>

            <el-col :span="2">
              <el-dropdown @command="selectUserCommand">
                  <span class="el-dropdown-link">
                    <div class="el-avatar">
                      <img src="http://pic.ruiwen.com/allimg/201607/35-160g41tq3s1.jpg"/>
                    </div>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="icu-dropdown-item"  command="0">
                    <img src="@/assets/image/user.png">&nbsp;个人中心
                  </el-dropdown-item>
                  <el-dropdown-item class="icu-dropdown-item" command="1">
                    <img src="@/assets/image/logout.png">&nbsp;退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>

            <el-col :span="6">
              <div class="header-menu">
                <el-button type="primary" @click="go2Page('/register')">注册</el-button>
                <el-button type="success" @click="go2Page('/login')">登录</el-button>
              </div>
            </el-col>


          </el-row>

        </el-col>

      </el-row>

    </el-header>

  </div>


</template>


<script>
  export  default {
    name: 'icuHeader',
    components: {
    },
    data() {
      return {
        activeIndex: '1',
        queryInput: ''
      }
    },
    mounted(){

    },
    methods: {
      selectMessageCommand(cmd){
        if(cmd == '0'){

        }else if(cmd == '1'){

        }else if(cmd == '2'){

        }
      },
      selectUserCommand(cmd){
        if(cmd == '0'){
          this.go2Page('/user')
        }else if(cmd == '1'){

        }
      },
      setQueryValue(params){
        var query = decodeURIComponent(params);
        console.info("header set params:" + query);
        this.queryInput = query;
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

          //call father query
          this.$emit('queryNoteList',query);
          return;
        }
        this.$router.push({
          path: "note-list/" + query
        });
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
      }
    }
  }
</script>


<style lang="less">

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

  .icu-dropdown-item img{
    width:14px;
  }


</style>
