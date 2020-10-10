<template>
  <div class="app-container">
      <h1>个人信息</h1>
    <el-form label-width="120px">
      <el-form-item label="姓名">
       {{person.name}}
      </el-form-item>
      <el-form-item label="性别">
      {{person.gender}}
      </el-form-item>
      <el-form-item label="科室">
      {{person.department}}
      </el-form-item>
      <el-form-item label="职务">
      {{person.post}}
      </el-form-item>
      <el-form-item label="创建时间">
      {{person.createTime}}
      </el-form-item>
     <el-form-item label="头像">
      <img  :src="person.avatar">
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="saveOrUpdate">信息修改</el-button>
        <el-button  type="primary" @click="updatePasswd">密码修改</el-button>
      </el-form-item>
     </el-form>

     <el-dialog :visible.sync="dialogChapterFormVisible" title="修改密码">
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
   
  </div>
</template>
<script>
export default {
    data() {
            var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            person:{
                name: "张三丰",
                gender: "男",
                createTime:"2020/01/01",
                department: "心脑科",
                post: "主治医生",
                description :"主要是治疗心血管方面的疾病，有着长达10年的工作经验",
                avatar: "https://liao-edu.oss-cn-beijing.aliyuncs.com/person/1442297927029.jpg"

            },
            dialogChapterFormVisible: false,  //修改密码提示框，默认为false
            ruleForm: {
                pass: '',
                checkPass: ''
             },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ]
            }

        }
    },
    created() {

    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updatePasswd() {
          this.dialogChapterFormVisible = true
          this.ruleForm.pass = ''
         this.ruleForm.checkPass = ''
      }

    }

}
</script>

<style>

</style>