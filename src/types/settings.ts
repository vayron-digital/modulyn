// =====================================================
// US Associate SaaS - Settings Types
// =====================================================

export type Theme = 'light' | 'dark' | 'system'
export type ColorScheme = 'indigo' | 'blue' | 'green' | 'purple' | 'orange' | 'red'
export type FontSize = 'small' | 'medium' | 'large'
export type DashboardLayout = 'default' | 'compact' | 'detailed'
export type DefaultView = 'overview' | 'analytics' | 'recent'
export type EmailFrequency = 'immediate' | 'daily' | 'weekly'
export type ProfileVisibility = 'public' | 'private' | 'team'
export type ActivityVisibility = 'public' | 'private' | 'team'
export type TimeFormat = '12h' | '24h'
export type BackupFrequency = 'hourly' | 'daily' | 'weekly'
export type NotificationFrequency = 'immediate' | 'daily' | 'weekly' | 'never'
export type UserMode = 'trade' | 'crm'
export type OrganizationSize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+'
export type SubscriptionStatus = 'active' | 'inactive' | 'suspended' | 'cancelled'
export type UserRole = 'owner' | 'admin' | 'manager' | 'member' | 'viewer'

// Subscription and Access Control Types
export type SubscriptionPlan = 'remp-momentum' | 'remp-arbor' | 'ams-starter' | 'ams-ethos'
export type SolutionAccess = 'crm' | 'ams'

// =====================================================
// USER SETTINGS TYPES
// =====================================================

export interface UserSettings {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  
  // Profile Settings
  first_name?: string
  last_name?: string
  display_name?: string
  bio?: string
  avatar_url?: string
  phone?: string
  timezone: string
  language: string
  
  // Account Settings
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  two_factor_enabled: boolean
  last_login?: string
  
  // Appearance Settings
  theme: Theme
  color_scheme: ColorScheme
  font_size: FontSize
  compact_mode: boolean
  sidebar_collapsed: boolean
  
  // Dashboard Settings
  dashboard_layout: DashboardLayout
  default_view: DefaultView
  show_welcome_message: boolean
  auto_refresh_interval: number
  
  // Notification Settings
  email_frequency: EmailFrequency
  notification_sound: boolean
  desktop_notifications: boolean
  mobile_notifications: boolean
  
  // Privacy Settings
  profile_visibility: ProfileVisibility
  activity_visibility: ActivityVisibility
  data_sharing: boolean
  
  // Security Settings
  session_timeout: number
  password_expiry_days: number
  failed_login_attempts: number
  account_locked: boolean
  lock_until?: string
  
  // Integration Settings
  google_calendar_sync: boolean
  outlook_calendar_sync: boolean
  slack_integration: boolean
  zapier_integration: boolean
  
  // CRM/AMS Specific Settings
  mode: UserMode
  default_currency: string
  date_format: string
  time_format: TimeFormat
  
  // Workflow Settings
  auto_save_interval: number
  auto_backup_enabled: boolean
  backup_frequency: BackupFrequency
  
  // API Settings
  api_key?: string
  api_key_expires_at?: string
  webhook_url?: string
  webhook_secret?: string
  
  // Custom Fields
  custom_preferences: Record<string, any>
  
  // Subscription and Access Control
  subscription_plan?: SubscriptionPlan
  access_permissions?: SolutionAccess[]
  subscription_status?: SubscriptionStatus
  subscription_expires_at?: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
}

export interface UserSettingsUpdate {
  // Profile Settings
  first_name?: string
  last_name?: string
  display_name?: string
  bio?: string
  avatar_url?: string
  phone?: string
  timezone?: string
  language?: string
  
  // Account Settings
  email_notifications?: boolean
  push_notifications?: boolean
  marketing_emails?: boolean
  two_factor_enabled?: boolean
  
  // Appearance Settings
  theme?: Theme
  color_scheme?: ColorScheme
  font_size?: FontSize
  compact_mode?: boolean
  sidebar_collapsed?: boolean
  
  // Dashboard Settings
  dashboard_layout?: DashboardLayout
  default_view?: DefaultView
  show_welcome_message?: boolean
  auto_refresh_interval?: number
  
  // Notification Settings
  email_frequency?: EmailFrequency
  notification_sound?: boolean
  desktop_notifications?: boolean
  mobile_notifications?: boolean
  
  // Privacy Settings
  profile_visibility?: ProfileVisibility
  activity_visibility?: ActivityVisibility
  data_sharing?: boolean
  
