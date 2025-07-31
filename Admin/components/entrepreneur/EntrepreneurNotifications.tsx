import React from 'react';
import { User } from '../../App';

export function EntrepreneurNotifications({ user }: { user: User }) {
  return <div>Notifications for {user.name}</div>;
}
