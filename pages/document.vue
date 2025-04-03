<template>
  <div class="min-h-[calc(100vh-12rem)] bg-gray-50">
    <!-- 导航和面包屑 -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center text-sm">
          <NuxtLink to="/home" class="text-gray-500 hover:text-blue-600">
            首页
          </NuxtLink>
          <span class="mx-2 text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
          <NuxtLink to="/search" class="text-gray-500 hover:text-blue-600">
            搜索结果
          </NuxtLink>
          <span class="mx-2 text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
          <span class="text-gray-900 font-medium truncate">{{ document.title }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- 左侧内容区 -->
        <div class="md:w-3/4">
          <div class="bg-white rounded-lg shadow-md p-8">
            <!-- 文书标题和标签 -->
            <div class="mb-6">
              <div class="flex flex-wrap gap-2 mb-3">
                <span 
                  class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800': document.type === '判决书',
                    'bg-green-100 text-green-800': document.type === '裁定书',
                    'bg-purple-100 text-purple-800': document.type === '调解书',
                    'bg-yellow-100 text-yellow-800': document.type === '决定书'
                  }"
                >
                  {{ document.type }}
                </span>
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {{ document.caseType }}
                </span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">{{ document.title }}</h1>
              <div class="mt-3 flex flex-wrap gap-x-6 text-sm text-gray-500">
                <div class="flex items-center mt-1">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ document.date }}</span>
                </div>
                <div class="flex items-center mt-1">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ document.court }}</span>
                </div>
                <div class="flex items-center mt-1">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                  </svg>
                  <span>案号：{{ document.caseNumber }}</span>
                </div>
              </div>
            </div>

            <!-- 文书操作按钮 -->
            <div class="flex gap-3 mb-8">
              <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                下载文件
              </button>
              <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                </svg>
                分享
              </button>
              <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                </svg>
                收藏
              </button>
              <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
                打印
              </button>
            </div>

            <!-- 文书内容 -->
            <div class="border-t border-gray-200 pt-6">
              <!-- 文书头部信息 -->
              <div class="text-center mb-8">
                <h2 class="text-2xl font-bold mb-2">{{ document.title }}</h2>
                <p class="text-gray-600">{{ document.court }}</p>
                <p class="text-gray-600">{{ document.caseNumber }}</p>
              </div>

              <!-- 当事人信息 -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">当事人信息</h3>
                <div class="space-y-2">
                  <p v-for="(party, index) in document.parties" :key="index" class="text-gray-800">
                    <span class="font-medium">{{ party.role }}：</span>{{ party.name }}，{{ party.info }}
                  </p>
                </div>
              </div>

              <!-- 裁判结果 -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">裁判结果</h3>
                <div class="p-4 bg-blue-50 border-l-4 border-blue-400 rounded text-gray-800">
                  <p v-for="(result, index) in document.judgmentResults" :key="index" class="mb-2">
                    {{ result }}
                  </p>
                </div>
              </div>

              <!-- 案件基本情况 -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">案件基本情况</h3>
                <div class="text-gray-800 leading-relaxed">
                  <p class="mb-4" v-for="(paragraph, index) in document.caseFacts" :key="index">
                    {{ paragraph }}
                  </p>
                </div>
              </div>

              <!-- 法院认为 -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">法院认为</h3>
                <div class="text-gray-800 leading-relaxed">
                  <p class="mb-4" v-for="(paragraph, index) in document.courtOpinion" :key="index">
                    {{ paragraph }}
                  </p>
                </div>
              </div>

              <!-- 判决署名 -->
              <div class="mt-10">
                <div class="flex justify-between items-center mb-6">
                  <div></div>
                  <div class="text-right">
                    <p class="text-gray-800 mb-2">审判长：{{ document.judge }}</p>
                    <p class="text-gray-800 mb-2">审判员：{{ document.associates.join('、') }}</p>
                    <p class="text-gray-800 mb-2">书记员：{{ document.clerk }}</p>
                    <p class="text-gray-800 mt-4">{{ document.judgmentDate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧信息栏 -->
        <div class="md:w-1/4">
          <!-- 文书信息卡片 -->
          <div class="bg-white rounded-lg shadow-md p-5 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">文书信息</h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">案件类型</p>
                <p class="text-gray-800">{{ document.caseCategory }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">审理程序</p>
                <p class="text-gray-800">{{ document.trialProcedure }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">审理法院</p>
                <p class="text-gray-800">{{ document.court }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">裁判日期</p>
                <p class="text-gray-800">{{ document.judgmentDate }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">文书字数</p>
                <p class="text-gray-800">{{ document.wordCount }} 字</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">引用法条</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span 
                    v-for="(law, index) in document.citedLaws" 
                    :key="index"
                    class="inline-block px-2 py-1 bg-blue-50 text-blue-800 rounded text-sm"
                  >
                    {{ law }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 相关文书 -->
          <div class="bg-white rounded-lg shadow-md p-5 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">相关文书</h3>
            <div class="space-y-4">
              <div v-for="(relatedDoc, index) in document.relatedDocuments" :key="index" class="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h4 class="text-blue-600 hover:text-blue-800 font-medium mb-1 cursor-pointer">{{ relatedDoc.title }}</h4>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">{{ relatedDoc.court }}</span>
                  <span class="text-gray-500">{{ relatedDoc.date }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 法条推荐 -->
          <div class="bg-white rounded-lg shadow-md p-5">
            <h3 class="text-lg font-medium text-gray-900 mb-4">推荐法条</h3>
            <div class="space-y-4">
              <div v-for="(law, index) in document.recommendedLaws" :key="index" class="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h4 class="text-blue-600 hover:text-blue-800 font-medium mb-1 cursor-pointer">{{ law.title }}</h4>
                <p class="text-sm text-gray-600 mb-2">{{ law.code }}</p>
                <p class="text-sm text-gray-800">{{ law.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// useRoute is auto-imported by Nuxt

const route = useRoute()
const documentId = ref(null)

// 根据URL参数ID获取文书详情
onMounted(() => {
  // 从URL获取文书ID
  if (route.query.id) {
    documentId.value = parseInt(route.query.id)
    // 在实际应用中，这里会调用API加载对应ID的文书
    console.log('Loading document with ID:', documentId.value)
    // 模拟API请求
    // loadDocument(documentId.value)
  }
})

// 假设这里是从API获取的文书详情数据
// 实际应用中应该根据documentId从服务器获取数据
const document = ref({
  id: 1,
  title: '张某与李某合同纠纷一审民事判决书',
  type: '判决书',
  caseType: '民事案件',
  caseCategory: '合同纠纷',
  trialProcedure: '一审',
  date: '2025-03-25',
  court: '北京市朝阳区人民法院',
  caseNumber: '(2025)京0105民初1234号',
  parties: [
    { role: '原告', name: '张某', info: '男，1980年10月出生，汉族，住北京市朝阳区' },
    { role: '被告', name: '李某', info: '男，1975年5月出生，汉族，住北京市海淀区' },
  ],
  judgmentResults: [
    '一、被告李某于本判决生效之日起十日内向原告张某支付货款人民币50万元及违约金(以50万元为基数，按照全国银行间同业拆借中心公布的贷款市场报价利率计算，自2024年12月25日起计算至实际付清之日止)；',
    '二、驳回原告张某的其他诉讼请求；',
    '三、案件受理费9800元，由原告张某负担2000元，被告李某负担7800元。'
  ],
  caseFacts: [
    '原告张某诉称：2024年12月10日，原告与被告签订《建筑材料购销合同》，约定由原告向被告提供建筑材料，总价款为人民币50万元，被告应于收到货物后15日内支付全部货款。原告已于2024年12月15日按合同约定向被告交付了全部建筑材料，被告亦对货物的品质、数量予以确认。但被告在货款到期后，以市场行情变化为由拒绝支付货款。原告多次催要无果，故诉至法院，请求判令被告支付货款50万元及相应违约金。',
    '被告李某辩称：原告提供的部分建筑材料存在质量问题，不符合合同约定的标准。被告已于收到货物后3日内向原告发出了质量异议通知，但原告拒绝更换或降价处理。被告同意支付符合质量标准部分的货款40万元，剩余10万元因质量问题应予扣减。',
    '经审理查明：2024年12月10日，原告张某与被告李某签订《建筑材料购销合同》，约定由原告向被告提供建筑材料，总价款为人民币50万元，被告应于收到货物后15日内支付全部货款。合同还约定，被告如对货物质量有异议，应在收到货物后5日内书面通知原告，否则视为验收合格。',
    '原告于2024年12月15日向被告交付了全部建筑材料，被告签收了送货单。被告于2024年12月20日向原告发出《质量异议通知》，称部分建筑材料不符合约定标准，要求原告更换或降价处理。原告收到通知后，主张被告异议已超过合同约定的5日期限，拒绝被告的请求。'
  ],
  courtOpinion: [
    '本院认为，本案争议焦点在于被告是否应按合同约定支付全部货款。',
    '首先，原告与被告签订的《建筑材料购销合同》系双方真实意思表示，不违反法律法规的强制性规定，合法有效，对双方均具有约束力。',
    '其次，根据合同约定，被告如对货物质量有异议，应在收到货物后5日内书面通知原告。根据查明的事实，原告于2024年12月15日交付货物，被告于2024年12月20日提出质量异议，已超过合同约定的5日期限。按照合同约定，被告逾期提出异议的，视为验收合格。因此，被告关于部分货物存在质量问题的抗辩理由，本院不予支持。',
    '第三，被告未按合同约定支付货款，已构成违约。根据《中华人民共和国民法典》第五百七十七条的规定，当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。据此，被告应向原告支付全部货款50万元。',
    '第四，关于违约金，原告主张按照贷款市场报价利率计算违约金，符合法律规定，本院予以支持。',
    '综上，依据《中华人民共和国民法典》第五百七十七条、第五百八十五条的规定，判决如下。'
  ],
  judge: '王大明',
  associates: ['张立', '李强'],
  clerk: '赵小红',
  judgmentDate: '2025年3月25日',
  wordCount: 3568,
  citedLaws: ['民法典第五百七十七条', '民法典第五百八十五条'],
  relatedDocuments: [
    { title: '张某与李某合同纠纷二审民事判决书', court: '北京市第二中级人民法院', date: '2025-06-15' },
    { title: '李某与王某类似合同纠纷案', court: '北京市西城区人民法院', date: '2024-11-20' },
    { title: '赵某与钱某建筑材料买卖合同纠纷案', court: '北京市朝阳区人民法院', date: '2025-02-18' }
  ],
  recommendedLaws: [
    {
      title: '关于合同违约责任',
      code: '《中华人民共和国民法典》第五百七十七条',
      content: '当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。'
    },
    {
      title: '关于定金罚则',
      code: '《中华人民共和国民法典》第五百八十六条',
      content: '当事人可以约定一方向对方给付定金作为债权的担保。定金合同自实际交付定金时成立。定金的数额由当事人约定；但是，不得超过主合同标的额的百分之二十，超过部分不产生定金的效力。'
    },
    {
      title: '关于检验期间',
      code: '《中华人民共和国民法典》第六百一十六条',
      content: '当事人可以约定检验期间。检验期间自标的物交付或者交付提取标的物的通知到达买受人时起算。当事人没有约定检验期间的，买受人应当在合理期间内检验。'
    }
  ]
})
</script>
