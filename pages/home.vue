<template>
  <div class="min-h-[calc(100vh-12rem)]">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-blue-900 to-blue-800 py-20 text-white relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight">
              法律文书检索平台
            </h1>
            <p class="text-lg text-blue-100 max-w-md">
              快速、精准地检索各类法律文书，助力法律专业人士提升工作效率。
            </p>
              <div class="relative mt-8">
                <div class="flex">
                  <input
                    type="text"
                    placeholder="输入关键词搜索法律文书..."
                    class="w-full px-6 py-4 rounded-l-lg focus:outline-none text-gray-700"
                    v-model="searchQuery"
                  />
                  <button 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-r-lg transition-colors"
                    @click="goToSearch"
                  >
                    <span class="hidden sm:inline">搜索文书</span>
                    <span class="sm:hidden">搜索</span>
                  </button>
                </div>
              <div class="mt-3 flex flex-wrap gap-2 text-sm">
                <span class="text-blue-200">热门搜索:</span>
                <NuxtLink :to="`/search?q=民法典`" class="text-white hover:underline">民法典</NuxtLink>
                <NuxtLink :to="`/search?q=合同纠纷`" class="text-white hover:underline">合同纠纷</NuxtLink>
                <NuxtLink :to="`/search?q=知识产权`" class="text-white hover:underline">知识产权</NuxtLink>
                <NuxtLink :to="`/search?q=劳动法`" class="text-white hover:underline">劳动法</NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
              alt="法律文书"
              class="rounded-lg shadow-2xl object-cover h-96 w-full"
            />
          </div>
        </div>
      </div>
      <!-- 背景装饰元素 -->
      <div class="absolute right-0 top-0 opacity-5">
        <svg width="600" height="600" viewBox="0 0 100 100">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="white" />
          <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="white" />
          <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="white" />
          <path d="M50 30 L70 50 L50 70 L30 50 Z" fill="none" stroke="white" />
        </svg>
      </div>
    </section>

    <!-- 文书分类 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">法律文书分类</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-1 text-gray-800">裁判文书</h3>
            <p class="text-gray-500 text-sm">判决书、裁定书、调解书等</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-1 text-gray-800">法律法规</h3>
            <p class="text-gray-500 text-sm">法律、行政法规、地方性法规</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-1 text-gray-800">合同模板</h3>
            <p class="text-gray-500 text-sm">各类合同范本与协议模板</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-1 text-gray-800">法律咨询</h3>
            <p class="text-gray-500 text-sm">典型案例与法律问答</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 高级检索功能 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-12">
          <div class="md:w-1/2 space-y-6 flex flex-col justify-center">
            <h2 class="text-3xl font-bold text-gray-800">高级检索功能</h2>
            <p class="text-lg text-gray-600">
              我们提供多维度的检索功能，满足您对法律文书精准查找的需求。
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">全文检索</h3>
                  <p class="text-gray-600">支持对法律文书全文内容进行关键词检索</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">条件组合</h3>
                  <p class="text-gray-600">按文书类型、发布时间、法院层级等多条件组合检索</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">智能推荐</h3>
                  <p class="text-gray-600">基于搜索历史和阅读习惯，智能推荐相关法律文书</p>
                </div>
              </li>
            </ul>
            <div class="pt-4">
              <button class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium">
                了解更多检索功能
              </button>
            </div>
          </div>
          <div class="md:w-1/2">
            <div class="bg-gray-50 p-6 rounded-xl shadow-lg">
              <h3 class="text-xl font-semibold mb-4 text-gray-800">高级检索</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">文书类型</label>
                  <select class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>全部类型</option>
                    <option>判决书</option>
                    <option>裁定书</option>
                    <option>调解书</option>
                    <option>决定书</option>
                  </select>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                    <input type="date" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                    <input type="date" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">关键词</label>
                  <input type="text" placeholder="请输入关键词" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">法院层级</label>
                  <div class="grid grid-cols-2 gap-2">
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500" />
                      <span class="ml-2 text-sm text-gray-700">最高法院</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500" />
                      <span class="ml-2 text-sm text-gray-700">高级法院</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500" />
                      <span class="ml-2 text-sm text-gray-700">中级法院</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500" />
                      <span class="ml-2 text-sm text-gray-700">基层法院</span>
                    </label>
                  </div>
                </div>
                <div class="pt-2">
                  <button class="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium">
                    开始检索
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文书 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-8">
          <h2 class="text-3xl font-bold text-gray-800">最新法律文书</h2>
          <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">查看更多 →</a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">判决书</span>
                <span class="text-gray-500 text-sm">2025-03-25</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                张某与李某合同纠纷一审民事判决书
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                原告张某诉被告李某买卖合同纠纷一案，本院于2025年2月15日立案后，依法适用简易程序，于2025年3月10日公开开庭进行了审理...
              </p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">北京市朝阳区人民法院</span>
                <NuxtLink :to="`/document?id=1`" class="text-blue-600 hover:text-blue-800 font-medium">查看详情</NuxtLink>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">行政裁定书</span>
                <span class="text-gray-500 text-sm">2025-03-22</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                王某诉某市规划局行政许可纠纷案
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                原告王某因不服某市规划局于2025年1月5日作出的行政许可决定，向本院提起行政诉讼。本院经审查认为，原告提出的诉讼请求...
              </p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">上海市第二中级人民法院</span>
                <NuxtLink :to="`/document?id=2`" class="text-blue-600 hover:text-blue-800 font-medium">查看详情</NuxtLink>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">调解书</span>
                <span class="text-gray-500 text-sm">2025-03-20</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                赵某与钱某劳动争议调解书
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                申请人赵某与被申请人钱某劳动争议一案，本院于2025年2月28日受理后，依法组成合议庭，于2025年3月15日公开开庭进行了调解...
              </p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">广州市天河区人民法院</span>
                <NuxtLink :to="`/document?id=3`" class="text-blue-600 hover:text-blue-800 font-medium">查看详情</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 注册引导 -->
    <section class="py-16 bg-blue-800 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">立即注册，畅享专业检索体验</h2>
        <p class="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
          注册会员后，您可享受更多高级检索功能、文献下载、个性化设置等特权服务。
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#" class="inline-block bg-white text-blue-800 hover:bg-blue-100 transition-colors px-8 py-4 rounded-lg font-medium text-lg shadow-lg">
            免费注册
          </a>
          <a href="#" class="inline-block border border-white text-white hover:bg-white hover:text-blue-800 transition-colors px-8 py-4 rounded-lg font-medium text-lg">
            了解会员特权
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 检查用户是否已登录，如果已登录则直接跳转到相应页面
const auth = useAuth()
const searchQuery = ref('')

// 跳转到搜索页面
const goToSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo({
      path: '/search',
      query: { q: searchQuery.value }
    })
  } else {
    navigateTo('/search')
  }
}

// 搜索特定关键词
const searchKeyword = (keyword) => {
  navigateTo({
    path: '/search',
    query: { q: keyword }
  })
}

// 查看文档详情
const viewDocumentDetails = (documentId) => {
  navigateTo({
    path: '/document',
    query: { id: documentId }
  })
}

onMounted(() => {
  if (auth.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>
