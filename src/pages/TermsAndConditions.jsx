import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Terms & Conditions</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Welcome to WarmHut. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.
        </p>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              1. General Use
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our website provides an online e-commerce platform that allows you to browse and purchase premium winter wear. We reserve the right to modify or discontinue any product or service without notice at any time.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              2. Pricing & Availability
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All prices are listed in Bangladeshi Taka (BDT) and are subject to change without notice. We make every effort to display accurate stock information, but occasionally an item may be out of stock after an order is placed. In such cases, we will contact you immediately to process a refund or offer an alternative.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              3. User Accounts
            </h3>
            <p className="text-gray-600 leading-relaxed">
              When you create an account with us, you guarantee that the information you provide is accurate and current. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              4. Dispute Resolution
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Any disputes arising from the use of our platform or from product purchases will be governed by the laws of Bangladesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
