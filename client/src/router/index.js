import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import BlogWriter from '../views/BlogWriter.vue'
import News from '../views/News.vue'
import ReportWriter from '../views/ReportWriter.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/write_blog',
    name: 'BlogWriter',
    component: BlogWriter
  },
  {
    path: '/edit_blog/:id',
    name: 'BlogEditor',
    props: true,
    component: BlogWriter
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/write_report',
    name: 'ReportWriter',
    component: ReportWriter
  },
  {
    path: '/edit_report/:id',
    name: 'ReportEditor',
    props: true,
    component: ReportWriter
  },
]

const router = new VueRouter({
  routes
})

export default router
