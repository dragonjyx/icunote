<template>

  <el-container>
    <icu-header></icu-header>

    <el-main>
      <div class="icu-login-content">

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
                    <span class="login">登录</span>&nbsp;&nbsp; <span class="seperate">|</span> &nbsp;&nbsp;<span class="register" @click="go2Page('/register')">注册</span>
                  </el-col>

                  <el-col :span="20" :offset="2">
                    <el-input placeholder="请输入登录账号" v-model="account">
                      <i class="el-icon-user el-input__icon" slot="prefix"></i>
                    </el-input>
                  </el-col>

                  <el-col :span="20" :offset="2">
                    <el-input placeholder="请输入密码" show-password v-model="password">
                      <i class="el-icon-lock el-input__icon" slot="prefix"></i>
                    </el-input>
                  </el-col>

                  <el-col :span="20" :offset="2" class="login-btn-div">
                    <el-button type="primary" round>登&nbsp;&nbsp;&nbsp;录</el-button>
                  </el-col>
                </el-row>

              </div>
            </div>

            </el-col>

          </el-row>



      </el-col>

    </el-row>


  </div>
    </el-main>

    <el-footer>
      <icu-footer></icu-footer>
    </el-footer>
  </el-container>

</template>

<script>
  import icuHeader from '@/components/common/header';
  import icuFooter from '@/components/common/footer';

  export default {
    data() {
      return {
        account:'',
        password:''
      }
    },
    components: {
      icuHeader,
      icuFooter
    },
    mounted() {
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

  @import "../../assets/css/common.css";

  .icu-login-content .el-col {
    background-color: transparent;
  }

  .icu-login-content .icu-login-card-placeholder{
    margin-top: 40%;
  }

  .icu-login-content .icu-login-card {
    width: 400px;
    background-color: white;
  }

  .icu-login-content .icu-login-card .icu-login{
    height: 480px;
    border-radius: 0.3em;
    box-shadow: darkgrey 2px 6px 15px 5px ;
  }

  .icu-login-content .icu-login-card .icu-login .el-row-holder{
    height: 80px;
  }

  .icu-login-content .icu-login-card .icu-login .login{
    color: #409EFF;
  }
  .icu-login-content .icu-login-card .icu-login .seperate{
    color: #b0b2cf;
  }
  .icu-login-content .icu-login-card .icu-login .register{
    color: #b0b2cf;
    cursor: pointer;
  }
  .icu-login-content .icu-login-card .icu-login .register:hover{
    color: #67C23A;
  }

  .icu-login-content .icu-login-card .icu-login .login-btn-div{
    margin-top: 2.5em;
  }
  .icu-login-content .icu-login-card .icu-login .login-btn-div .el-button{
    width: 100%;
    font-size: 18px ;
  }

  .icu-login-content .icu-login-card .icu-login .icu-login-title{
    margin-bottom: 1em;
    font-size: 26px;
  }





</style>


