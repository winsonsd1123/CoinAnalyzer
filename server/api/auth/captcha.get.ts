import svgCaptcha from 'svg-captcha'
import { defineEventHandler } from 'h3'

export const captchaStore = new Map<string, string>()

export default defineEventHandler(async (event) => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1iIl',
    noise: 2,
    color: true,
    background: '#f8fafc'
  })
  
  const token = Math.random().toString(36).substring(2, 15)
  captchaStore.set(token, captcha.text)
  
  // 设置验证码token 1分钟过期
  setTimeout(() => {
    captchaStore.delete(token)
  }, 60 * 1000)

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'x-captcha-token', token)
  return captcha.data
})
