import request from '@/utils/request'

export default {
  //用户列表查询
  getPageList(page,size,data) {
      return request({
        url: `/system/user/list?pageNum=${page}&pageSize=${size}`,
        method: 'get',
        params:data
      })
    },
    //用户删除
    deleteUserByID(id) {
      return request({
        url: `/system/user/logicallyDeleteUserById?userId=${id}`,
        method: 'delete'
      })
    },
    //添加用户
    saveUser(user) {
      return request({
        url: `/system/user/add`,
        method: 'post',
        params:user
      })
    }
  }