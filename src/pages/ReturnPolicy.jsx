import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto prose prose-olive">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Return & Refund Policy</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          At WarmHut, customer satisfaction is our top priority. We understand that sometimes a product might not meet your expectations, which is why we offer a straightforward and hassle-free return policy.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4">7-Day Return Guarantee</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          You can return any unworn, unwashed, and undamaged product within 7 days of delivery. The item must have all original tags and packaging intact.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Conditions for Return</h3>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>The product must be unused and in the same condition that you received it.</li>
          <li>It must be in the original packaging.</li>
          <li>A valid receipt or proof of purchase is required.</li>
          <li>Discounted or promotional items may not be eligible for standard returns.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-4">How to Initiate a Return</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          To initiate a return, please contact our customer support team at <strong>warmhutbd@gmail.com</strong> or call us at <strong>01715825331</strong>. Please provide your Order ID and the reason for the return. Our team will guide you through the process.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Refund Process</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed and automatically applied to your original method of payment within 5-7 business days.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
