<template>

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

</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    mounted() {
      localStorage.setItem('showHeader', 1);
      localStorage.setItem('showFooter', 1);
    }
  }
</script>

<style lang="less">

  .icu-content .el-col {
    background-color: white;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
