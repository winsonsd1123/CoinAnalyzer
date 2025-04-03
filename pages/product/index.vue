<script setup>
// 使用中间件保护此页面，仅允许已认证用户访问
definePageMeta({
  middleware: ['auth']
})

// 直接使用 auth store 实例而不是解构，确保访问最新的状态
const auth = useAuth()
const { $supabase } = useNuxtApp()
const router = useRouter()

// 搜索相关
const searchQuery = ref('')
const searchResults = ref([
  {
    id: 1,
    title: '关于张某与李某房屋买卖合同纠纷一审民事判决书',
    court: '北京市海淀区人民法院',
    date: '2024-03-15',
    caseNumber: '(2024)京0108民初1234号'
  },
  {
    id: 2,
    title: '王某诉刘某名誉权侵权案二审民事判决书',
    court: '上海市第一中级人民法院',
    date: '2024-02-28',
    caseNumber: '(2024)沪01民终5678号'
  },
  {
    id: 3,
    title: '赵某与某科技公司劳动合同纠纷仲裁裁决书',
    court: '广州市劳动人事争议仲裁委员会',
    date: '2024-01-10',
    caseNumber: '(2024)穗劳人仲字第789号'
  }
])

const handleSearch = () => {
  // 实际应用中这里会调用API进行搜索
  console.log('搜索关键词:', searchQuery.value)
  // 模拟搜索结果已更新
}

const loadMore = () => {
  // 实际应用中这里会加载更多结果
  console.log('加载更多结果')
  // 模拟添加更多结果
  searchResults.value.push({
    id: 4,
    title: '某公司破产清算案件裁定书',
    court: '深圳市中级人民法院',
    date: '2024-01-05',
    caseNumber: '(2024)粤03破产456号'
  })
}

</script>

<template>
  <div class="container mx-auto px-4 py-6">

    <!-- 导航栏 -->
    <div class="flex justify-between items-center mb-10">
      <div class="flex space-x-4">
        <NuxtLink to="/" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">首页</NuxtLink>
        <NuxtLink to="/price" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">价格</NuxtLink>
      </div>
      
      <div class="flex-grow flex justify-center mx-4">
        <div class="w-40 h-16 flex items-center justify-center border border-gray-300 rounded">
          <p class="text-lg font-semibold">Logo图像</p>
        </div>
      </div>
      
      <div class="flex space-x-4">
        <NuxtLink to="/contact" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">联系我们</NuxtLink>
        <NuxtLink to="/login" v-if="!auth.isAuthenticated" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">登录</NuxtLink>
        <button v-else @click="auth.logout()" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">退出</button>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="flex mb-10">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="检索输入框" 
        class="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        @click="handleSearch"
        class="bg-blue-500 text-white px-6 py-3 rounded-r hover:bg-blue-600 transition-colors"
      >
        查询按钮
      </button>
    </div>

    <!-- 搜索结果 -->
    <div class="space-y-6 mb-10">
      <div 
        v-for="result in searchResults" 
        :key="result.id"
        class="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ result.title }}</h3>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>法院: {{ result.court }}</span>
          <span>日期: {{ result.date }}</span>
          <span>案号: {{ result.caseNumber }}</span>
        </div>
      </div>
    </div>

    <!-- 更多按钮 -->
    <div class="flex justify-center">
      <button 
        @click="loadMore"
        class="px-10 py-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        更多
      </button>
    </div>
  </div>
</template>
