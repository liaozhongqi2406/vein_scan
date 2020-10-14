<template>
  <div class="app-container">
       <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.username" placeholder="用户名"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.phoneNumber" placeholder="电话号码"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.beginTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.endTime"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
   <router-link :to="'/system/user/save'">
            <el-button type="primary" icon="el-icon-circle-plus">用户添加</el-button>
   </router-link> 
   <br/> <br/>
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

      <el-table-column prop="username" label="用户名" width="120" />

     <el-table-column prop="nickname" label="昵称" width="80" />

      <el-table-column prop="sex" label="性别" width="80"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="birthday" label="生日" width="160" />

      <el-table-column prop="email" label="邮箱" width="180" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/system/user/edit'+ scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.userId)">删除</el-button>
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
import userApi from '@/api/system/userApi'


export default {
    data() {
        return {
        listLoading: true, // 是否显示loading信息
        list: null, // 数据列表
         total: 0, // 总记录数
         page: 1, // 页码
        limit: 5, // 每页记录数
        searchObj: {
          username: '',
          phoneNumber: '',
          beginTime: '',
          endTime: ''
         }// 查询条件

        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData(page = 1){
            this.page = page;
             userApi.getPageList(this.page,this.limit,this.searchObj)
             .then(response => {
                 //console.log(response)
                 this.list = response.data.results
                 this.total = response.data.total
             })
             .catch(error => {
                 console.log(error)
             })

        },
        resetData() {
            this.searchObj = {}
            this.fetchData()
        },
        removeDataById(id) {
        
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
             }).then( () => userApi.deleteUserByID(id)
                    .then(response => {
                         this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })  

                        this.fetchData()

                    })
                

             )

        }

    }

}
</script>


<style scoped>
.myClassList .info {
    width: 450px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.myClassList .info .pic img {
    display: block;
    width: 100%;
}
.myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
}
.myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
}
.myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
}
</style>