import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      try {
        const { user } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })
        
        this.user = user
        this.isAuthenticated = true
        
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
        const { user } = await $fetch('/api/auth/register', {
          method: 'POST',
          body: credentials
        })
        
        this.user = user
        this.isAuthenticated = true
        
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
    }
  }
})

export const useAuth = () => {
  return useAuthStore()
}
