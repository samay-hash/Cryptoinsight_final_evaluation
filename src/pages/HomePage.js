import React from 'react';
import { BarChart2, Eye, User, ArrowRight } from 'lucide-react';

function HomePage({ navigate }) {
  return (
    <div className="bg-black text-white">
      {/* Section 1: Hero */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Welcome to <span className="text-green-400">CryptoInsight</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your unified dashboard for real-time price analysis, portfolio tracking, and market trends.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('dashboard')}
              className="bg-green-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-400 transition-transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-700 transition-transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section id="features" className="py-24 bg-gray-950 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
          <p className="text-center text-yellow-400 text-lg mb-16">All the tools you need. None of the clutter.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="w-10 h-10 text-green-400" />}
              title="Real-Time Data"
              description="Live price tracking from top exchanges. Never miss a market move."
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10 text-green-400" />}
              title="Personal Watchlist"
              description="Curate your own list of coins to follow. Add and remove with a single click."
            />
            <FeatureCard
              icon={<User className="w-10 h-10 text-green-400" />}
              title="Portfolio Manager"
              description="Track your assets, view your performance, and manage your crypto wealth."
            />
          </div>
        </div>
      </section>
      
      {/* Section 3: Call to Action */}
      <section className="py-24 bg-black px-4">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl font-bold mb-6">Ready to Dive In?</h2>
           <p className="text-xl text-gray-300 mb-8">
             Sign up for a free account today and take control of your crypto journey.
           </p>
           <button
             onClick={() => navigate('signup')}
             className="bg-yellow-400 text-black font-bold py-3 px-10 rounded-lg text-lg hover:bg-yellow-300 transition-transform hover:scale-105 flex items-center justify-center mx-auto"
           >
             Create Account Now <ArrowRight className="w-5 h-5 ml-2" />
           </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform hover:scale-105 transition-transform duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default HomePage;
