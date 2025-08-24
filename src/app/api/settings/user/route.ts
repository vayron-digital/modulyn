// =====================================================
// US Associate SaaS - User Settings API Route
// =====================================================

import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { UserSettingsUpdate } from '@/types/settings'

const supabase = createRouteHandlerClient({ cookies })

// =====================================================
// GET USER SETTINGS
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

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user settings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch user settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in GET /api/settings/user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =====================================================
// UPDATE USER SETTINGS
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

    const updates: UserSettingsUpdate = await request.json()

    // Validate required fields
    if (!updates || typeof updates !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Validate theme if provided
    if (updates.theme && !['light', 'dark', 'system'].includes(updates.theme)) {
      return NextResponse.json(
        { error: 'Invalid theme value' },
        { status: 400 }
      )
    }

    // Validate color scheme if provided
    if (updates.color_scheme && !['indigo', 'blue', 'green', 'purple', 'orange', 'red'].includes(updates.color_scheme)) {
      return NextResponse.json(
        { error: 'Invalid color scheme value' },
        { status: 400 }
      )
    }

    // Validate font size if provided
    if (updates.font_size && !['small', 'medium', 'large'].includes(updates.font_size)) {
      return NextResponse.json(
        { error: 'Invalid font size value' },
        { status: 400 }
      )
    }

    // Validate user mode if provided
    if (updates.mode && !['trade', 'crm'].includes(updates.mode)) {
      return NextResponse.json(
        { error: 'Invalid user mode value' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user settings:', error)
      return NextResponse.json(
        { error: 'Failed to update user settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in PATCH /api/settings/user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =====================================================
// CREATE/UPDATE USER SETTINGS (UPSERT)
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

    const settings = await request.json()

    // Validate required fields
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ ...settings, user_id: user.id })
      .select()
      .single()

    if (error) {
      console.error('Error upserting user settings:', error)
      return NextResponse.json(
        { error: 'Failed to save user settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in PUT /api/settings/user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
