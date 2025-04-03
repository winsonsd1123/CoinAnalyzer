/**
 * 全局中间件 - 存储用户访问的前一个页面
 * 当用户被重定向到登录/注册页面时，可以在登录后返回之前浏览的页面
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客户端执行
  if (process.client) {
    // 只有当导航到登录或注册页面时才存储上一个页面
    if (to.path.includes('/login') || to.path.includes('/register')) {
      // 不保存登录/注册页面作为前一个页面
      if (!from.path.includes('/login') && !from.path.includes('/register') && from.path !== '/') {
        localStorage.setItem('previousPage', from.fullPath)
        console.log('存储前一个页面:', from.fullPath)
      }
    }
  }
})
