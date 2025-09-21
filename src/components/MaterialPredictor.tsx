import React, { useState } from 'react';
import { Atom, Zap, Loader2, TrendingUp } from 'lucide-react';
import { aiService, type MaterialPrediction } from '../services/aiService';

export const MaterialPredictor: React.FC = () => {
  const [formula, setFormula] = useState('');
  const [application, setApplication] = useState('Solar Cell Absorber');
  const [prediction, setPrediction] = useState<MaterialPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const applications = [
    'Solar Cell Absorber',
    'CO2 Capture Material',
    'Battery Electrode',
    'Photocatalyst',
    'Thermoelectric Material'
  ];

  const handlePredict = async () => {
    if (!formula.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await aiService.predictMaterialProperties(formula.trim(), application);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Atom className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">AI Material Property Predictor</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Formula
            </label>
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="e.g., CsPbBr3, MOF-74, TiO2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Application
            </label>
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {applications.map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading || !formula.trim()}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Zap className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Predicting...' : 'Predict Properties'}</span>
          </button>
        </div>

        {prediction && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-900">AI Prediction Results</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                {Math.round(prediction.confidence * 100)}% confidence
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Formula: {prediction.formula}</div>
                {prediction.properties.bandGap && (
                  <div className="text-sm text-gray-600">Band Gap: {prediction.properties.bandGap.toFixed(2)} eV</div>
                )}
                {prediction.properties.efficiency && (
                  <div className="text-sm text-gray-600">Efficiency: {prediction.properties.efficiency.toFixed(1)}%</div>
                )}
                {prediction.properties.stability && (
                  <div className="text-sm text-gray-600">Stability Score: {prediction.properties.stability.toFixed(0)}/100</div>
                )}
              </div>

              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">Potential Applications:</div>
                <div className="flex flex-wrap gap-2">
                  {prediction.applications.map((app, idx) => (
                    <span key={idx} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};