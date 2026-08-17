import React from 'react'
import exchange from '../assets/exchange_icon.png'
import Quality from '../assets/quality_icon.png'
import Support from '../assets/support_img.png'

const BenefitCard = ({ img, title, children, alt }) => (
  <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200">
      <img src={img} alt={alt} className="h-8 w-8 object-contain" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
)

const Benefits = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BenefitCard img={exchange} alt="exchange" title="Easy Exchange Policy" >
          We offer a hassle-free exchange policy so you can shop with confidence.
        </BenefitCard>

        <BenefitCard img={Quality} alt="quality" title="7-Day Returns">
          Free returns within 7 days and straightforward refunds for eligible items.
        </BenefitCard>

        <BenefitCard img={Support} alt="support" title="24/7 Support">
          Responsive customer support available around the clock to help with any issue.
        </BenefitCard>
      </div>
    </div>
  )
}

export default Benefits