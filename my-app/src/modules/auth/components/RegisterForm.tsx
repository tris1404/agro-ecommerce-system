import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);
  const { t } = useI18n();

  const validate = (): boolean => {
    const errs: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!username.trim()) {
      errs.username = 'Tên tài khoản không được để trống';
    } else if (username.length < 3) {
      errs.username = 'Tên tài khoản tối thiểu 3 ký tự';
    }

    if (!email) {
      errs.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Email không hợp lệ';
    }

    if (!password) {
      errs.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      errs.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({ username, email, password });
      showToast('Đăng ký thành công! Vui lòng nhập mã xác thực OTP.', 'success');
      navigate('/verify', { state: { email } });
    } catch {
      // Error handled by store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      <Input
        type="text"
        label="Tên tài khoản"
        placeholder="nongdan99"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        required
      />

      <Input
        type="email"
        label="Email"
        placeholder="nongdan@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />

      <Input
        type="password"
        label="Mật khẩu"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />

      <Input
        type="password"
        label="Xác nhận mật khẩu"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
        {t('register')}
      </Button>
    </form>
  );
};

export default RegisterForm;
