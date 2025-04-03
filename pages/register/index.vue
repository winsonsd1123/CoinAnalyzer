<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const captchaInput = ref('')
const captchaToken = ref('')
const captchaUrl = ref('')
const errorMessage = ref('')
const router = useRouter()
const auth = useAuth()
const route = useRoute()

// Store the previous URL if there's a 'redirect' query parameter,
// otherwise check if we can get a referrer from localStorage
const redirectPath = ref<string | null>(null)

onMounted(() => {
  if (auth.isAuthenticated) {
    return navigateTo('/')
  }
  
  // Check if redirect parameter is provided in URL
  if (route.query.redirect) {
    redirectPath.value = route.query.redirect as string
  } else {
    // Check if we have a stored previous URL in localStorage
    if (process.client) {
      const previousPage = localStorage.getItem('previousPage')
      // Only use the stored URL if it's not login or register page
      if (previousPage && !previousPage.includes('/login') && !previousPage.includes('/register')) {
        redirectPath.value = previousPage
      }
      // Clear the stored URL since we've now used it
      localStorage.removeItem('previousPage')
    }
  }
  
  refreshCaptcha()
})

const refreshCaptcha = async () => {
  try {
    const response = await fetch('/api/auth/captcha', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    
    if (response.ok) {
      captchaToken.value = response.headers.get('x-captcha-token') || ''
      captchaUrl.value = URL.createObjectURL(await response.blob())
    } else {
      console.error('获取验证码失败')
      errorMessage.value = '获取验证码失败，请刷新页面重试'
    }
  } catch (error) {
    console.error('获取验证码出错:', error)
    errorMessage.value = '网络错误，请稍后重试'
  }
}

const handleRegister = async () => {
  errorMessage.value = ''
  
  // 基本验证
  if (!email.value || !password.value || !confirmPassword.value || !captchaInput.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }
  
  // 密码强度检查
  if (password.value.length < 8) {
    errorMessage.value = '密码长度必须至少为8个字符'
    return
  }

  try {
    // 先验证验证码
    const captchaResponse = await $fetch<{valid: boolean}>('/api/auth/verify-captcha', {
      method: 'POST',
      body: {
        token: captchaToken.value,
        captcha: captchaInput.value
      }
    }).catch(error => {
      console.error('验证码验证请求失败:', error)
      throw new Error('验证码验证失败')
    })
    
    if (!captchaResponse.valid) {
      errorMessage.value = '验证码错误，请重新输入'
      refreshCaptcha()
      captchaInput.value = ''
      return
    }
    
    // 验证码正确，继续注册
    await auth.register({ 
      email: email.value,
      password: password.value
    })
    
    // 注册成功后，如果有重定向路径则跳转到该路径，否则跳转到首页
    return navigateTo(redirectPath.value || '/')
  } catch (error: any) {
    console.error('注册失败:', error)
    errorMessage.value = error.data?.message || error.message || '注册失败，请稍后重试'
    refreshCaptcha()
    captchaInput.value = ''
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <div v-if="errorMessage || auth.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ errorMessage || auth.error }}
      </div>
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">
          创建新账号
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleRegister">
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
            autocomplete="new-password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="请设置密码（至少8位）"
          />
          <p class="mt-1 text-xs text-gray-500">密码长度需至少8位，建议包含字母和数字</p>
        </div>
        
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="请再次输入密码"
          />
        </div>
        
        <div>
          <label for="captcha" class="block text-sm font-medium text-gray-700 mb-1">验证码</label>
          <div class="flex items-center gap-3">
            <input
              id="captcha"
              v-model="captchaInput"
              name="captcha"
              type="text"
              required
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="请输入验证码"
            />
            <div class="flex-shrink-0 h-[46px] w-[120px] border border-gray-200 rounded-md overflow-hidden bg-gray-50">
              <img 
                v-if="captchaUrl" 
                :src="captchaUrl" 
                alt="验证码" 
                class="h-full w-full object-cover"
                @click="refreshCaptcha"
              />
              <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
                加载中...
              </div>
            </div>
            <button 
              type="button"
              @click="refreshCaptcha"
              class="flex-shrink-0 text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
          <p class="mt-1 text-xs text-gray-500">点击图片或刷新按钮可更换验证码</p>
        </div>

        <div class="space-y-4 pt-2">
          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="auth.loading">注册中...</span>
            <span v-else>注册</span>
          </button>
          
          <div class="flex justify-center">
            <p class="text-gray-600">
              已有账号？
              <NuxtLink 
                to="/login"
                class="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                立即登录
              </NuxtLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