  // Security Settings
  session_timeout?: number
  password_expiry_days?: number
  
  // Integration Settings
  google_calendar_sync?: boolean
  outlook_calendar_sync?: boolean
  slack_integration?: boolean
  zapier_integration?: boolean
  
  // CRM/AMS Specific Settings
  mode?: UserMode
  default_currency?: string
  date_format?: string
  time_format?: TimeFormat
  
  // Workflow Settings
  auto_save_interval?: number
  auto_backup_enabled?: boolean
  backup_frequency?: BackupFrequency
  
  // Custom Fields
  custom_preferences?: Record<string, any>
  
  // Subscription and Access Control
  subscription_plan?: SubscriptionPlan
  access_permissions?: SolutionAccess[]
  subscription_status?: SubscriptionStatus
  subscription_expires_at?: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
}

// =====================================================
// ORGANIZATION TYPES
// =====================================================

export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  website_url?: string
  industry?: string
  size?: OrganizationSize
  founded_year?: number
  created_at: string
  updated_at: string
  
  // Contact Information
  contact_email?: string
  contact_phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  postal_code?: string
  country: string
  
  // Billing Information
  billing_email?: string
  billing_address?: Record<string, any>
  tax_id?: string
  
  // Subscription Information
  subscription_plan: string
  subscription_status: SubscriptionStatus
  subscription_start_date?: string
  subscription_end_date?: string
  next_billing_date?: string
  
  // Organization Settings
  timezone: string
  working_hours: Record<string, any>
  holidays: any[]
  
  // Feature Flags
  features_enabled: Record<string, any>
  custom_domain?: string
  white_label_enabled: boolean
  
  // Limits and Quotas
  max_users: number
  max_storage_gb: number
  api_rate_limit: number
  
  // Custom Fields
  custom_fields: Record<string, any>
}

export interface OrganizationUpdate {
  name?: string
  description?: string
  logo_url?: string
  website_url?: string
  industry?: string
  size?: OrganizationSize
  founded_year?: number
  
  // Contact Information
  contact_email?: string
  contact_phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  
  // Billing Information
  billing_email?: string
  billing_address?: Record<string, any>
  tax_id?: string
  
  // Organization Settings
  timezone?: string
  working_hours?: Record<string, any>
  holidays?: any[]
  
  // Feature Flags
  features_enabled?: Record<string, any>
  custom_domain?: string
  white_label_enabled?: boolean
  
  // Custom Fields
  custom_fields?: Record<string, any>
}

// =====================================================
// USER ORGANIZATION TYPES
// =====================================================

export interface UserOrganization {
  id: string
  user_id: string
  organization_id: string
  role: UserRole
  permissions: Record<string, any>
  joined_at: string
  is_primary: boolean
}

export interface UserOrganizationUpdate {
  role?: UserRole
  permissions?: Record<string, any>
  is_primary?: boolean
}

// =====================================================
// USER PREFERENCES TYPES
// =====================================================

export interface UserPreference {
  id: string
  user_id: string
  preference_key: string
  preference_value: any
  created_at: string
  updated_at: string
}

export interface UserPreferenceUpdate {
  preference_value: any
}

// =====================================================
// NOTIFICATION SETTINGS TYPES
// =====================================================

export interface NotificationSetting {
  id: string
  user_id: string
  notification_type: string
  email_enabled: boolean
  push_enabled: boolean
  in_app_enabled: boolean
  frequency: NotificationFrequency
  created_at: string
  updated_at: string
}

export interface NotificationSettingUpdate {
  email_enabled?: boolean
  push_enabled?: boolean
  in_app_enabled?: boolean
  frequency?: NotificationFrequency
}

// =====================================================
// SETTINGS SECTIONS TYPES
// =====================================================

export interface ProfileSettings {
  first_name?: string
  last_name?: string
  display_name?: string
  bio?: string
  avatar_url?: string
  phone?: string
  timezone: string
  language: string
}

export interface AppearanceSettings {
  theme: Theme
  color_scheme: ColorScheme
  font_size: FontSize
  compact_mode: boolean
  sidebar_collapsed: boolean
}

export interface NotificationSettings {
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  email_frequency: EmailFrequency
  notification_sound: boolean
  desktop_notifications: boolean
  mobile_notifications: boolean
}

export interface PrivacySettings {
  profile_visibility: ProfileVisibility
  activity_visibility: ActivityVisibility
  data_sharing: boolean
}

