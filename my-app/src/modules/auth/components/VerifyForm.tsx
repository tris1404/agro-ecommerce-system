import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';
import { useToastStore } from '../../../components/common/Toast';

export const VerifyForm: React.FC = () => {
  const location = useLocation();
  const initialEmail = (location.state as any)?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; code?: string }>({});

  const navigate = useNavigate();
  const { verify, isLoading, error } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const validate = (): boolean => {
    const errs: { email?: string; code?: string } = {};

    if (!email) {
      errs.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Email không hợp lệ';
    }

    if (!code) {
      errs.code = 'Vui lòng nhập mã OTP';
    } else if (code.length < 6) {
      errs.code = 'Mã OTP bao gồm 6 chữ số';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await verify(email, code);
      showToast('Kích hoạt tài khoản thành công! Bạn có thể đăng nhập.', 'success');
      navigate('/login');
    } catch {
      // Error in store
    }
  };

  const handleResend = async () => {
    if (!email) {
      showToast('Vui lòng nhập email để gửi lại mã OTP', 'error');
      return;
    }
    setIsResending(true);
    try {
      await authService.resendVerificationCode(email);
      showToast('Mã OTP mới đã được gửi tới email của bạn!', 'success');
    } catch {
      showToast('Không thể gửi lại mã OTP. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl">
        <p className="font-semibold mb-1">📧 Kiểm tra hòm thư Email</p>
        <p>Hệ thống đã gửi mã OTP 6 chữ số tới hộp thư của bạn.</p>
      </div>

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
        type="text"
        label="Mã xác thực OTP (6 chữ số)"
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={errors.code}
        maxLength={6}
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
        Xác Thực Tài Khoản
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-xs text-agro-700 hover:text-agro-900 font-semibold cursor-pointer underline disabled:opacity-50"
        >
          {isResending ? 'Đang gửi...' : 'Chưa nhận được mã? Gửi lại mã OTP'}
        </button>
      </div>
    </form>
  );
};

export default VerifyForm;
