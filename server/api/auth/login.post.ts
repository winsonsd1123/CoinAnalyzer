import { H3Event } from 'h3'
import supabaseMiddleware from '~/server/middleware/supabase.server'

export default defineEventHandler(async (event: H3Event) => {
  const { email, password } = await readBody(event)
  
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
