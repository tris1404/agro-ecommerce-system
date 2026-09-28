import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, ClipboardList, MapPin, KeyRound, LogOut } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';
import { useI18n } from '../../../i18n';

export const AccountSidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { t } = useI18n();

  const links = [
    { to: '/account/profile', label: t('myProfile'), icon: <User className="w-4 h-4" /> },
    { to: '/account/orders', label: t('orderHistory'), icon: <ClipboardList className="w-4 h-4" /> },
    { to: '/account/addresses', label: t('addressBook'), icon: <MapPin className="w-4 h-4" /> },
    { to: '/account/password', label: t('changePassword'), icon: <KeyRound className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-6">
      {/* User Info Snippet */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-agro-100 text-agro-800 flex items-center justify-center font-bold text-base border border-agro-300">
          {user?.username?.substring(0, 2).toUpperCase() || 'U'}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-slate-900 truncate">{user?.fullName || user?.username}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Nav list */}
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition
              ${isActive
                ? 'bg-agro-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer text-left mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </nav>
    </div>
  );
};

export default AccountSidebar;
