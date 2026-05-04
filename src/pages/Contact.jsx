import React from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, Pin  } from 'lucide-react';
import map from '../assets/map.png';

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-emb-blue mb-10 tracking-tight font-raleway">CONTACT US</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* Left Side - Form */}
          <div className="bg-gradient-to-b from-white-light to-emb-blue rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emb-blue mb-2 font-raleway">Get in touch with us!</h2>
            <p className="text-emb-blue mb-8 font-merriweather">Solid Waste Management Division<br/>National Solid Waste Management<br/>Commission Secretariat</p>
            
            <form className="space-y-4 font-merriweather">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-emb-green bg-gray-50" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-emb-green bg-gray-50" />
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-emb-green bg-gray-50" />
              <textarea placeholder="Message" rows="5" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:border-emb-green bg-gray-50"></textarea>
              <button className="bg-emb-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition shadow-md w-1/3">Send</button>
            </form>
          </div>

          {/* Right Side - Info & Map */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-white-light to-emb-blue rounded-3xl p-8 shadow-sm border border-blue-100">
              <h2 className="text-2xl font-bold text-emb-blue mb-6 font-raleway">Reach us!</h2>
              <div className="space-y-4 text-sm text-gray-700 font-merriweather">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-emb-blue" />
                  <a href="mailto:recordsco@emb.gov.ph" className="text-emb-blue underline">recordsco@emb.gov.ph</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-emb-blue" />
                  <span>(02) 8539 - 4378</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Pin size={18} className="text-emb-blue" />
                  <span>DENR Compound, Visayas Ave, Diliman, Quezon City,<br/>Metro Manila</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-white-light to-emb-blue rounded-3xl p-8 shadow-sm border border-blue-100">
              <h2 className="text-2xl font-bold text-emb-blue mb-4 font-raleway">Find us!</h2>
              <div className="flex items-start space-x-3 mb-4 text-sm text-gray-700 font-merriweather">
                  <Pin size={18} className="text-emb-blue" />
                  <span>EMB Central Office<br/>DENR Compound, Visayas Ave, Diliman, Quezon City, Metro Manila</span>
              </div>
              {/* Map Placeholder */}
              <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden relative">
                <img src={map} alt="Map" className="object-cover w-full h-full mix-blend-multiply" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Contact;