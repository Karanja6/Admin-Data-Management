import React from 'react';
import { User } from '../../App';

export function TrackReports({ user }: { user: User }) {
  return <div>Track Reports for {user.name}</div>;
}
