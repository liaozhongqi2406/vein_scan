import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

   /*将来换成asyncRoutes数组*/
  ,
   {
    
    name: "patient",
    path: "/patient",
    component: Layout,
    redirect: "/patient/list",
    meta: {
      title: "患者管理",
      icon: "image"
    },
    children: [
      {
        name: "list",
        path: "list",
        component: () => import("@/views/patient/index"),
        meta: {
          title: "患者信息",
          icon: "i-inpatient"
        }
      },
      {
        name: "save",
        path: "save",
        component: () => import("@/views/patient/save"),
        meta: {
          title: "患者新增",
          icon: "i-inpatient",
          
        },
        hidden: true
      },
      {
        name: "upload",
        path: "upload",
        component: () => import("@/views/patient/upload"),
        meta: {
          title: "患者导入",
          icon: "i-inpatient",
          
        },
        hidden: true
      }
    ]
  },

  /*子路由>=2个时，父路由的hasSub不会起作用*/
  {
    name: "image",
    path: "/image",
    component: Layout,
    redirect: "/image/infrared",
    meta: {
      title: "图像管理",
      icon: "image"
    },
    children: [
      {
        name: "infrared",
        path: "infrared",
        component: () => import("@/views/image/infrared/index"),
        meta: {
          title: "红外图像",
          icon: "infrared"
        }
      },
      {
        name: "BUltrasound",
        path: "BUltrasound",
        component: () => import("@/views/image/BUltrasound/index"),
        meta: {
          title: "B超图像",
          icon: "ultrasound"
        }
      }
    ]
  },

  {
    name: "treatment",
    path: "/treatment",
    component: Layout,
    redirect: "/treatment/doctor",
    meta: {
      title: "治疗方案",
      icon: "treatmentProgram"
    },
    children: [
      {
        name: "doctor",
        path: "doctor",
        component: () => import("@/views/treatment/doctor/index"),
        meta: {
          title: "医生方案",
          icon: "doctor"
        }
      },
      {
        name: "KnowledgeGraph",
        path: "KnowledgeGraph",
        component: () => import("@/views/treatment/system/index"),
        meta: {
          title: "系统方案",
          icon: "KnowledgeGraph"
        }
      }
    ]
  },

  {
    name: "system",
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "系统管理",
      icon: "system"
    },
    children: [
      {
        name: "user",
        path: "user",
        component: () => import("@/views/system/user/index"),
        meta: {
          title: "用户管理",
          icon: "user"
        }
      },
      {
        name: "save",
        path: "user/save",
        component: () => import("@/views/system/user/save"),
        meta: {
          title: "用户添加",
          icon: "user"
        },
        hidden:true
      },
      {
        name: "edit",
        path: "user/edit",
        component: () => import("@/views/system/user/save"),
        meta: {
          title: "用户修改",
          icon: "user"
        },
        hidden:true
      }
      ,
      {
        name: "role",
        path: "role",
        component: () => import("@/views/system/role/index"),
        meta: {
          title: "角色管理",
          icon: "peoples"
        }
      },
      {
        name: "personal",
        path: "personal",
        component: () => import("@/views/system/personal/index"),
        meta: {
          title: "个人中心",
          icon: "peoples"
        } 
      }
    ]
  }


]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
