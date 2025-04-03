<template>
  <div class="min-h-[calc(100vh-12rem)]">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 py-16 text-white relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight">
              数据分析，从这里开始
            </h1>
            <p class="text-lg text-blue-100 max-w-md">
              CoinAnalyzer提供专业的数字货币分析工具，帮助您做出明智的投资决策。
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink 
                to="/product" 
                class="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-6 py-3 rounded-lg font-medium shadow-lg"
              >
                开始使用
              </NuxtLink>
              <NuxtLink 
                to="/login" 
                class="border border-white text-white hover:bg-white hover:text-blue-600 transition-colors px-6 py-3 rounded-lg font-medium"
              >
                登录账号
              </NuxtLink>
            </div>
          </div>
          <div class="hidden md:block">
            <img 
              src="https://source.unsplash.com/featured/?chart,analytics" 
              alt="数据分析图表"
              class="rounded-lg shadow-2xl max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
      <!-- 背景装饰元素 -->
      <div class="absolute right-0 top-0 opacity-10">
        <svg width="500" height="500" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="white" stroke-width="2" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="white" stroke-width="2" fill="none" />
        </svg>
      </div>
    </section>

    <!-- 功能特点 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">强大的分析功能</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <span class="text-xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">实时市场数据</h3>
            <p class="text-gray-600">
              获取最新的市场数据和趋势，帮助您了解市场动态。
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <span class="text-xl">📈</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">技术分析工具</h3>
            <p class="text-gray-600">
              使用专业的技术分析工具，辅助您的投资决策。
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <span class="text-xl">📱</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">多端支持</h3>
            <p class="text-gray-600">
              在任何设备上随时随地访问您的分析数据和报告。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 注册引导 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">开始您的分析之旅</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          注册账号，立即体验CoinAnalyzer提供的全套专业分析工具和功能。
        </p>
        <NuxtLink 
          to="/register" 
          class="inline-block bg-blue-600 text-white hover:bg-blue-700 transition-colors px-8 py-4 rounded-lg font-medium text-lg shadow-lg"
        >
          免费注册
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// 直接跳转到home页面
onMounted(() => {
  // 使用 definePageMeta 定义路由元数据
  navigateTo('/home', { replace: true })
})
</script>
