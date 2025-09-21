import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle, FlaskConical } from 'lucide-react';

export const MaterialPredictor: React.FC = () => {
  const [material, setMaterial] = useState('');
  const [property, setProperty] = useState('conductivity');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const properties = [
    { id: 'conductivity', name: 'Thermal Conductivity' },
    { id: 'density', name: 'Density' },
    { id: 'hardness', name: 'Hardness' },
    { id: 'melting_point', name: 'Melting Point' },
  ];

  const handlePredict = async () => {
    if (!material.trim()) {
      setError('Please enter a material name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock prediction result (in a real app, this would come from an API)
      const mockPredictions: Record<string, number> = {
        'aluminum': 205, // W/(m·K)
        'copper': 401,   // W/(m·K)
        'steel': 50,     // W/(m·K)
        'glass': 0.8,    // W/(m·K)
      };

      const mockValue = mockPredictions[material.toLowerCase()] || 
        Math.floor(Math.random() * 100) + 1;
      
      setPrediction(mockValue);
    } catch (err) {
      setError('Failed to predict material properties. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyUnit = (prop: string) => {
    switch (prop) {
      case 'conductivity':
        return 'W/(m·K)';
      case 'density':
        return 'g/cm³';
      case 'hardness':
        return 'HV';
      case 'melting_point':
        return '°C';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FlaskConical className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Material Property Predictor</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Material Name
            </label>
            <input
              type="text"
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="e.g., Aluminum, Graphene, Steel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property to Predict
            </label>
            <select
              id="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isLoading}
            >
              {properties.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading || !material.trim()}
            className={`w-full flex justify-center items-center px-4 py-2 rounded-lg text-white ${
              isLoading || !material.trim()
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Predicting...
              </>
            ) : (
              'Predict Property'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Predicted {properties.find(p => p.id === property)?.name}:</p>
                <p className="text-2xl font-bold">
                  {prediction.toLocaleString()} {getPropertyUnit(property)}
                </p>
                <p className="text-sm mt-1 text-green-700">
                  Based on similar materials and known properties.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          About Material Property Prediction
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Our AI-powered material property predictor uses machine learning models trained on extensive 
          databases of material properties to estimate unknown characteristics based on material 
          composition, structure, and known properties of similar materials.
        </p>
      </div>
    </div>
  );
};
