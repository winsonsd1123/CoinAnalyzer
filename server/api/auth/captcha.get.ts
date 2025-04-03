import svgCaptcha from 'svg-captcha'
import { defineEventHandler } from 'h3'
import { setCaptcha } from '~/server/utils/captchaStore'

export default defineEventHandler(async (event) => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1iIl',
    noise: 1,
    color: false,
    background: '#f8fafc',
    width: 120,
    height: 48,
    fontSize: 40,
    charPreset: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  })
  
  const token = Math.random().toString(36).substring(2, 15)
  setCaptcha(token, captcha.text)

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')
  setHeader(event, 'x-captcha-token', token)
  return captcha.data
})
