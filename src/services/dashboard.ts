import { supabase } from '@/lib/supabase'

// Trade Dashboard KPIs
export interface TradeDashboardKPIs {
  totalMembers: number
  totalMembersChange: number
  activeEvents: number
  activeEventsChange: number
  revenue: number
  revenueChange: number
  activeCampaigns: number
  activeCampaignsChange: number
}

// CRM Dashboard KPIs
export interface CRMDashboardKPIs {
  activeListings: number
  activeListingsChange: number
  activeLeads: number
  activeLeadsChange: number
  dealsValue: number
  dealsValueChange: number
  tasksDue: number
  tasksDueChange: number
  activeClients: number
  activeClientsChange: number
  conversionRate: number
  conversionRateChange: number
}

// Get current user's tenant ID
async function getCurrentTenantId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    // Try to get tenant_id from user_settings first (more reliable)
    const { data: userSettings, error: settingsError } = await supabase
      .from('user_settings')
      .select('organization_id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!settingsError && userSettings?.organization_id) {
      return userSettings.organization_id
    }

    // Fallback to profiles table with better error handling
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .maybeSingle() // Use maybeSingle instead of single to avoid errors

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return profile?.tenant_id || null
  } catch (error) {
    console.error('Unexpected error in getCurrentTenantId:', error)
    return null
  }
}

