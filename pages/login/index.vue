<script setup>
const email = ref('')
const password = ref('')
const captcha = ref('')
const captchaToken = ref('')
const router = useRouter()
const auth = useAuth()

const refreshCaptcha = async () => {
  const { data } = await useFetch('/api/auth/captcha', {
    onResponse({ response }) {
      captchaToken.value = response.headers.get('x-captcha-token')
    }
  })
}

onMounted(async () => {
  if (auth.isAuthenticated) {
    return navigateTo('/')
  }
  await refreshCaptcha()
})

const handleLogin = async () => {
  try {
      await auth.login({ 
        email: email.value, 
        password: password.value,
        captcha: captcha.value,
        captchaToken: captchaToken.value
      })
      await refreshCaptcha()
      return navigateTo('/')
  } catch (error) {
    console.error('登录失败:', error)
    await refreshCaptcha()
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
          <div class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="请输入密码"
              />
            </div>
            <div>
              <label for="captcha" class="block text-sm font-medium text-gray-700 mb-1">验证码</label>
              <div class="flex space-x-3 items-center">
                <input
                  id="captcha"
                  v-model="captcha"
                  name="captcha"
                  type="text"
                  required
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="验证码"
                />
                <div class="relative">
                  <img 
                    :src="`/api/auth/captcha?token=${captchaToken}`" 
                    @click="refreshCaptcha"
                    class="h-12 w-32 border border-gray-300 rounded-lg cursor-pointer hover:opacity-80 transition"
                    alt="验证码"
                  />
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="w-full h-full border-2 border-transparent hover:border-blue-200 rounded-lg transition-all duration-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="space-y-4">
            <button
              type="submit"
              :disabled="auth.loading"
              class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="auth.loading">登录中...</span>
              <span v-else>登录</span>
            </button>
            <button
              type="button"
              @click="navigateTo('/register')"
              class="w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              注册账号
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
