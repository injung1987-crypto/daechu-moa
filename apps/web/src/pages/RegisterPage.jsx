
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, CheckCircle } from 'lucide-react';

function RegisterPage() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    registrationNumber: '',
    businessNumber: '',
    region: '',
    loanTypes: [],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const loanTypeOptions = ['직장인대출', '신용대출', '사업자대출', '담보대출', '무직자대출', '소액대출', '전세대출'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoanTypeToggle = (type) => {
    setForm((prev) => ({
      ...prev,
      loanTypes: prev.loanTypes.includes(type)
        ? prev.loanTypes.filter((t) => t !== type)
        : [...prev.loanTypes, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.companyName || !form.contactName || !form.phone || !form.registrationNumber) {
      alert('업체명, 담당자명, 연락처, 등록번호는 필수 항목입니다.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>업체 등록 신청 완료 - 대출모아</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">업체 등록 신청이 완료되었습니다</h1>
            <p className="text-gray-600 mb-2">
              검토 후 영업일 기준 2~3일 이내에 연락드리겠습니다.
            </p>
            <p className="text-sm text-gray-500">등록 관련 문의: 1599-0000</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>업체 등록 신청 - 대출모아</title>
        <meta name="description" content="대출모아에 업체를 등록하고 더 많은 고객을 만나보세요." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="text-[#1a5fd1]" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">업체 등록 신청</h1>
            <p className="text-gray-600">등록 후 검토를 거쳐 플랫폼에 노출됩니다</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <h2 className="font-semibold text-blue-900 mb-2">등록 안내</h2>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>대부중개업 등록업체만 신청 가능합니다</li>
              <li>허위 정보 기재 시 등록이 취소될 수 있습니다</li>
              <li>광고 게재 비용은 별도 문의 바랍니다</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  업체명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="예: 서울금융대부중개"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={form.contactName}
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
                  placeholder="02-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  대부중개업 등록번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  placeholder="예: 2024-서울강남-0001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  사업자등록번호
                </label>
                <input
                  type="text"
                  name="businessNumber"
                  value={form.businessNumber}
                  onChange={handleChange}
                  placeholder="000-00-00000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지역
                </label>
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">선택해주세요</option>
                  {['서울','경기','인천','부산','대구','울산','광주','대전','세종','강원','충북','충남','전북','전남','경북','경남','제주'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  취급 대출 상품 (복수 선택)
                </label>
                <div className="flex flex-wrap gap-2">
                  {loanTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleLoanTypeToggle(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        form.loanTypes.includes(type)
                          ? 'bg-[#1a5fd1] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  추가 문의사항
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="등록 관련 문의사항을 입력해주세요"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f5a623] hover:bg-[#e09615] text-white font-bold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <Building2 size={22} />
                업체 등록 신청
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
