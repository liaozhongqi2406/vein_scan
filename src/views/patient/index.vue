<template>
  <div class="app-container">
            <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="姓名"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-row>
  <el-col :span="24">
      <div class="grid-content">
          <el-button type="primary" @click="upload">患者导入</el-button>
          <el-button type="primary" @click="createPatient">患者新增</el-button>
      </div>
    </el-col>
  </el-row>

    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="160" />

      <el-table-column prop="sex" label="性别" width="160" />

      <el-table-column prop="birthday" label="生日" width="160"/>

      <el-table-column prop="email" label="邮箱" width="240"/>

      <el-table-column prop="phone" label="电话" width="240"/>

      <el-table-column prop="createTime" label="添加时间" width="240"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
        total: 0, // 总记录数
        page: 1, // 页码
        limit: 10, // 每页记录数
        list: [
           {
             id : 1,
             name : '张三',
             sex : '女',
             birthday : '1998/09/01',
             email : 'zhangsan@163.com',
             phone : '18945671234',
             createTime : '2020/09/12'
           },
           {
             id : 2,
             name : '李四',
             sex : '男',
             birthday : '1998/09/01',
             email : 'lisi@163.com',
             phone : '18915671234',
              createTime : '2020/09/12'
            } ,
           {
              id : 3,
             name : '王五',
             sex : '男',
             birthday : '1998/09/01',
             email : 'wangwu@163.com',
             phone : '18915671234',
              createTime : '2020/09/12'
           }
        ],
        searchObj : {
            name: '',
            begin: '',
            end: ''
        }

    }
  },
  created() {
    

  },
  methods:{
     fetchData(page = 1){
            this.page = page;
          

        },
      createPatient() {
           this.$router.push({path:'/patient/save'})  
      },
      upload() {
          this.$router.push({path:'/patient/upload'})  
      }   

  }
};
</script>

<style scoped>
 .grid-content {
    border-radius: 4px;
    min-height: 64px;
  }
</style>
