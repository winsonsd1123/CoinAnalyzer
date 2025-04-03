<template>
  <div class="min-h-screen bg-white">
    <header class="bg-blue-600 text-white py-3 shadow-lg">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">法律文书检索平台</h1>
          <p class="mt-1 text-blue-100 text-sm">专业的法律文书资源检索与分析</p>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/home" 
            class="text-white hover:text-blue-200 transition-colors"
          >
            首页
          </NuxtLink>
          <NuxtLink 
            to="/search" 
            class="text-white hover:text-blue-200 transition-colors"
          >
            检索
          </NuxtLink>
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
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <footer class="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 法律文书检索平台 - 所有权利保留</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()

// 在应用初始化时检查认证状态
onMounted(() => {
  console.log('App mounted, checking auth state')
  auth.checkAuthState()
})

const handleLogout = async () => {
  try {
    await auth.logout()
    navigateTo('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}
</script>

<style>
.page-container {
  max-width: 100%;
  overflow-x: auto;
  border-radius: 0.5rem;
  /* Limit height and add scrollbars if needed for vertical scrolling */
  max-height: 800px;
  overflow-y: auto;
  /* Add styles for visualizing the container */
  background-color: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Add padding for NuxtPage when used */
.nuxt-page-container {
  padding: 1rem;
}

/* For easier visual recognition in development */
.prototype-container {
  position: relative;
}

.prototype-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  z-index: 10;
}
</style>
