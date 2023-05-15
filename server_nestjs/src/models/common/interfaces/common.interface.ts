export interface ICommon {
  id: number | string;
}

export interface IDateTime extends ICommon {
  created_at: Date;
  updated_at: Date;
}

export interface ISoftDelete {
  is_delete: boolean;
}
