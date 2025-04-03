/**
 * 认证中间件 - 检查用户是否已登录
 * 如果用户未登录但尝试访问需要认证的页面，将被重定向到登录页面
 * 登录后将自动返回到之前尝试访问的页面
 */
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()
  
  // 在客户端检查认证状态
  if (process.client) {
    // 确保认证状态已检查
    auth.checkAuthState()
    
    // 如果用户未登录，重定向到登录页面
    if (!auth.isAuthenticated) {
      console.log('用户未认证，重定向到登录页面')
      // 将当前路由作为查询参数，以便登录后可以返回
      return navigateTo({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
