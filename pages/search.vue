<template>
  <div class="min-h-[calc(100vh-12rem)] bg-gray-50">
    <!-- 搜索栏 -->
    <section class="bg-blue-800 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input 
                type="text" 
                placeholder="输入关键词搜索法律文书..." 
                class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                v-model="searchQuery"
              />
              <button 
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                @click="performSearch"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <button 
            class="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors md:w-auto flex items-center justify-center"
            @click="showAdvancedSearch = !showAdvancedSearch"
          >
            <span>高级检索</span>
            <svg 
              class="w-5 h-5 ml-1" 
              :class="{'transform rotate-180': showAdvancedSearch}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <!-- 高级检索选项 -->
        <div v-if="showAdvancedSearch" class="mt-4 bg-white p-4 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">文书类型</label>
              <select v-model="filters.docType" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">全部类型</option>
                <option value="judgment">判决书</option>
                <option value="ruling">裁定书</option>
                <option value="mediation">调解书</option>
                <option value="decision">决定书</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">发布日期</label>
              <div class="grid grid-cols-2 gap-2">
                <input 
                  type="date" 
                  v-model="filters.startDate"
                  class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input 
                  type="date" 
                  v-model="filters.endDate"
                  class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">法院层级</label>
              <select v-model="filters.courtLevel" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">全部法院</option>
                <option value="supreme">最高人民法院</option>
                <option value="high">高级人民法院</option>
                <option value="intermediate">中级人民法院</option>
                <option value="primary">基层人民法院</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">案由</label>
              <input 
                type="text" 
                v-model="filters.caseReason"
                placeholder="案由关键词" 
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">当事人</label>
              <input 
                type="text" 
                v-model="filters.litigant"
                placeholder="当事人姓名" 
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">法官</label>
              <input 
                type="text" 
                v-model="filters.judge"
                placeholder="法官姓名" 
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div class="flex justify-end mt-4 space-x-2">
            <button 
              @click="resetFilters"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              重置
            </button>
            <button 
              @click="performSearch"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              应用筛选
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 搜索结果 -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="mb-6 flex justify-between items-center">
          <div class="text-gray-600">
            找到 <span class="font-semibold">{{ totalResults }}</span> 条结果
            <span v-if="searchQuery" class="ml-1">
              包含 "<span class="text-blue-600 font-medium">{{ searchQuery }}</span>"
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">排序方式：</span>
            <select 
              v-model="sortOption"
              class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="relevance">相关度</option>
              <option value="date_desc">最新发布</option>
              <option value="date_asc">最早发布</option>
              <option value="views_desc">浏览最多</option>
            </select>
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧筛选面板 -->
          <div class="md:w-1/4 lg:w-1/5">
            <div class="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 class="font-medium text-gray-900 mb-3">文书类型</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.judgments" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">判决书 ({{ counts.judgments }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.rulings" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">裁定书 ({{ counts.rulings }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.mediations" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">调解书 ({{ counts.mediations }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.decisions" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">决定书 ({{ counts.decisions }})</span>
                </label>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 class="font-medium text-gray-900 mb-3">案由类型</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.civil" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">民事案件 ({{ counts.civil }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.criminal" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">刑事案件 ({{ counts.criminal }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.administrative" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">行政案件 ({{ counts.administrative }})</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="sideFilters.enforcement" class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">执行案件 ({{ counts.enforcement }})</span>
                </label>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-4">
              <h3 class="font-medium text-gray-900 mb-3">发布日期</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" v-model="sideFilters.timeRange" value="all" class="text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">全部时间</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="sideFilters.timeRange" value="week" class="text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">最近一周</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="sideFilters.timeRange" value="month" class="text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">最近一月</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="sideFilters.timeRange" value="year" class="text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">最近一年</span>
                </label>
                <div class="mt-3 pt-3 border-t border-gray-200">
                  <div class="text-sm text-gray-600 mb-2">自定义时间范围</div>
                  <div class="grid grid-cols-1 gap-2">
                    <input 
                      type="date" 
                      v-model="sideFilters.customStartDate"
                      class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                    <input 
                      type="date" 
                      v-model="sideFilters.customEndDate"
                      class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                    <button 
                      @click="applyCustomDateRange"
                      class="mt-1 w-full py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      应用日期
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧搜索结果 -->
          <div class="md:w-3/4 lg:w-4/5">
            <!-- 结果列表 -->
            <div class="space-y-4">
              <div 
                v-for="(result, index) in searchResults" 
                :key="index" 
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex flex-wrap gap-2">
                      <span 
                        class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        :class="{
                          'bg-blue-100 text-blue-800': result.type === '判决书',
                          'bg-green-100 text-green-800': result.type === '裁定书',
                          'bg-purple-100 text-purple-800': result.type === '调解书',
                          'bg-yellow-100 text-yellow-800': result.type === '决定书'
                        }"
                      >
                        {{ result.type }}
                      </span>
                      <span 
                        class="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {{ result.caseType }}
                      </span>
                    </div>
                    <span class="text-gray-500 text-sm">{{ result.date }}</span>
                  </div>
                  <h3 class="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 cursor-pointer">
                    {{ result.title }}
                  </h3>
                  <p class="text-gray-600 mb-4">
                    <span 
                      v-for="(highlight, i) in result.highlights" 
                      :key="i"
                      v-html="highlight"
                      class="text-sm"
                    ></span>
                    <span class="text-sm text-gray-400">...</span>
                  </p>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                      <span class="text-gray-500 text-sm">{{ result.court }}</span>
                      <span class="text-gray-400 text-sm">案号：{{ result.caseNumber }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="viewDocumentDetails(result.id)"
                        class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                        </svg>
                        查看详情
                      </button>
                      <button class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        下载
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 无结果提示 -->
            <div v-if="searchResults.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="text-xl font-medium text-gray-900 mb-2">未找到匹配的结果</h3>
              <p class="text-gray-600 mb-4">
                尝试使用不同的关键词或调整筛选条件，以获得更多相关结果。
              </p>
              <button 
                @click="resetAll"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                清除所有筛选
              </button>
            </div>
            
            <!-- 分页 -->
            <div class="mt-8 flex justify-center">
              <div class="flex items-center space-x-1">
                <button 
                  :disabled="currentPage === 1"
                  :class="{'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1, 'bg-white text-gray-500 hover:bg-gray-50': currentPage !== 1}"
                  class="px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  上一页
                </button>
                
                <button 
                  v-for="page in displayedPages"
                  :key="page"
                  :class="{'bg-blue-600 text-white': currentPage === page, 'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page}"
                  class="px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {{ page }}
                </button>
                
                <button 
                  :disabled="currentPage === totalPages"
                  :class="{'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages, 'bg-white text-gray-500 hover:bg-gray-50': currentPage !== totalPages}"
                  class="px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
// useRoute is auto-imported by Nuxt

const route = useRoute()

// 搜索相关状态
const searchQuery = ref('')

// 从URL查询参数获取搜索词
onMounted(() => {
  // 检查URL中是否有搜索查询参数
  if (route.query.q) {
    searchQuery.value = route.query.q.toString()
    performSearch()
  }
})
const showAdvancedSearch = ref(false)
const currentPage = ref(1)
const totalResults = ref(348)
const totalPages = ref(35)
const sortOption = ref('relevance')

// 高级筛选选项
const filters = ref({
  docType: '',
  startDate: '',
  endDate: '',
  courtLevel: '',
  caseReason: '',
  litigant: '',
  judge: ''
})

// 侧边栏筛选选项
const sideFilters = ref({
  judgments: false,
  rulings: false,
  mediations: false,
  decisions: false,
  civil: false,
  criminal: false,
  administrative: false,
  enforcement: false,
  timeRange: 'all',
  customStartDate: '',
  customEndDate: ''
})

// 各种类型数量统计
const counts = ref({
  judgments: 156,
  rulings: 92,
  mediations: 47,
  decisions: 53,
  civil: 189,
  criminal: 76,
  administrative: 58,
  enforcement: 25
})

// 模拟搜索结果
const searchResults = ref([
  {
    id: 1,
    title: '张某与李某合同纠纷一审民事判决书',
    type: '判决书',
    caseType: '民事案件',
    date: '2025-03-25',
    court: '北京市朝阳区人民法院',
    caseNumber: '(2025)京0105民初1234号',
    highlights: [
      '原告请求被告支付货款<mark class="bg-yellow-200">50万元</mark>及违约金...',
      '双方于2024年12月签订《购销合同》，约定原告向被告供应<mark class="bg-yellow-200">建筑材料</mark>...',
      '被告辩称因<mark class="bg-yellow-200">质量问题</mark>拒绝支付货款...'
    ]
  },
  {
    id: 2,
    title: '王某诉某市规划局行政许可纠纷案',
    type: '裁定书',
    caseType: '行政案件',
    date: '2025-03-22',
    court: '上海市第二中级人民法院',
    caseNumber: '(2025)沪02行初78号',
    highlights: [
      '原告不服被告于2025年1月5日作出的<mark class="bg-yellow-200">行政许可决定</mark>...',
      '被告辩称本案<mark class="bg-yellow-200">行政许可</mark>符合法定程序...',
      '本院认为，根据《行政诉讼法》第<mark class="bg-yellow-200">四十四条</mark>规定...'
    ]
  },
  {
    id: 3,
    title: '赵某与钱某劳动争议调解书',
    type: '调解书',
    caseType: '民事案件',
    date: '2025-03-20',
    court: '广州市天河区人民法院',
    caseNumber: '(2025)粤0106民初456号',
    highlights: [
      '原告赵某因<mark class="bg-yellow-200">劳动合同</mark>纠纷向本院提起诉讼...',
      '经本院主持调解，双方当事人自愿达成如下<mark class="bg-yellow-200">协议</mark>...',
      '被告同意支付原告<mark class="bg-yellow-200">工资差额</mark>38600元...'
    ]
  },
  {
    id: 4,
    title: '孙某某贪污受贿案一审刑事判决书',
    type: '判决书',
    caseType: '刑事案件',
    date: '2025-03-18',
    court: '重庆市第一中级人民法院',
    caseNumber: '(2025)渝01刑初56号',
    highlights: [
      '被告人孙某某身为国家工作人员，利用职务便利，<mark class="bg-yellow-200">贪污公款</mark>...',
      '2023年6月至2024年9月，被告人多次收受他人<mark class="bg-yellow-200">财物</mark>共计人民币120万元...',
      '根据《中华人民共和国刑法》第<mark class="bg-yellow-200">三百八十三条</mark>之规定...'
    ]
  },
  {
    id: 5,
    title: '周某诉房地产开发公司商品房买卖合同纠纷案',
    type: '判决书',
    caseType: '民事案件',
    date: '2025-03-15',
    court: '南京市玄武区人民法院',
    caseNumber: '(2025)苏0102民初789号',
    highlights: [
      '原告与被告于2023年8月签订《<mark class="bg-yellow-200">商品房买卖合同</mark>》...',
      '被告交付的房屋存在<mark class="bg-yellow-200">质量问题</mark>，主要表现为墙体渗水、地板开裂...',
      '经鉴定机构鉴定，涉案房屋<mark class="bg-yellow-200">主体结构</mark>符合国家标准...'
    ]
  }
])

// 显示的页码数组
const displayedPages = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  
  if (totalPages.value <= maxVisiblePages) {
    // 如果总页数小于等于最大可见页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 否则，显示当前页附近的页码
    let start = Math.max(currentPage.value - Math.floor(maxVisiblePages / 2), 1)
    let end = start + maxVisiblePages - 1
    
    if (end > totalPages.value) {
      end = totalPages.value
      start = Math.max(end - maxVisiblePages + 1, 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 执行搜索
const performSearch = () => {
  // 在实际应用中，这里会调用API进行搜索
  console.log('执行搜索:', {
    query: searchQuery.value,
    filters: filters.value,
    sideFilters: sideFilters.value,
    page: currentPage.value,
    sortBy: sortOption.value
  })
  
  // 模拟搜索结果更新
  // 实际应用中这里会根据API响应更新结果
}

// 重置高级筛选条件
const resetFilters = () => {
  filters.value = {
    docType: '',
    startDate: '',
    endDate: '',
    courtLevel: '',
    caseReason: '',
    litigant: '',
    judge: ''
  }
}

// 应用自定义日期范围
const applyCustomDateRange = () => {
  sideFilters.value.timeRange = 'custom'
  performSearch()
}

// 重置所有搜索条件
const resetAll = () => {
  searchQuery.value = ''
  resetFilters()
  sideFilters.value = {
    judgments: false,
    rulings: false,
    mediations: false,
    decisions: false,
    civil: false,
    criminal: false,
    administrative: false,
    enforcement: false,
    timeRange: 'all',
    customStartDate: '',
    customEndDate: ''
  }
  performSearch()
}

// 监听筛选条件变化自动执行搜索
watch([sideFilters, sortOption], () => {
  performSearch()
}, { deep: true })

// 查看文书详情
const viewDocumentDetails = (documentId) => {
  navigateTo({
    path: '/document',
    query: { id: documentId }
  })
}

// 页面加载时执行初始搜索
onMounted(() => {
  performSearch()
})
</script>
