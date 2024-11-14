import React from 'react';
import { ArrowRight, Target, Users, Lightbulb, Check, ArrowRightCircle } from 'lucide-react';
import { SoftwareIdea } from '../utils/ideaGeneration';

interface IdeaDisplayProps {
  idea: SoftwareIdea;
}

const IdeaDisplay: React.FC<IdeaDisplayProps> = ({ idea }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{idea.name}</h2>
        <p className="text-gray-600">{idea.description}</p>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Target className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Purpose</h3>
            <p className="text-gray-600">{idea.purpose}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Target Audience</h3>
            <p className="text-gray-600">{idea.targetAudience}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Key Features</h3>
            <ul className="space-y-2">
              {idea.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button 
        className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl 
          font-medium shadow-lg hover:from-green-700 hover:to-teal-700 transition
          flex items-center justify-center gap-2"
      >
        <span>Move to DeepPlan</span>
        <ArrowRightCircle className="w-5 h-5" />
      </button>
    </div>
  );
}

export default IdeaDisplay;