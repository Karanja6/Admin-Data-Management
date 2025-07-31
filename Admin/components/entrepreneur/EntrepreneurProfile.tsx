import React from 'react';
import { User } from '../../App';

export function EntrepreneurProfile({ user, onUserUpdate }: { user: User; onUserUpdate: (user: User) => void }) {
  return <div>Entrepreneur Profile page for {user.name}</div>;
}
