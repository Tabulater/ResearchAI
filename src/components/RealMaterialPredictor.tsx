import React, { useState } from 'react';
import { Atom, Zap, Loader2, AlertCircle, Info } from 'lucide-react';
import { realApiService } from '../services/realApiService';

export const RealMaterialPredictor: React.FC = () => {
  const [formula, setFormula] = useState('');
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!formula.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const result = await realApiService.getMaterialProperties(formula.trim());
      setPrediction(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const commonMaterials = [
    { formula: 'CsPbBr3', name: 'Cesium Lead Bromide (Perovskite)' },
    { formula: 'TiO2', name: 'Titanium Dioxide' },
    { formula: 'MOF-74', name: 'Metal-Organic Framework' },
    { formula: 'LiFePO4', name: 'Lithium Iron Phosphate' },
    { formula: 'CH3NH3PbI3', name: 'Methylammonium Lead Iodide' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Atom className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Real Material Property Predictor</h2>
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
              placeholder="Enter chemical formula (e.g., CsPbBr3)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-gray-600">Common materials to try:</span>
            <div className="space-y-1">
              {commonMaterials.map((material, idx) => (
                <button
                  key={idx}
                  onClick={() => setFormula(material.formula)}
                  className="block w-full text-left text-sm bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                >
                  <span className="font-mono text-purple-600">{material.formula}</span>
                  <span className="text-gray-600 ml-2">- {material.name}</span>
                </button>
              ))}
            </div>
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
            <span>{isLoading ? 'Analyzing...' : 'Predict Properties'}</span>
          </button>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
        </div>

        {prediction && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-900">Prediction Results</h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {Math.round(prediction.confidence * 100)}% confidence
                </span>
                {prediction.source && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {prediction.source === 'materials_project' ? 'Materials Project' : 'Computational'}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-medium text-gray-900 mb-3">
                  Formula: <span className="font-mono text-purple-600">{prediction.formula}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {prediction.properties?.bandGap !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Band Gap:</span>
                      <span className="font-medium">{prediction.properties.bandGap} eV</span>
                    </div>
                  )}
                  
                  {prediction.properties?.efficiency !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Efficiency:</span>
                      <span className="font-medium">{prediction.properties.efficiency}%</span>
                    </div>
                  )}
                  
                  {prediction.properties?.stability !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stability Score:</span>
                      <span className="font-medium">{prediction.properties.stability}/100</span>
                    </div>
                  )}
                  {prediction.classification && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Classification:</span>
                      <span className="font-medium">{prediction.classification}</span>
                    </div>
                  )}
                </div>
              </div>

              {prediction.composition && (
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">Composition</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(prediction.composition).map(([el, count]: any) => (
                      <span key={el} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-200">
                        <span className="font-mono">{el}</span>
                        <span className="ml-1">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {prediction.suggestedApplications?.length > 0 && (
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">Suggested Applications</div>
                  <div className="flex flex-wrap gap-2">
                    {prediction.suggestedApplications.map((app: string, idx: number) => (
                      <span key={idx} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {prediction.warnings?.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="font-medium text-red-900 mb-2">Warnings</div>
                  <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                    {prediction.warnings.map((w: string, idx: number) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {prediction.recommendations?.length > 0 && (
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">Recommendations</div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {prediction.recommendations.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">Prediction Method</span>
                  {prediction.provenance?.mp_id && (
                    <span className="ml-auto text-xs text-gray-500">MP ID: {prediction.provenance.mp_id}</span>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {prediction.source === 'computational_prediction' 
                    ? 'Computational prediction based on chemical composition and known material-property heuristics.'
                    : 'Normalized data derived from Materials Project summary API.'
                  }
                </span>
                {prediction.rationale && (
                  <div className="text-sm text-gray-600 mt-2">{prediction.rationale}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-yellow-900 mb-2">How This Works:</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• First attempts to fetch real data from Materials Project database</li>
          <li>• Falls back to computational prediction using chemical composition analysis</li>
          <li>• Predictions based on known relationships between structure and properties</li>
          <li>• For production use, integrate with DFT calculations or ML models trained on experimental data</li>
        </ul>
      </div>
    </div>
  );
};