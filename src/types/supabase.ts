export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          type: string
          billing_email: string
          address: Json
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          billing_email: string
          address: Json
          subscription_tier: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          billing_email?: string
          address?: Json
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          organization_id: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          organization_id: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          organization_id?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          organization_id: string
          plan: string
          status: string
          current_period_end: string
          amount: number
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          plan: string
          status: string
          current_period_end: string
          amount: number
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          plan?: string
          status?: string
          current_period_end?: string
          amount?: number
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          organization_id: string
          title: string
          description: string
          start_date: string
          end_date: string
          venue: string
          capacity: number
          price: number
          registration_deadline: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          title: string
          description: string
          start_date: string
          end_date: string
          venue: string
          capacity: number
          price: number
          registration_deadline: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          title?: string
          description?: string
          start_date?: string
          end_date?: string
          venue?: string
          capacity?: number
          price?: number
          registration_deadline?: string
          created_at?: string
          updated_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: string
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status: string
          payment_status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      email_templates: {
        Row: {
          id: string
          name: string
          subject: string
          content: string
          variables: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string
          content: string
          variables: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          content?: string
          variables?: Json
          created_at?: string
          updated_at?: string
        }
      }
      email_campaigns: {
        Row: {
          id: string
          template_id: string
          recipient_group_id: string
          status: string
          scheduled_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id: string
          recipient_group_id: string
          status: string
          scheduled_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          recipient_group_id?: string
          status?: string
          scheduled_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
