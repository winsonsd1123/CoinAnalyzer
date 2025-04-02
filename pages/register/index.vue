<script setup>
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const auth = useAuth()

onMounted(() => {
  if (auth.isAuthenticated) {
    return navigateTo('/')
  }
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    auth.error = '两次输入的密码不一致'
    return
  }

  try {
    await auth.register({ 
      email: email.value,
      password: password.value
    })
    return navigateTo('/')
  } catch (error) {
    console.error('注册失败:', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="w-full max-w-sm mx-auto p-8 bg-white rounded-lg shadow-md">
      <div v-if="auth.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ auth.error }}
      </div>
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">
          用户注册
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">邮箱</label>
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
              autocomplete="new-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="密码"
            />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">确认密码</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="确认密码"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="auth.loading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
