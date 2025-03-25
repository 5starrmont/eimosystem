export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      house_status_history: {
        Row: {
          changed_by: string | null
          created_at: string | null
          house_id: string | null
          id: string
          new_status: string
          previous_status: string
          reason: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          house_id?: string | null
          id?: string
          new_status: string
          previous_status: string
          reason?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          house_id?: string | null
          id?: string
          new_status?: string
          previous_status?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "house_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "house_status_history_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      houses: {
        Row: {
          created_at: string | null
          features: Json | null
          house_number: string
          id: string
          kplc_meter_number: string
          last_maintenance_date: string | null
          next_maintenance_date: string | null
          rent_amount: number
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          house_number: string
          id?: string
          kplc_meter_number: string
          last_maintenance_date?: string | null
          next_maintenance_date?: string | null
          rent_amount: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          house_number?: string
          id?: string
          kplc_meter_number?: string
          last_maintenance_date?: string | null
          next_maintenance_date?: string | null
          rent_amount?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      maintenance_history: {
        Row: {
          created_at: string | null
          id: string
          maintenance_request_id: string | null
          notes: string | null
          status: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          maintenance_request_id?: string | null
          notes?: string | null
          status: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          maintenance_request_id?: string | null
          notes?: string | null
          status?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_history_maintenance_request_id_fkey"
            columns: ["maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_history_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          created_at: string | null
          description: string
          house_id: string | null
          id: string
          reported_by: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          house_id?: string | null
          id?: string
          reported_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          house_id?: string | null
          id?: string
          reported_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string
          payment_period: string
          payment_reference: string
          payment_type: string
          penalty_amount: number | null
          rent_amount: number | null
          status: string
          tenant_id: string | null
          water_amount: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_period: string
          payment_reference: string
          payment_type: string
          penalty_amount?: number | null
          rent_amount?: number | null
          status?: string
          tenant_id?: string | null
          water_amount?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_period?: string
          payment_reference?: string
          payment_type?: string
          penalty_amount?: number | null
          rent_amount?: number | null
          status?: string
          tenant_id?: string | null
          water_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          active: boolean | null
          created_at: string | null
          day_of_month: number
          id: string
          message_template: string
          type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          day_of_month: number
          id?: string
          message_template: string
          type: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          day_of_month?: number
          id?: string
          message_template?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          created_at: string | null
          house_id: string | null
          id: string
          move_in_date: string
          move_out_date: string | null
          rent_share_percentage: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          house_id?: string | null
          id?: string
          move_in_date: string
          move_out_date?: string | null
          rent_share_percentage?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          house_id?: string | null
          id?: string
          move_in_date?: string
          move_out_date?: string | null
          rent_share_percentage?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_login: string | null
          phone_number: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          last_login?: string | null
          phone_number: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login?: string | null
          phone_number?: string
          role?: string
        }
        Relationships: []
      }
      water_bills: {
        Row: {
          amount: number
          created_at: string | null
          house_id: string | null
          id: string
          month: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          house_id?: string | null
          id?: string
          month: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          house_id?: string | null
          id?: string
          month?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "water_bills_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_total_payment: {
        Args: {
          p_rent_amount: number
          p_water_amount: number
          p_penalty_amount: number
        }
        Returns: number
      }
      update_house_status: {
        Args: {
          p_house_id: string
          p_new_status: string
          p_reason?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
