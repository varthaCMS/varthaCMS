export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          featured_image: string | null
          id: number
          modified_at: string | null
          slug: string | null
          status: string | null
          title: string | null
          topics: string[] | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: number
          modified_at?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          topics?: string[] | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: number
          modified_at?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          topics?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
