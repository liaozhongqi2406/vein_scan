<template>
  <div class="app-container">
    <h1>红外图像</h1>
    <el-row v-for="row in 3" :key="row">
      <el-col :span="5" v-for="(o,index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
        <el-card>
           <el-image 
            style="width: 100px; height: 100px"
            :src="url" 
            :preview-src-list="srcList">
          </el-image>
          <div>
            <span>患者: 张三丰</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">详细页面</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
         url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]

    }

  }
};
</script>

<style scoped></style>
