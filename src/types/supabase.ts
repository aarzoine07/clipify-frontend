export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          workspace_id: string;
          status: string;
          source_type: string | null;
          source_url: string | null;
          storage_path: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          status?: string;
          source_type?: string | null;
          source_url?: string | null;
          storage_path?: string | null;
        };
        Update: {
          status?: string;
          source_type?: string | null;
          source_url?: string | null;
          storage_path?: string | null;
        };
      };
    };
  };
}

