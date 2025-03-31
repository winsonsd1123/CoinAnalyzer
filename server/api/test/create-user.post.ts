import { H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event: H3Event) => {
  const { supabase } = event.context
  const { username, password, nickname } = await readBody(event)

  // Create test user (password should be hashed in production)
  const { data, error } = await supabase
    .from('users')
    .insert([{
      username,
      password, // Note: In production, passwords should be properly hashed
      nickname,
      create_at: new Date().toISOString()
    }])
    .select()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return { user: data[0] }
})
