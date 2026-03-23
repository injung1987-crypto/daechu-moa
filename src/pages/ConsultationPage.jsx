
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Phone, MessageSquare, CheckCircle } from 'lucide-react';

function ConsultationPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    loanType: '',
    amount: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.loanType) {
      alert('이름, 연락처, 대출 종류는 필수 입력 항목입니다.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>상담 신청 완료 - 대출모아</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">상담 신청이 완료되었습니다</h1>
            <p className="text-gray-600 mb-8">
              담당자가 영업일 기준 1일 이내에 연락드리겠습니다.<br />
              빠른 상담을 원하시면 고객센터로 직접 연락주세요.
            </p>
            <a
              href="tel:1599-0000"
              className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              <Phone size={20} />
              1599-0000 바로 전화
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>실시간 상담 신청 - 대출모아</title>
        <meta name="description" content="대출 상담을 신청하세요. 담당자가 빠르게 연락드립니다." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">실시간 상담 신청</h1>
            <p className="text-gray-600">정보를 입력하시면 담당자가 빠르게 연락드립니다</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  대출 종류 <span className="text-red-500">*</span>
                </label>
                <select
                  name="loanType"
                  value={form.loanType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">선택해주세요</option>
                  <option value="직장인대출">직장인대출</option>
                  <option value="신용대출">신용대출</option>
                  <option value="사업자대출">사업자대출</option>
                  <option value="담보대출">담보대출</option>
                  <option value="무직자대출">무직자대출</option>
                  <option value="소액대출">소액대출</option>
                  <option value="전세대출">전세대출</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  희망 대출 금액
                </label>
                <select
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">선택해주세요</option>
                  <option value="100만원 이하">100만원 이하</option>
                  <option value="100~500만원">100~500만원</option>
                  <option value="500만~1,000만원">500만~1,000만원</option>
                  <option value="1,000만~3,000만원">1,000만~3,000만원</option>
                  <option value="3,000만~5,000만원">3,000만~5,000만원</option>
                  <option value="5,000만원 이상">5,000만원 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상담 내용 (선택)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="상담 받고 싶은 내용을 자유롭게 입력해주세요"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900 resize-none"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                ※ 입력하신 정보는 상담 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-bold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <MessageSquare size={22} />
                상담 신청하기
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-3">빠른 상담을 원하신다면 직접 전화주세요</p>
            <a
              href="tel:1599-0000"
              className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              <Phone size={20} />
              1599-0000
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConsultationPage;
