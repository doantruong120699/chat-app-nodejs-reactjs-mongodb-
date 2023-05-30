import { User } from './user';

export interface Post {
  id?: string;
  caption?: string;
  likes?: number;
  comments?: number;
  share?: number;
  status?: number;
  privacy?: number;
  photos?: Photo[];
  owner?: User;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Photo {
  id?: string;
  caption?: string;
  url?: string;
  height?: number;
  width?: number;
  likes?: number;
  comments?: number;
  share?: number;
  status?: number;
  privacy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
