<script setup>
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuth()

onMounted(() => {
  if (auth.isAuthenticated) {
    return navigateTo('/')
  }
})

const handleLogin = async () => {
  try {
      await auth.login({ 
        email: email.value, 
        password: password.value
      })
    return navigateTo('/')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <div v-if="auth.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ auth.error }}
        </div>
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            用户登录
          </h2>
        </div>
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="username" class="sr-only">用户名</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="邮箱"
              />
            </div>
            <div>
              <label for="password" class="sr-only">密码</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="密码"
              />
            </div>
          </div>
  
          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="auth.loading"
              class="w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="auth.loading">登录中...</span>
              <span v-else>登录</span>
            </button>
            <button
              type="button"
              @click="navigateTo('/register')"
              class="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
