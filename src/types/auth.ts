export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'CREATOR' | 'STUDENT';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}