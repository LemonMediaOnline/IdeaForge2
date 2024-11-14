import React from 'react';
<<<<<<< HEAD
import { Trash2, Clock, Sparkles, FileStack } from 'lucide-react';
=======
import { Trash2, Clock } from 'lucide-react';
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
import { SavedIdea } from '../utils/database';

interface SavedIdeasProps {
  ideas: SavedIdea[];
  onDelete: (id: string) => void;
  onSelect: (idea: SavedIdea) => void;
}

const SavedIdeas: React.FC<SavedIdeasProps> = ({ ideas, onDelete, onSelect }) => {
  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Ideas</h2>
      <div className="space-y-4">
        {ideas.map((savedIdea) => (
          <div
            key={savedIdea.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
          >
            <div className="flex justify-between items-start mb-2">
<<<<<<< HEAD
              <div className="flex-1">
                <button
                  onClick={() => onSelect(savedIdea)}
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition mb-2 flex items-center gap-2"
                >
                  {savedIdea.idea.name}
                  <div className="flex gap-1">
                    <Sparkles className="w-4 h-4 text-indigo-500" title="Idea" />
                    {savedIdea.deepPlan && (
                      <FileStack className="w-4 h-4 text-purple-500" title="Deep Plan Analysis" />
                    )}
                  </div>
                </button>
                <p className="text-sm text-gray-600 line-clamp-2">{savedIdea.idea.description}</p>
              </div>
              <button
                onClick={() => onDelete(savedIdea.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition ml-4"
=======
              <button
                onClick={() => onSelect(savedIdea)}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition"
              >
                {savedIdea.idea.name}
              </button>
              <button
                onClick={() => onDelete(savedIdea.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition"
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
                title="Delete idea"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(savedIdea.savedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedIdeas;