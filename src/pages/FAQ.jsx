import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Delivery within Dhaka takes 1-2 business days. Outside Dhaka, it typically takes 3-5 business days depending on the courier service.'
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 7-day hassle-free return policy. If you are not satisfied with your purchase, you can return it within 7 days of receiving it in its original condition.'
  },
  {
    q: 'Do you offer cash on delivery (COD)?',
    a: 'Yes! We offer Cash on Delivery all over Bangladesh.'
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, you can view the live status from your User Dashboard under the "Orders" section.'
  },
  {
    q: 'Are the products authentic?',
    a: 'Absolutely. All WarmHut products are 100% original and undergo strict quality control before being shipped.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-[80vh] bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-center mb-12">Got questions? We've got answers.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                className="w-full px-6 py-5 text-left font-bold text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.q}
                {openIndex === index ? (
                  <FiChevronUp className="text-olive w-5 h-5 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
