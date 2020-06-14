<template>

  <div class="icu-content">

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

  import app from '../../App.vue';

  export default {
    data() {
      return {}
    },
    components: {
      app
    },
    mounted() {
      localStorage.setItem('showFooter', 0);
      app.methods.setShowHeader(0)

    },
    methods: {

    }
  }
</script>

<style lang="less">

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
