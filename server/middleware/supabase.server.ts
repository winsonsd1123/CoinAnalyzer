import { createClient } from '@supabase/supabase-js'
import { defineEventHandler } from 'h3'
import type { H3Event } from 'h3'
import type { Database } from '~/types/supabase'

declare module 'h3' {
  interface H3EventContext {
    supabase: ReturnType<typeof createClient<Database>>
  }
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const config = useRuntimeConfig()
    console.log('Supabase config:', {
      url: config.public.supabaseUrl,
      key: config.public.supabaseKey?.slice(0, 5) + '...' // 部分隐藏key
    })
    
    if (!config.public.supabaseUrl || !config.public.supabaseKey) {
      throw createError({
        statusCode: 500,
        message: 'Supabase configuration missing'
      })
    }

    const supabase = createClient<Database>(
      config.public.supabaseUrl,
      config.public.supabaseKey,
      {
        auth: {
          persistSession: false
        }
      }
    )

    event.context.supabase = supabase
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.error('Supabase middleware error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to initialize Supabase client'
    })
  }
})
