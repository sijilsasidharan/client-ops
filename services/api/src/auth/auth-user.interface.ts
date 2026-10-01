// auth/auth-user.interface.ts
export interface AuthUser {
  userId: string;
  email: string;
  organizationId: string;
  role: 'OWNER' | 'MEMBER'; // matches your Role enum
}
