// User type definition for the application
export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

// Default user structure
export const createUser = (userData = {}) => ({
  id: userData.id || '',
  name: userData.name || '',
  email: userData.email || '',
  role: userData.role || UserRoles.USER,
  avatar: userData.avatar || '',
  preferences: userData.preferences || {},
  ...userData
});