<template>


  <el-container>
    <!--设置父子组建，方便调用-->
    <icu-header></icu-header>

    <el-main class="icu-container-user">
      <div class="header-holder"></div>

      <div class="icu-content">

        <el-row>

          <el-col :span="6":offset="2">
            <div class="grid-content bg-purple-light" style="height: 654px;margin-bottom: 10px;"></div>
          </el-col>

          <el-col :span="14">
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
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
    name: "noteList",
    data() {
      return {}
    },
    components: {
      icuHeader,
      icuFooter
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="less">

  @import "../../assets/css/common.css";

  .icu-content .el-col {
    background-color: white;
  }

  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