// Trade Dashboard KPI Functions
export async function getTradeDashboardKPIs(): Promise<TradeDashboardKPIs> {
  const tenantId = await getCurrentTenantId()
  if (!tenantId) {
    console.warn('No tenant ID found, returning default values')
    return {
      totalMembers: 0,
      totalMembersChange: 0,
      activeEvents: 0,
      activeEventsChange: 0,
      revenue: 0,
      revenueChange: 0,
      activeCampaigns: 0,
      activeCampaignsChange: 0,
    }
  }

  // Get current date and last month date
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
  const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)

  try {
    // Total Members
    const { count: totalMembers, error: membersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('subscription_status', 'active')

    if (membersError) {
      console.error('Error fetching members:', membersError)
    }

    const { count: lastMonthMembers, error: lastMonthMembersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('subscription_status', 'active')
      .lt('created_at', lastMonthStart.toISOString())

    if (lastMonthMembersError) {
      console.error('Error fetching last month members:', lastMonthMembersError)
    }

    const totalMembersChange = (totalMembers || 0) - (lastMonthMembers || 0)

    // Active Events
    const { count: activeEvents, error: eventsError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('start_date', now.toISOString())
      .lte('end_date', new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString())

    if (eventsError) {
      console.error('Error fetching events:', eventsError)
    }

    const { count: lastMonthEvents, error: lastMonthEventsError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('start_date', lastMonthStart.toISOString())
      .lte('end_date', lastMonthEnd.toISOString())

    if (lastMonthEventsError) {
      console.error('Error fetching last month events:', lastMonthEventsError)
    }

    const activeEventsChange = (activeEvents || 0) - (lastMonthEvents || 0)

    // Revenue (from subscriptions and events)
    const { data: currentRevenue, error: revenueError } = await supabase
      .from('subscriptions')
      .select('amount')
      .eq('tenant_id', tenantId)
      .eq('status', 'active')

    if (revenueError) {
      console.error('Error fetching revenue:', revenueError)
    }

    const { data: lastMonthRevenue, error: lastMonthRevenueError } = await supabase
      .from('subscriptions')
      .select('amount')
      .eq('tenant_id', tenantId)
      .eq('status', 'active')
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthRevenueError) {
      console.error('Error fetching last month revenue:', lastMonthRevenueError)
    }

    const revenue = currentRevenue?.reduce((sum, sub) => sum + (sub.amount || 0), 0) || 0
    const lastMonthRevenueTotal = lastMonthRevenue?.reduce((sum, sub) => sum + (sub.amount || 0), 0) || 0
    const revenueChange = revenue - lastMonthRevenueTotal

    // Active Campaigns
    const { count: activeCampaigns, error: campaignsError } = await supabase
      .from('email_campaigns')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active')

    if (campaignsError) {
      console.error('Error fetching campaigns:', campaignsError)
    }

    const { count: lastMonthCampaigns, error: lastMonthCampaignsError } = await supabase
      .from('email_campaigns')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active')
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthCampaignsError) {
      console.error('Error fetching last month campaigns:', lastMonthCampaignsError)
    }

    const activeCampaignsChange = (activeCampaigns || 0) - (lastMonthCampaigns || 0)

    return {
      totalMembers: totalMembers || 0,
      totalMembersChange,
      activeEvents: activeEvents || 0,
      activeEventsChange,
      revenue,
      revenueChange,
      activeCampaigns: activeCampaigns || 0,
      activeCampaignsChange,
    }
  } catch (error) {
    console.error('Error in getTradeDashboardKPIs:', error)
    // Return default values if there's an error
    return {
      totalMembers: 0,
      totalMembersChange: 0,
      activeEvents: 0,
      activeEventsChange: 0,
      revenue: 0,
      revenueChange: 0,
      activeCampaigns: 0,
      activeCampaignsChange: 0,
    }
  }
}

// CRM Dashboard KPI Functions
export async function getCRMDashboardKPIs(): Promise<CRMDashboardKPIs> {
  const tenantId = await getCurrentTenantId()
  if (!tenantId) {
    console.warn('No tenant ID found, returning default values')
    return {
      activeListings: 0,
      activeListingsChange: 0,
      activeLeads: 0,
      activeLeadsChange: 0,
      dealsValue: 0,
      dealsValueChange: 0,
      tasksDue: 0,
      tasksDueChange: 0,
      activeClients: 0,
      activeClientsChange: 0,
      conversionRate: 0,
      conversionRateChange: 0,
    }
  }

  // Get current date and last month date
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
  const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)

  try {
    // Active Listings
    const { count: activeListings, error: listingsError } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'available')

    if (listingsError) {
      console.error('Error fetching listings:', listingsError)
    }

    const { count: lastMonthListings, error: lastMonthListingsError } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'available')
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthListingsError) {
      console.error('Error fetching last month listings:', lastMonthListingsError)
    }

    const activeListingsChange = (activeListings || 0) - (lastMonthListings || 0)

    // Active Leads
    const { count: activeLeads, error: leadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .in('status', ['new', 'contacted', 'qualified'])

    if (leadsError) {
      console.error('Error fetching leads:', leadsError)
    }

    const { count: lastMonthLeads, error: lastMonthLeadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .in('status', ['new', 'contacted', 'qualified'])
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthLeadsError) {
      console.error('Error fetching last month leads:', lastMonthLeadsError)
    }

    const activeLeadsChange = (activeLeads || 0) - (lastMonthLeads || 0)

    // Deals Value
    const { data: currentDeals, error: dealsError } = await supabase
      .from('deals')
      .select('value')
      .eq('tenant_id', tenantId)
      .in('status', ['open', 'negotiation', 'pending'])

    if (dealsError) {
      console.error('Error fetching deals:', dealsError)
    }

    const { data: lastMonthDeals, error: lastMonthDealsError } = await supabase
      .from('deals')
      .select('value')
      .eq('tenant_id', tenantId)
      .in('status', ['open', 'negotiation', 'pending'])
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthDealsError) {
      console.error('Error fetching last month deals:', lastMonthDealsError)
    }

    const dealsValue = currentDeals?.reduce((sum, deal) => sum + (deal.value || 0), 0) || 0
    const lastMonthDealsValue = lastMonthDeals?.reduce((sum, deal) => sum + (deal.value || 0), 0) || 0
    const dealsValueChange = dealsValue - lastMonthDealsValue

    // Tasks Due (this week)
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)

    const { count: tasksDue, error: tasksError } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .in('status', ['pending', 'in_progress'])
      .gte('due_date', weekStart.toISOString())
      .lte('due_date', weekEnd.toISOString())

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError)
    }

    const { count: lastWeekTasks, error: lastWeekTasksError } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .in('status', ['pending', 'in_progress'])
      .gte('due_date', new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .lte('due_date', weekStart.toISOString())

    if (lastWeekTasksError) {
      console.error('Error fetching last week tasks:', lastWeekTasksError)
    }

    const tasksDueChange = (tasksDue || 0) - (lastWeekTasks || 0)

    // Active Clients
    const { count: activeClients, error: clientsError } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('type', 'client')
      .eq('status', 'active')

    if (clientsError) {
      console.error('Error fetching clients:', clientsError)
    }

    const { count: lastMonthClients, error: lastMonthClientsError } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('type', 'client')
      .eq('status', 'active')
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (lastMonthClientsError) {
      console.error('Error fetching last month clients:', lastMonthClientsError)
    }

    const activeClientsChange = (activeClients || 0) - (lastMonthClients || 0)

    // Conversion Rate (leads to deals)
    const { count: totalLeads, error: totalLeadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (totalLeadsError) {
      console.error('Error fetching total leads:', totalLeadsError)
    }

    const { count: convertedLeads, error: convertedLeadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('converted_to_deal', true)
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    if (convertedLeadsError) {
      console.error('Error fetching converted leads:', convertedLeadsError)
    }

    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

    // Previous month conversion rate for comparison
    const prevMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, 1)
    const prevMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 0)

    const { count: prevMonthTotalLeads, error: prevMonthTotalLeadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('created_at', prevMonthStart.toISOString())
      .lte('created_at', prevMonthEnd.toISOString())

    if (prevMonthTotalLeadsError) {
      console.error('Error fetching prev month total leads:', prevMonthTotalLeadsError)
    }

    const { count: prevMonthConvertedLeads, error: prevMonthConvertedLeadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('converted_to_deal', true)
      .gte('created_at', prevMonthStart.toISOString())
      .lte('created_at', prevMonthEnd.toISOString())

    if (prevMonthConvertedLeadsError) {
      console.error('Error fetching prev month converted leads:', prevMonthConvertedLeadsError)
    }

    const prevMonthConversionRate = prevMonthTotalLeads > 0 ? (prevMonthConvertedLeads / prevMonthTotalLeads) * 100 : 0
    const conversionRateChange = conversionRate - prevMonthConversionRate

    return {
      activeListings: activeListings || 0,
      activeListingsChange,
      activeLeads: activeLeads || 0,
      activeLeadsChange,
      dealsValue,
      dealsValueChange,
      tasksDue: tasksDue || 0,
      tasksDueChange,
      activeClients: activeClients || 0,
      activeClientsChange,
      conversionRate,
      conversionRateChange,
    }
  } catch (error) {
    console.error('Error in getCRMDashboardKPIs:', error)
    // Return default values if there's an error
    return {
      activeListings: 0,
      activeListingsChange: 0,
      activeLeads: 0,
      activeLeadsChange: 0,
      dealsValue: 0,
      dealsValueChange: 0,
      tasksDue: 0,
      tasksDueChange: 0,
      activeClients: 0,
      activeClientsChange: 0,
      conversionRate: 0,
      conversionRateChange: 0,
    }
  }
}
