import { H3Event } from 'h3'
import supabaseMiddleware from '~/server/middleware/supabase.server'
import { captchaStore } from './captcha.get'

export default defineEventHandler(async (event: H3Event) => {
  const { email, password, captcha, captchaToken } = await readBody(event)
  
  // 验证验证码
  const correctCaptcha = captchaStore.get(captchaToken)
  if (!correctCaptcha || correctCaptcha.toLowerCase() !== captcha.toLowerCase()) {
    throw createError({
      statusCode: 400,
      message: '验证码错误'
    })
  }
  captchaStore.delete(captchaToken)
  
  if (!event.context.supabase) {
    throw createError({
      statusCode: 500,
      message: 'Supabase client not initialized'
    })
  }

  const { data, error } = await event.context.supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password'
    })
  }

  return {
    user: data.user,
    token: data.session.access_token
  }
})
