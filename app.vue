<template>
  <div class="min-h-screen bg-white">
    <header class="bg-blue-600 text-white py-4 shadow-lg">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">欢迎来到 CoinAnalyzer</h1>
          <p class="mt-1 text-blue-100 text-sm">专业的数据分析平台</p>
        </div>
        <NuxtLink 
          v-if="!auth?.isAuthenticated"
          to="/login" 
          class="text-white hover:text-blue-200 transition-colors"
        >
          登录
        </NuxtLink>
        <button
          v-else
          @click="handleLogout"
          class="text-white hover:text-blue-200 transition-colors"
        >
          退出登录
        </button>
      </div>
    </header>

    <NuxtPage />

    <footer class="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 CoinAnalyzer - 所有权利保留</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const auth = useAuth()

const handleLogout = async () => {
  try {
    await auth.logout()
    navigateTo('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}
</script>