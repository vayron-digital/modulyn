import { useQuery } from '@tanstack/react-query'
import { getTradeDashboardKPIs, getCRMDashboardKPIs } from '@/services/dashboard'
import { useSettingsUserMode } from '@/store/use-settings-store'

export function useDashboardKPIs() {
  const userMode = useSettingsUserMode()

  const {
    data: tradeKPIs,
    isLoading: tradeLoading,
    error: tradeError,
    refetch: refetchTrade
  } = useQuery({
    queryKey: ['trade-dashboard-kpis'],
    queryFn: getTradeDashboardKPIs,
    enabled: userMode === 'trade',
    retry: 1, // Limit retries to prevent infinite loops
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const {
    data: crmKPIs,
    isLoading: crmLoading,
    error: crmError,
    refetch: refetchCRM
  } = useQuery({
    queryKey: ['crm-dashboard-kpis'],
    queryFn: getCRMDashboardKPIs,
    enabled: userMode === 'crm',
    retry: 1, // Limit retries to prevent infinite loops
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    tradeKPIs: tradeKPIs || {
      totalMembers: 0,
      totalMembersChange: 0,
      activeEvents: 0,
      activeEventsChange: 0,
      revenue: 0,
      revenueChange: 0,
      activeCampaigns: 0,
      activeCampaignsChange: 0,
    },
    crmKPIs: crmKPIs || {
      totalLeads: 0,
      totalLeadsChange: 0,
      activeDeals: 0,
      activeDealsChange: 0,
      revenue: 0,
      revenueChange: 0,
      activeClients: 0,
      activeClientsChange: 0,
      conversionRate: 0,
      conversionRateChange: 0,
    },
    isLoading: userMode === 'trade' ? tradeLoading : crmLoading,
    error: userMode === 'trade' ? tradeError : crmError,
    refetch: userMode === 'trade' ? refetchTrade : refetchCRM,
  }
}
