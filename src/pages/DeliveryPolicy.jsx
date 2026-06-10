import React from 'react';

const DeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Delivery Policy</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          At WarmHut, we are committed to delivering your premium winter wear quickly and securely. We partner with reliable delivery services to ensure your order reaches you in perfect condition.
        </p>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              Delivery Times & Costs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Inside Dhaka</h4>
                <p className="text-sm text-gray-600 mb-2">Delivery Time: 1-2 Business Days</p>
                <p className="text-sm text-gray-600">Delivery Charge: <span className="font-bold text-gray-900">BDT 60</span></p>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Outside Dhaka</h4>
                <p className="text-sm text-gray-600 mb-2">Delivery Time: 3-5 Business Days</p>
                <p className="text-sm text-gray-600">Delivery Charge: <span className="font-bold text-gray-900">BDT 120</span></p>
              </div>
            </div>
            <p className="text-sm text-olive font-bold mt-4">🎉 Free Delivery on all orders above BDT 1000!</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              Order Tracking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Once your order is dispatched, you will receive an SMS with your tracking number and a link to track your package in real-time.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-x-2">
              <span className="w-2 h-6 bg-olive rounded-full inline-block"></span>
              Failed Deliveries
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our delivery partner will attempt to deliver your package twice. If you are unavailable, the package will be returned to us. In such cases, re-delivery might incur additional charges. Please ensure your contact number is active.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPolicy;
