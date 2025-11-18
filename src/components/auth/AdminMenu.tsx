'use client';

import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';

function AdminMenu() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          href="/dashboard/products"
          label="Dashboard"
          labelIcon={<LayoutDashboard size="sm" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}

export default AdminMenu;
