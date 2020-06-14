<template>


  <div class="icu-register-content">


    <el-row>

      <el-col :span="7" :offset="9">


          <el-row>

            <div class="icu-login-card-placeholder"></div>

            <el-col :span="24">

            <div class="icu-login-card">
              <div class="icu-login">

                <el-row>
                  <el-col :span="24" class="el-row-holder"></el-col>

                  <el-col :span="24" class="icu-login-title">
                    <span class="login" @click="go2Page('login')">登录</span>&nbsp;&nbsp; <span class="seperate">|</span> &nbsp;&nbsp;<span class="register">注册</span>
                  </el-col>

                  <el-col :span="20" :offset="2" class="icu-account">
                    <el-input placeholder="请输入注册账号" v-model="account">
                      <i class="el-icon-user el-input__icon" slot="prefix"></i>
                    </el-input>
                  </el-col>

                  <el-col :span="20" :offset="2">
                    <el-input placeholder="请输入注册密码" show-password v-model="password">
                      <i class="el-icon-lock el-input__icon" slot="prefix"></i>
                    </el-input>
                  </el-col>

                  <el-col :span="20" :offset="2">
                    <el-input placeholder="请输入确定密码" show-password v-model="password">
                      <i class="el-icon-lock el-input__icon" slot="prefix"></i>
                    </el-input>
                  </el-col>

                  <el-col :span="20" :offset="2" class="login-btn-div">
                    <el-button type="success" round>注&nbsp;&nbsp;&nbsp;册</el-button>
                  </el-col>
                </el-row>

              </div>
            </div>

            </el-col>

          </el-row>



      </el-col>

    </el-row>


  </div>


</template>

<script>
  export default {
    data() {
      return {
        account:'',
        password:''
      }
    },
    mounted() {
      localStorage.setItem('showHeader', 1);
      localStorage.setItem('showFooter', 1);
    },
    methods: {
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

  .icu-register-content .el-col {
    background-color: transparent;
  }

  .icu-register-content .icu-login-card-placeholder{
    margin-top: 40%;
  }

  .icu-register-content .icu-login-card {
    width: 400px;
    background-color: white;
  }

  .icu-register-content .icu-login-card .icu-login{
    height: 480px;
    border-radius: 0.3em;
    box-shadow: darkgrey 2px 6px 15px 5px ;
  }

  .icu-register-content .icu-login-card .icu-login .el-row-holder{
    height: 80px;
  }

  .icu-register-content .icu-login-card .icu-login .register{
    color: #67C23A;
  }
  .icu-register-content .icu-login-card .icu-login .seperate{
    color: #b0b2cf;
  }
  .icu-register-content .icu-login-card .icu-login .login{
    color: #b0b2cf;
    cursor: pointer;
  }
  .icu-register-content .icu-login-card .icu-login .icu-account{
    margin-bottom: 1em;
  }
  .icu-register-content .icu-login-card .icu-login .login:hover{
    color: #409EFF;
  }

  .icu-register-content .icu-login-card .icu-login .login-btn-div{
    margin-top: 2.5em;
  }
  .icu-register-content .icu-login-card .icu-login .login-btn-div .el-button{
    width: 100%;
    font-size: 18px ;
  }

  .icu-register-content .icu-login-card .icu-login .icu-login-title{
    margin-bottom: 1em;
    font-size: 26px;
  }





</style>


