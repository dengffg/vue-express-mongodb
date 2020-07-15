import VueRouter from "vue-router";
import Login from './components/Login'
import Home from "./components/Home";
import CategoryList from "./components/CategoryList";
import CategoryCreate from "./components/CategoryCreate";

import TagList from "./components/TagList";
import TagCreate from "./components/TagCreate";

import ArticleList from "./components/ArticleList";
import ArticleCreate from "./components/ArticleCreate";

const routes = [
  { path: '/login', component: Login, meta: {isPublic: true} },
  {
    path: "/",
    component: Home,
    children: [
      { path: '', redirect: '/categories/list' },
      { path: "categories/create", component: CategoryCreate },
      { path: "categories/list", component: CategoryList },
      { path: "categories/:id", component: CategoryCreate, props: true },

      { path: "tags/create", component: TagCreate },
      { path: "tags/list", component: TagList },
      { path: "tags/:id", component: TagCreate, props: true },

      { path: "articles/create", component: ArticleCreate },
      { path: "articles/list", component: ArticleList },
      { path: "articles/:id", component: ArticleCreate, props: true },
    ],
  },
];

const router = new VueRouter({ routes })

// 判断是否登录
router.beforeEach((to, from, next) => {
  // 如果不是可以公开访问，且页面没有token则跳转登录页面
  if (!to.meta.isPublic && !localStorage.getItem('token')) {
    next('/login')
  }  else {
    next()
  }
})

export default router;