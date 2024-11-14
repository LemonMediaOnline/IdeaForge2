import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Sparkles, Lightbulb, Save, Wand2 } from 'lucide-react';
=======
import { Sparkles, Lightbulb, Save, Wand2, ArrowRightCircle } from 'lucide-react';
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
import IdeaDisplay from './components/IdeaDisplay';
import SavedIdeas from './components/SavedIdeas';
import DeepPlanView from './components/DeepPlanView';
import { SoftwareIdea, generateAIIdea, enhanceUserIdea } from './utils/ideaGeneration';
import { generateDeepPlanAnalysis, DeepPlanAnalysis } from './utils/deepPlan';
import { softwareTypes } from './utils/constants';
import { saveIdea, getSavedIdeas, deleteIdea, SavedIdea } from './utils/database';

function App() {
  const [mode, setMode] = useState<'ai' | 'custom'>('ai');
  const [selectedType, setSelectedType] = useState('');
  const [customIdea, setCustomIdea] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState<SoftwareIdea | null>(null);
  const [deepPlanAnalysis, setDeepPlanAnalysis] = useState<DeepPlanAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
<<<<<<< HEAD
  const [isDeepPlanSaving, setIsDeepPlanSaving] = useState(false);
  const [deepPlanSaveSuccess, setDeepPlanSaveSuccess] = useState(false);
=======
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332

  useEffect(() => {
    loadSavedIdeas();
  }, []);

  const loadSavedIdeas = async () => {
    try {
      const ideas = await getSavedIdeas();
      setSavedIdeas(ideas.sort((a, b) => b.savedAt - a.savedAt));
    } catch (err) {
      console.error('Failed to load saved ideas:', err);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setDeepPlanAnalysis(null);
    try {
      const idea = mode === 'ai' 
        ? await generateAIIdea(selectedType)
        : await enhanceUserIdea(selectedType, customIdea);
      setGeneratedIdea(idea);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeepPlan = async () => {
    if (!generatedIdea) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await generateDeepPlanAnalysis(generatedIdea);
      setDeepPlanAnalysis(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!generatedIdea) return;
    
    setIsSaving(true);
    try {
      await saveIdea(generatedIdea);
      await loadSavedIdeas();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      setError('Failed to save idea');
    } finally {
      setIsSaving(false);
    }
  };

<<<<<<< HEAD
  const handleSaveWithDeepPlan = async () => {
    if (!generatedIdea || !deepPlanAnalysis) return;
    
    setIsDeepPlanSaving(true);
    try {
      await saveIdea(generatedIdea, deepPlanAnalysis);
      await loadSavedIdeas();
      setDeepPlanSaveSuccess(true);
      setTimeout(() => setDeepPlanSaveSuccess(false), 2000);
    } catch (err) {
      setError('Failed to save analysis');
    } finally {
      setIsDeepPlanSaving(false);
    }
  };

=======
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  const handleDelete = async (id: string) => {
    try {
      await deleteIdea(id);
      await loadSavedIdeas();
    } catch (err) {
      setError('Failed to delete idea');
    }
  };

  const handleSelectSaved = (savedIdea: SavedIdea) => {
    setGeneratedIdea(savedIdea.idea);
<<<<<<< HEAD
    setDeepPlanAnalysis(savedIdea.deepPlan || null);
=======
    setDeepPlanAnalysis(null);
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">IdeaForge</h1>
          </div>
          <p className="text-lg text-gray-600">Transform your software visions into structured concepts</p>
        </div>

        <SavedIdeas 
          ideas={savedIdeas}
          onDelete={handleDelete}
          onSelect={handleSelectSaved}
        />

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMode('ai')}
              className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 transition
                ${mode === 'ai' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Wand2 className="w-5 h-5" />
              <span className="font-medium">Full AI Mode</span>
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 transition
                ${mode === 'custom' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Lightbulb className="w-5 h-5" />
              <span className="font-medium">Custom Mode</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Software Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a type</option>
                {softwareTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {mode === 'custom' && (
              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Idea
                </label>
                <textarea
                  id="idea"
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  placeholder="Describe your software idea..."
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedType || (mode === 'custom' && !customIdea) || isGenerating}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium 
                shadow-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Concept
                </>
              )}
            </button>
          </div>
        </div>

        {generatedIdea && !deepPlanAnalysis && (
<<<<<<< HEAD
          <IdeaDisplay 
            idea={generatedIdea} 
            onDeepPlan={handleDeepPlan}
            onSave={handleSave}
            isSaving={isSaving}
            saveSuccess={saveSuccess}
            isAnalyzing={isAnalyzing}
          />
        )}

        {deepPlanAnalysis && generatedIdea && (
          <DeepPlanView 
            analysis={deepPlanAnalysis}
            idea={generatedIdea}
            onSave={handleSaveWithDeepPlan}
            isSaving={isDeepPlanSaving}
            saveSuccess={deepPlanSaveSuccess}
          />
=======
          <div className="space-y-4">
            <IdeaDisplay idea={generatedIdea} />
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex-1 py-4 px-6 rounded-xl font-medium shadow-lg transition
                  flex items-center justify-center gap-2
                  ${saveSuccess 
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-50'}`}
              >
                <Save className="w-5 h-5" />
                {saveSuccess ? 'Saved!' : 'Save This Idea'}
              </button>
              <button
                onClick={handleDeepPlan}
                disabled={isAnalyzing}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl 
                  font-medium shadow-lg hover:from-blue-700 hover:to-indigo-700 transition
                  flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <ArrowRightCircle className="w-5 h-5" />
                    Move to DeepPlan
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {deepPlanAnalysis && (
          <DeepPlanView analysis={deepPlanAnalysis} />
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
        )}
      </div>
    </div>
  );
}

export default App;