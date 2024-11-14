import React from 'react';
import { Target, Users, Lightbulb, Check, ArrowRightCircle, Save } from 'lucide-react';
import { SoftwareIdea } from '../utils/ideaGeneration';

interface IdeaDisplayProps {
  idea: SoftwareIdea;
  onDeepPlan?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  saveSuccess?: boolean;
  isAnalyzing?: boolean;
  hideActions?: boolean;
}

const IdeaDisplay: React.FC<IdeaDisplayProps> = ({ 
  idea, 
  onDeepPlan, 
  onSave, 
  isSaving, 
  saveSuccess,
  isAnalyzing,
  hideActions = false
}) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.name}</h3>
        <p className="text-gray-600">{idea.description}</p>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Target className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Purpose</h4>
            <p className="text-gray-600">{idea.purpose}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Target Audience</h4>
            <p className="text-gray-600">{idea.targetAudience}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Key Features</h4>
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

      {!hideActions && onSave && onDeepPlan && (
        <div className="flex gap-4">
          <button 
            onClick={onSave}
            disabled={isSaving}
            className={`flex-1 py-4 px-6 rounded-xl font-medium shadow-lg transition
              flex items-center justify-center gap-2
              ${saveSuccess 
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'}`}
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {saveSuccess ? 'Saved!' : 'Save This Idea'}
              </>
            )}
          </button>

          <button 
            onClick={onDeepPlan}
            disabled={isAnalyzing}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl 
              font-medium shadow-lg hover:from-green-700 hover:to-teal-700 transition
              flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Move to DeepPlan</span>
                <ArrowRightCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default IdeaDisplay;