export interface SecuritySettings {
  two_factor_enabled: boolean
  session_timeout: number
  password_expiry_days: number
}

export interface IntegrationSettings {
  google_calendar_sync: boolean
  outlook_calendar_sync: boolean
  slack_integration: boolean
  zapier_integration: boolean
}

export interface WorkflowSettings {
  auto_save_interval: number
  auto_backup_enabled: boolean
  backup_frequency: BackupFrequency
}

export interface CRMSettings {
  mode: UserMode
  default_currency: string
  date_format: string
  time_format: TimeFormat
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface SettingsApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface SettingsListResponse<T> {
  data: T[]
  count: number
  error?: string
}

// =====================================================
// SETTINGS CONSTANTS
// =====================================================

export const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export const COLOR_SCHEME_OPTIONS: { value: ColorScheme; label: string; color: string }[] = [
  { value: 'indigo', label: 'Indigo', color: '#4F46E5' },
  { value: 'blue', label: 'Blue', color: '#2563EB' },
  { value: 'green', label: 'Green', color: '#059669' },
  { value: 'purple', label: 'Purple', color: '#7C3AED' },
  { value: 'orange', label: 'Orange', color: '#EA580C' },
  { value: 'red', label: 'Red', color: '#DC2626' },
]

export const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

export const DASHBOARD_LAYOUT_OPTIONS: { value: DashboardLayout; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'compact', label: 'Compact' },
  { value: 'detailed', label: 'Detailed' },
]

export const DEFAULT_VIEW_OPTIONS: { value: DefaultView; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'recent', label: 'Recent Activity' },
]

export const EMAIL_FREQUENCY_OPTIONS: { value: EmailFrequency; label: string }[] = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'daily', label: 'Daily Digest' },
  { value: 'weekly', label: 'Weekly Digest' },
]

export const PROFILE_VISIBILITY_OPTIONS: { value: ProfileVisibility; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'team', label: 'Team Only' },
]

export const ACTIVITY_VISIBILITY_OPTIONS: { value: ActivityVisibility; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'team', label: 'Team Only' },
]

export const TIME_FORMAT_OPTIONS: { value: TimeFormat; label: string }[] = [
  { value: '12h', label: '12-hour (AM/PM)' },
  { value: '24h', label: '24-hour' },
]

export const BACKUP_FREQUENCY_OPTIONS: { value: BackupFrequency; label: string }[] = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
]

export const NOTIFICATION_FREQUENCY_OPTIONS: { value: NotificationFrequency; label: string }[] = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'never', label: 'Never' },
]

export const USER_MODE_OPTIONS: { value: UserMode; label: string }[] = [
  { value: 'trade', label: 'Trade Association' },
  { value: 'crm', label: 'Real Estate CRM' },
]

export const ORGANIZATION_SIZE_OPTIONS: { value: OrganizationSize; label: string }[] = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
]

export const USER_ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'member', label: 'Member' },
  { value: 'viewer', label: 'Viewer' },
]

export const SUBSCRIPTION_PLAN_OPTIONS: { value: SubscriptionPlan; label: string; description: string }[] = [
  { value: 'remp-momentum', label: 'REMP Momentum', description: 'The essential CRM for growing your real estate business. ($8.75/user/month)' },
  { value: 'remp-arbor', label: 'REMP Arbor', description: 'The all-in-one solution for top-performing brokerages. ($20.00/user/month)' },
  { value: 'ams-starter', label: 'AMS Starter', description: 'Streamline your association\'s member and event management. ($11.00/user/month)' },
  { value: 'ams-ethos', label: 'AMS Ethos', description: 'The comprehensive platform for professional associations. ($22.00/user/month)' },
]

export const SOLUTION_ACCESS_OPTIONS: { value: SolutionAccess; label: string; description: string }[] = [
  { value: 'crm', label: 'Real Estate CRM', description: 'Property management and client database' },
  { value: 'ams', label: 'Trade Association', description: 'Member management and event organization' },
]

export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'CAD', label: 'Canadian Dollar (C$)' },
  { value: 'AUD', label: 'Australian Dollar (A$)' },
]

export const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY' },
]

export const TIMEZONE_OPTIONS = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time' },
  { value: 'America/Chicago', label: 'Central Time' },
  { value: 'America/Denver', label: 'Mountain Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Australia/Sydney', label: 'Sydney' },
]

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
]
