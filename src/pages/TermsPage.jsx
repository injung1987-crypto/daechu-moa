
import React from 'react';
import { Helmet } from 'react-helmet';

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>이용약관 - 대출모아</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">이용약관</h1>
          <p className="text-sm text-gray-500 mb-8">최종 업데이트: 2026년 1월 1일</p>

          <div className="bg-white rounded-2xl shadow-md p-8 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제1조 (목적)</h2>
              <p className="text-sm">
                본 약관은 대출모아(이하 "회사")가 운영하는 대출 중개 광고 플랫폼(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제2조 (서비스의 성격)</h2>
              <p className="text-sm">
                본 서비스는 대출 상품을 직접 취급하거나 중개하는 서비스가 아니며, 등록된 대부중개업체의 광고를 게재하는 광고 플랫폼입니다. 대출 계약은 이용자와 각 등록 업체 사이에서 직접 이루어지며, 회사는 해당 계약의 당사자가 아닙니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제3조 (이용자의 의무)</h2>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>이용자는 서비스를 이용함에 있어 관계 법령 및 본 약관을 준수해야 합니다.</li>
                <li>이용자는 타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.</li>
                <li>이용자는 서비스를 상업적 목적으로 무단 이용해서는 안 됩니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제4조 (책임의 한계)</h2>
              <p className="text-sm">
                회사는 이용자와 등록 업체 간의 대출 거래에 대해 어떠한 보증도 하지 않으며, 거래로 인한 손해에 대해 책임을 지지 않습니다. 대출 계약 전 반드시 해당 업체의 등록 여부를 금융감독원에서 확인하시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제5조 (약관의 변경)</h2>
              <p className="text-sm">
                회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다. 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하실 수 있습니다.
              </p>
            </section>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <strong>주의사항:</strong> 과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 대출 전 상환 능력을 충분히 검토하세요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsPage;
