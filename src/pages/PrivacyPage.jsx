
import React from 'react';
import { Helmet } from 'react-helmet';

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>개인정보처리방침 - 대출모아</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
          <p className="text-sm text-gray-500 mb-8">최종 업데이트: 2026년 1월 1일</p>

          <div className="bg-white rounded-2xl shadow-md p-8 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. 수집하는 개인정보 항목</h2>
              <p className="text-sm mb-2">회사는 상담 신청 시 아래의 개인정보를 수집합니다.</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>필수항목: 이름, 연락처, 대출 종류</li>
                <li>선택항목: 희망 대출 금액, 상담 내용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. 개인정보의 수집 및 이용 목적</h2>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>대출 상담 신청 접수 및 처리</li>
                <li>상담 결과 회신을 위한 연락</li>
                <li>서비스 개선을 위한 통계 분석 (개인 식별 불가 형태)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
              <p className="text-sm">
                수집된 개인정보는 상담 완료 후 6개월간 보관되며, 이후 즉시 파기됩니다. 단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
              <p className="text-sm">
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 이용자가 직접 특정 업체에 상담을 요청하는 경우, 해당 업체에 필요 최소한의 정보가 전달될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. 개인정보 보호 책임자</h2>
              <div className="text-sm bg-gray-50 rounded-lg p-4">
                <p>책임자: 대출모아 개인정보보호팀</p>
                <p>연락처: 1599-0000</p>
                <p>이메일: privacy@daechu-moa.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. 이용자의 권리</h2>
              <p className="text-sm">
                이용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 고객센터(1599-0000)를 통해 접수하실 수 있습니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPage;
