import React, { useState } from 'react';
import { Crown, Check, Zap, Star, Shield, TrendingUp, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SubscriptionPlan: React.FC = () => {
  const { user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      annualPrice: 0,
      color: 'from-gray-400 to-gray-600',
      features: [
        '5 practice sessions per day',
        'Basic progress tracking',
        'Addition & Subtraction only',
        'Community support',
      ],
      limitations: [
        'Limited to 2 difficulty levels',
        'No detailed analytics',
        'Basic achievements only',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      annualPrice: 99.99,
      color: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        'Unlimited practice sessions',
        'Advanced analytics & insights',
        'All math categories',
        'Personalized learning path',
        'Detailed progress reports',
        'Priority support',
        'Custom difficulty levels',
        'Achievement badges',
      ],
      limitations: [],
    },
    {
      id: 'family',
      name: 'Family',
      price: 19.99,
      annualPrice: 199.99,
      color: 'from-green-500 to-teal-600',
      features: [
        'Everything in Premium',
        'Up to 6 family members',
        'Parent dashboard',
        'Family progress sharing',
        'Parental controls',
        'Multi-device sync',
        'Family challenges',
        'Dedicated family support',
      ],
      limitations: [],
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // This would integrate with Stripe or another payment processor
    alert(`Redirecting to payment for ${planId} plan...`);
  };

  const getCurrentPlanFeatures = () => {
    if (user?.subscription === 'premium') return plans[1].features;
    if (user?.subscription === 'family') return plans[2].features;
    return plans[0].features;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock your full potential with our premium features designed to accelerate your math learning journey.
        </p>
      </div>

      {/* Current Plan Status */}
      {user?.subscription !== 'free' && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                You're on the {user?.subscription === 'premium' ? 'Premium' : 'Family'} Plan
              </h3>
              <p className="text-sm text-gray-600">Enjoying all the premium features</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {getCurrentPlanFeatures().slice(0, 6).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            isAnnual ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              isAnnual ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Annual
        </span>
        {isAnnual && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Save 17%
          </span>
        )}
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg ${
              plan.popular ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
            } ${user?.subscription === plan.id ? 'ring-2 ring-green-100 border-green-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {plan.id === 'free' && <BookOpen className="w-6 h-6 text-white" />}
                  {plan.id === 'premium' && <Star className="w-6 h-6 text-white" />}
                  {plan.id === 'family' && <Users className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${isAnnual ? plan.annualPrice : plan.price}
                  </span>
                  <span className="text-gray-600">
                    {plan.price === 0 ? '' : `/${isAnnual ? 'year' : 'month'}`}
                  </span>
                </div>
                {isAnnual && plan.price > 0 && (
                  <p className="text-sm text-gray-500">
                    ${(plan.price * 12).toFixed(2)} billed annually
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={user?.subscription === plan.id}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  user?.subscription === plan.id
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {user?.subscription === plan.id ? 'Current Plan' : 
                 plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Free</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Premium</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Family</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 text-gray-700">Practice Sessions</td>
                <td className="py-3 px-4 text-center text-gray-600">5/day</td>
                <td className="py-3 px-4 text-center text-green-600">Unlimited</td>
                <td className="py-3 px-4 text-center text-green-600">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Math Categories</td>
                <td className="py-3 px-4 text-center text-gray-600">2</td>
                <td className="py-3 px-4 text-center text-green-600">All</td>
                <td className="py-3 px-4 text-center text-green-600">All</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Advanced Analytics</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Family Accounts</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">Up to 6</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Priority Support</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Can I cancel my subscription anytime?</h4>
            <p className="text-sm text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Is there a free trial?</h4>
            <p className="text-sm text-gray-600">All new users get a 7-day free trial of Premium features. No credit card required to start.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">What payment methods do you accept?</h4>
            <p className="text-sm text-gray-600">We accept all major credit cards, PayPal, and bank transfers through our secure payment processor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;