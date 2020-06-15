<template>

  <el-container>
    <icu-header></icu-header>

    <el-main class="icu-container-design">
      <div class="header-holder"></div>

      <div class="icu-content">

        <el-row>
          <el-col :span="14" :offset="5">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in 2" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10" :offset="5">
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
            <div class="grid-content bg-purple" style="height: 163px;margin-bottom: 10px;">
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light" style="height: 354px;margin-bottom: 10px;"></div>
            <div class="grid-content bg-purple-light" style="height: 354px;margin-bottom: 10px;"></div>
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
    name:'index',
    components: {
      icuHeader,
      icuFooter
    },
    data() {
      return {}
    },

    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common.css";

  .icu-container-design .icu-content .el-col {
    background-color: white;
  }

  .icu-container-design .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .icu-container-design .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .icu-container-design .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .icu-container-design .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .icu-container-design .bg-purple {
    background: #d3dce6;
  }

  .icu-container-design .bg-purple-light {
    background: #e5e9f2;
  }

  .icu-container-design .grid-content {
    min-height: 36px;
  }

  .icu-container-design .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }



</style>
