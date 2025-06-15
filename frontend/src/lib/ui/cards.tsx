
import React from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export interface StartupCardProps {
  startup_id: string;
  name: string;
  description: string;
  analysis: string;
  website: string;
  logo: string;
  relevancy_score: number;
}

const StartupCard: React.FC<StartupCardProps> = ({
  startup_id,
  name,
  description,
  analysis,
  website,
  logo,
  relevancy_score
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const handleWebsiteClick = () => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={logo}
                alt={`${name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="8" fill="#f3f4f6"/>
                      <text x="24" y="28" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16" font-weight="600">${name.charAt(0)}</text>
                    </svg>
                  `)}`;
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500">ID: {startup_id}</p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getScoreColor(relevancy_score)}`}>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{relevancy_score}%</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-primary-foreground/20 text-sm leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        {/* Analysis */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-secondary-foreground/30">
          <p className="text-primary-foreground text-sm font-medium mb-1">Analysis</p>
          <p className="text-primary-foreground/80 text-xs leading-relaxed">
            {analysis}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={handleWebsiteClick}
          className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
        >
          <span>Visit Website</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StartupCard;