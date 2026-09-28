import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-950 via-agro-900 to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-agro-700 transition mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </Link>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-agro-700 flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            <Sprout className="w-7 h-7 text-emerald-300" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tạo Tài Khoản Mới
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Đăng ký để nhận ưu đãi mùa vụ và theo dõi hành trình đơn hàng
          </p>
        </div>

        <RegisterForm />

        <div className="mt-6 text-center pt-6 border-t border-slate-100 text-xs text-slate-600">
          <span>Đã có tài khoản? </span>
          <Link to="/login" className="text-agro-700 hover:text-agro-900 font-bold ml-1">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
