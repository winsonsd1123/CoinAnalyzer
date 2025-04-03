import { verifyCaptcha } from '~/server/utils/captchaStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.token || !body.captcha) {
    throw createError({
      statusCode: 400,
      message: '无效的验证码请求'
    })
  }

  const isValid = verifyCaptcha(body.token, body.captcha)
  
  if (!isValid) {
    console.log('验证码验证失败:', { token: body.token, captcha: body.captcha })
  }

  return {
    valid: isValid
  }
})
