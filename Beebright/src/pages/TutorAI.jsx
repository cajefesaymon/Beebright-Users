// src/pages/tutor/TutorAI.jsx
import React, { useState } from 'react';
import Card from "../components/Card";
import { Send, Sparkles, Lightbulb, FileText, MessageSquare } from 'lucide-react';

const TutorAI = ({ aiQuery, setAiQuery, aiResponse, setAiResponse }) => {
  const [loading, setLoading] = useState(false);

  const suggestionPrompts = [
    { icon: Lightbulb, text: 'Create a lesson plan for teaching fractions to Grade 5', category: 'Lesson Planning' },
    { icon: FileText, text: 'Generate practice problems for algebra basics', category: 'Assignments' },
    { icon: MessageSquare, text: 'Draft a parent message about student progress', category: 'Communication' },
    { icon: Sparkles, text: 'Suggest engaging activities for teaching multiplication', category: 'Activities' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Here's a response to: "${aiQuery}"\n\nThis is a simulated AI response. In a real implementation, this would connect to an AI service to provide intelligent teaching assistance, lesson planning help, and educational resources.`);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (prompt) => {
    setAiQuery(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          AI Assistant
        </div>
        <h1 className="font-display font-bold text-3xl text-neutral-900">
          Your Teaching AI Assistant 🤖
        </h1>
        <p className="text-neutral-600 mt-2">
          Get help with lesson planning, assignments, and teaching strategies
        </p>
      </div>

      {/* Suggestions */}
      {!aiResponse && (
        <Card>
          <h2 className="font-bold text-lg text-neutral-900 mb-4">Quick Suggestions 💡</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestionPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(prompt.text)}
                className="text-left p-4 border-2 border-neutral-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition">
                    <prompt.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-purple-600 mb-1">{prompt.category}</div>
                    <div className="text-sm text-neutral-700 font-medium">{prompt.text}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Chat Interface */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              What can I help you with today?
            </label>
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="E.g., Help me create an engaging lesson plan for teaching fractions..."
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
              rows="4"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !aiQuery.trim()}
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Thinking...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Ask AI Assistant
              </>
            )}
          </button>
        </form>

        {/* Response */}
        {aiResponse && (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-900">AI Response</span>
            </div>
            <div className="text-neutral-700 whitespace-pre-wrap">{aiResponse}</div>
            <button
              onClick={() => {
                setAiQuery('');
                setAiResponse('');
              }}
              className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm"
            >
              Ask another question →
            </button>
          </div>
        )}
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-neutral-100 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="font-bold text-neutral-900">Lesson Planning</div>
          <div className="text-sm text-neutral-600 mt-1">Get customized lesson plans</div>
        </div>
        <div className="bg-white border-2 border-neutral-100 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">✍️</div>
          <div className="font-bold text-neutral-900">Assignment Help</div>
          <div className="text-sm text-neutral-600 mt-1">Generate practice problems</div>
        </div>
        <div className="bg-white border-2 border-neutral-100 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💬</div>
          <div className="font-bold text-neutral-900">Communication</div>
          <div className="text-sm text-neutral-600 mt-1">Draft parent messages</div>
        </div>
      </div>
    </div>
  );
};

export default TutorAI;