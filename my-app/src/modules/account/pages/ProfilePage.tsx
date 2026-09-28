import React, { useState } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import AccountSidebar from '../components/AccountSidebar';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuthStore } from '../../auth/store/authStore';
import { useToastStore } from '../../../components/common/Toast';
import { User, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useI18n } from '../../../i18n';

export const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);
  const { t } = useI18n();

  const [fullName, setFullName] = useState(user?.fullName || 'Nguyễn Văn Năm');
  const [email] = useState(user?.email || 'nongdan@gmail.com');
  const [phone, setPhone] = useState('0918123456');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      if (user) {
        setUser({ ...user, fullName });
      }
      setIsSaving(false);
      showToast('Cập nhật hồ sơ thành công!', 'success');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                {t('myProfile')}
              </h1>
              <p className="text-xs text-slate-500 mb-6">
                Quản lý thông tin cá nhân và số điện thoại liên lạc để nhận thông báo mùa vụ
              </p>

              <form onSubmit={handleSave} className="space-y-5 max-w-xl">
                <Input
                  label="Họ và tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Email (Không thể thay đổi)"
                  value={email}
                  disabled
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <Input
                  label="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4" />}
                  required
                />

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    Tài khoản của bạn đã được xác thực bảo mật và bảo hộ quyền lợi mua vật tư chính hãng.
                  </span>
                </div>

                <Button type="submit" isLoading={isSaving} size="md">
                  {t('save')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
