import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);
  const { t } = useI18n();

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {};

    if (!email) {
      errs.email = 'Vui lòng nhập địa chỉ email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Email không hợp lệ';
    }

    if (!password) {
      errs.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      errs.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login({ email, password });
      showToast('Đăng nhập thành công!', 'success');
      navigate('/');
    } catch {
      // Error displayed from authStore
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

      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-slate-600">
          <input type="checkbox" className="rounded text-agro-600 focus:ring-agro-500" defaultChecked />
          <span>Ghi nhớ đăng nhập</span>
        </label>
        <a href="#forgot" className="text-agro-700 hover:text-agro-800 font-medium">
          Quên mật khẩu?
        </a>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
        {t('login')}
      </Button>

      {/* Demo Credentials Hint */}
      <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">Tài khoản thử nghiệm hệ thống:</p>
        <p>• Admin: <code className="text-agro-700 font-mono">admin@agrocare.vn</code> / <code className="text-agro-700 font-mono">admin123</code></p>
        <p>• Khách hàng: <code className="text-agro-700 font-mono">user@agrocare.vn</code> / <code className="text-agro-700 font-mono">user123</code></p>
      </div>
    </form>
  );
};

export default LoginForm;
