// User type definition for the application
export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

// User interface/type definition
export const createUser = (userData = {}) => ({
  id: userData.id || '',
  name: userData.name || '',
  email: userData.email || '',
  role: userData.role || UserRoles.USER,
  avatar: userData.avatar || '',
  isActive: userData.isActive || true,
  createdAt: userData.createdAt || new Date().toISOString(),
  lastLogin: userData.lastLogin || null,
  preferences: userData.preferences || {},
  ...userData
});