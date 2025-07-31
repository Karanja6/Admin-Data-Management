import React from 'react';
import { User } from '../../App';

export function UploadCenter({ user }: { user: User }) {
  return <div>Upload Center for {user.name}</div>;
}
