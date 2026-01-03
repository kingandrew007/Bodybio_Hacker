export type UserRole = 'guest' | 'user' | 'admin' | 'super_admin';

export interface UserSession {
  id: string;
  role: UserRole;
  name?: string;
}