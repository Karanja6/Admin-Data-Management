import React from 'react';
import { User } from '../../App';

export function MyApplication({ user, onUserUpdate }: { user: User; onUserUpdate: (user: User) => void }) {
  return <div>This is the My Application page for {user.name}.</div>;
}
