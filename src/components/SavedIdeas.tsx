import React from 'react';
import { Trash2, Clock } from 'lucide-react';
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
              <button
                onClick={() => onSelect(savedIdea)}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition"
              >
                {savedIdea.idea.name}
              </button>
              <button
                onClick={() => onDelete(savedIdea.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition"
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