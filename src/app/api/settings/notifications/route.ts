// =====================================================
// US Associate SaaS - Notification Settings API Route
// =====================================================

import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NotificationSettingUpdate } from '@/types/settings'

const supabase = createRouteHandlerClient({ cookies })

// =====================================================
// GET NOTIFICATION SETTINGS
// =====================================================

export async function GET() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error, count } = await supabase
      .from('notification_settings')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching notification settings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch notification settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      data: data || [], 
      count: count || 0 
    })
  } catch (error) {
    console.error('Unexpected error in GET /api/settings/notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =====================================================
// UPDATE NOTIFICATION SETTINGS
// =====================================================

export async function PATCH(request: NextRequest) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { notification_type, ...updates } = body

    if (!notification_type) {
      return NextResponse.json(
        { error: 'Notification type is required' },
        { status: 400 }
      )
    }

    // Validate frequency if provided
    if (updates.frequency && !['immediate', 'daily', 'weekly', 'never'].includes(updates.frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency value' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('notification_settings')
      .update(updates)
      .eq('user_id', user.id)
      .eq('notification_type', notification_type)
      .select()
      .single()

    if (error) {
      console.error('Error updating notification setting:', error)
      return NextResponse.json(
        { error: 'Failed to update notification setting' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in PATCH /api/settings/notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =====================================================
// UPDATE MULTIPLE NOTIFICATION SETTINGS
// =====================================================

export async function PUT(request: NextRequest) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Request body must be an array' },
        { status: 400 }
      )
    }

    // Validate all updates
    for (const update of updates) {
      if (!update.notification_type) {
        return NextResponse.json(
          { error: 'Notification type is required for all updates' },
          { status: 400 }
        )
      }

      if (update.frequency && !['immediate', 'daily', 'weekly', 'never'].includes(update.frequency)) {
        return NextResponse.json(
          { error: `Invalid frequency value for ${update.notification_type}` },
          { status: 400 }
        )
      }
    }

    // Process updates in parallel
    const results = await Promise.all(
      updates.map(async (update) => {
        const { notification_type, ...updateData } = update
        const { data, error } = await supabase
          .from('notification_settings')
          .update(updateData)
          .eq('user_id', user.id)
          .eq('notification_type', notification_type)
          .select()
          .single()

        return { data, error, notification_type }
      })
    )

    // Check for errors
    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      console.error('Errors updating notification settings:', errors)
      return NextResponse.json(
        { error: `Failed to update some settings: ${errors[0].error?.message}` },
        { status: 500 }
      )
    }

    const data = results.map(result => result.data).filter(Boolean)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in PUT /api/settings/notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
