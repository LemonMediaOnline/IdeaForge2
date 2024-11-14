import React from 'react';
import { 
  BarChart3, Code2, Clock, Wallet, Target, 
  ChevronRight, Download, Share2
} from 'lucide-react';
import { DeepPlanAnalysis } from '../utils/deepPlan';

interface DeepPlanViewProps {
  analysis: DeepPlanAnalysis;
}

const DeepPlanView: React.FC<DeepPlanViewProps> = ({ analysis }) => {
  if (!analysis) return null;

  const timeline = Array.isArray(analysis.timeline) ? analysis.timeline : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn space-y-8">
      {/* Market Analysis */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
        </div>
        <div className="grid gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Market Size</h3>
            <p className="text-gray-600">{analysis.marketAnalysis?.marketSize}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Key Competitors</h3>
            <ul className="list-disc list-inside text-gray-600">
              {analysis.marketAnalysis?.competitors?.map((competitor, index) => (
                <li key={index}>{competitor}</li>
              )) || []}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Unique Selling Points</h3>
            <ul className="list-disc list-inside text-gray-600">
              {analysis.marketAnalysis?.uniqueSellingPoints?.map((usp, index) => (
                <li key={index}>{usp}</li>
              )) || []}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Requirements */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Technical Stack</h2>
        </div>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600">
                {analysis.technicalRequirements?.frontendStack?.map((tech, index) => (
                  <li key={index}>{tech}</li>
                )) || []}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Backend</h3>
              <ul className="list-disc list-inside text-gray-600">
                {analysis.technicalRequirements?.backendStack?.map((tech, index) => (
                  <li key={index}>{tech}</li>
                )) || []}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Infrastructure</h3>
            <ul className="list-disc list-inside text-gray-600">
              {analysis.technicalRequirements?.infrastructure?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || []}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Development Timeline</h2>
        </div>
        <div className="space-y-6">
          {timeline.map((phase, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <h3 className="font-medium text-gray-900 mb-2">
                {phase.phase} ({phase.duration})
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {phase.keyMilestones?.map((milestone, idx) => (
                  <li key={idx}>{milestone}</li>
                )) || []}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Budget Breakdown</h2>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Development</h3>
              <p className="text-2xl font-bold text-green-600">
                {analysis.budget?.developmentCosts}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Infrastructure</h3>
              <p className="text-2xl font-bold text-green-600">
                {analysis.budget?.infrastructureCosts}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-1">Total Estimate</h3>
            <p className="text-2xl font-bold text-green-600">
              {analysis.budget?.totalEstimate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Monthly Running: {analysis.budget?.monthlyRunningCosts}
            </p>
          </div>
        </div>
      </section>

      {/* Monetization */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Monetization Strategy</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Model: {analysis.monetization?.model}</h3>
            <p className="text-gray-600">{analysis.monetization?.revenueProjection}</p>
          </div>
          <div className="grid gap-4">
            {analysis.monetization?.pricingTiers?.map((tier, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{tier.name}</h4>
                  <span className="font-bold text-indigo-600">{tier.price}</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  {tier.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  )) || []}
                </ul>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium 
          hover:bg-indigo-700 transition flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Export Plan
        </button>
        <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-900 rounded-lg font-medium 
          hover:bg-gray-200 transition flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
}

export default DeepPlanView;