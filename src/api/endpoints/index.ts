export const ENDPOINTS = {
  // auth endpoints
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  // post endpoints
  POSTS: {
    BASE: "/posts",
    BY_ID: (id: string) => `/posts/${id}`,
    PUBLISH: (id: string) => `/posts/${id}/publish`,
  },

  // admin endpoints
  ADMIN: {
    USERS: "/admin/users",
    USER_PERMISSION: (id: string) => `/admin/users/${id}/permission`,
  },
} as const;
