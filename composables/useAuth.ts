import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { onMounted, useNuxtApp } from '#imports'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  authToken: string | null
}

// 保存认证状态的 key
const AUTH_STORAGE_KEY = 'auth_state'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    // 尝试从本地存储恢复状态
    let savedState = null
    if (process.client) {
      try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY)
        if (saved) {
          savedState = JSON.parse(saved)
          console.log('从本地存储恢复认证状态:', savedState)
        }
      } catch (e) {
        console.error('读取本地存储认证状态失败:', e)
      }
    }

    // 使用保存的状态或默认值
    return savedState || {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      authToken: null
    }
  },
  actions: {
    // 保存状态到本地存储
    saveState() {
      if (process.client) {
        try {
          const stateToSave = {
            user: this.user,
            isAuthenticated: this.isAuthenticated,
            authToken: this.authToken
          }
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stateToSave))
          console.log('认证状态已保存到本地存储')
        } catch (e) {
          console.error('保存认证状态到本地存储失败:', e)
        }
      }
    },

    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      try {
        const { user, token } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })
        
        this.user = user
        this.authToken = token
        this.isAuthenticated = !!user
        
        // 保存到本地存储
        this.saveState()
        
        return user
      } catch (error: any) {
        this.error = error.data?.message || error.message || '登录失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: credentials
        })
        
        const user = response.user;
        // 注册接口返回的是session对象而不是token
        const token = response.session?.access_token || null;
        
        this.user = user
        this.authToken = token
        this.isAuthenticated = !!user
        
        // 保存到本地存储
        this.saveState()
        
        return user
      } catch (error: any) {
        this.error = error.data?.message || error.message || '注册失败'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.authToken = null
      
      // 从本地存储中移除
      if (process.client) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    },
    
    // 在应用启动时检查认证状态
    checkAuthState() {
      const nuxtApp = useNuxtApp()
      console.log('检查认证状态:', {
        user: this.user,
        isAuthenticated: this.isAuthenticated,
        hasAuthToken: !!this.authToken
      })
      
      // 如果有本地存储的状态但没有初始化过，尝试初始化
      if (!this.isAuthenticated && process.client) {
        try {
          const saved = localStorage.getItem(AUTH_STORAGE_KEY)
          if (saved) {
            const savedState = JSON.parse(saved)
            if (savedState.isAuthenticated && savedState.user) {
              this.user = savedState.user
              this.authToken = savedState.authToken
              this.isAuthenticated = true
              console.log('从本地存储恢复认证状态成功')
            }
          }
        } catch (e) {
          console.error('恢复认证状态失败:', e)
        }
      }
    }
  }
})

export const useAuth = () => {
  const store = useAuthStore()
  
  // 确保在客户端环境中初始化认证状态
  if (process.client) {
    // 使用 onMounted 确保在组件挂载后检查认证状态
    // 这样可以避免在 SSR 期间运行
    onMounted(() => {
      store.checkAuthState()
    })
  }
  
  return store
}
