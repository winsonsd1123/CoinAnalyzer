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

  const { data, error } = await event.context.supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return {
    user: data.user,
    session: data.session
  }
})
