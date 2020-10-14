<template>
  <div class="app-container">
   <el-form label-width="120px">
      <el-form-item label="用户" >
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item label="用户密码" >
        <el-input type="text" v-model="user.password"  />
      </el-form-item>
      <el-form-item label="确认密码" >
        <el-input type="password" v-model="user.checkPass" />
      </el-form-item>
       <el-form-item label="性别" >
          <el-radio v-model="user.sex" label="男">男</el-radio>
          <el-radio v-model="user.sex" label="女">女</el-radio>
      </el-form-item>
       <!-- <el-form-item label="用户生日" >
        <el-date-picker
          v-model="user.birthday"
          type="date"
          placeholder="选择日期">
      </el-date-picker>
      </el-form-item> -->
      
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from '@/api/system/userApi'
export default { 
    data(){
        return {
            user:{
                username: '',  
                password:'',
                sex:'',
                birthday:''   
            },
             saveBtnDisabled: false ,// 保存按钮是否禁用
        }
    },
     watch: {
        $route(to, from) {
        console.log('watch $route')
        this.init()
        }
    }
    ,
    created() {
        this.init()
    },
    methods:{
    

       init() {
            if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getInfo(id)
        }else {
            //没有iD值清空表单
            this.user = {}
        }
        },
        saveOrUpdate() {
          if(!this.user.userId){
              this.saveuser()
          }else {
             this.updateuser()
          }
        },

        saveuser() {
              userApi.saveUser(this.user)
                .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                     })
                     this.$router.push({path:'/system/user'})  
                })
        },
        updateuser() {
            userApi.updatauser(this.user)
                .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                     })
                     this.$router.push({path:'/edu/user/list'})  
                })
        },
        getInfo(id) {
            userApi.getuserInfo(id)
                .then(response => {
                    this.user = response.data.user
                })   
        }
    }
}
</script>