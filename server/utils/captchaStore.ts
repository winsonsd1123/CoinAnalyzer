// 全局单例验证码存储
const captchaStore = new Map<string, string>()

export const getCaptchaStore = () => captchaStore

export const setCaptcha = (token: string, text: string) => {
  
    console.log('setCaptcha当前存储的token:', text)
    captchaStore.set(token, text)
    // 1分钟后自动清除
    setTimeout(() => {
        captchaStore.delete(token)
    }, 60 * 1000)
}

export const verifyCaptcha = (token: string, input: string) => {
  const text = captchaStore.get(token)
  console.log('verifyCaptcha当前存储的token:', text)
  if (!text) {
    console.log('验证码token不存在:', token)
    console.log('当前存储的token:', [...captchaStore.keys()])
    return false
  }
  return text.toLowerCase() === input.toLowerCase()
}
