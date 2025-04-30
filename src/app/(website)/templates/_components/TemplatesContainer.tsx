// import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import RadyToUse from './RadyToUse';
import JobRightFit from '../../jobBoard/_components/JobRightFit';

export default function TemplatesContainer() {
  // Array of template card data
  const templateCards = [
    {
      id: 1,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: '$99',
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 2,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 3,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: '$49',
      isFree: false,
      isPro: false,
      isHot: true,
    },
    {
      id: 4,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: '$59',
      isFree: false,
      isPro: false,
      isHot: true,
    },
    {
      id: 5,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 6,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: false,
      isPro: false,
      isHot: false,
    },
    {
      id: 7,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 8,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: '$89',
      isFree: false,
      isPro: false,
      isHot: true,
    },
    {
      id: 9,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 10,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: '$69',
      isFree: false,
      isPro: false,
      isHot: true,
    },
    {
      id: 11,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
    {
      id: 12,
      title: 'Template Title',
      description: 'Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.',
      price: null,
      isFree: true,
      isPro: false,
      isHot: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <RadyToUse />
      {/* Search Section */}
      <div className="bg-white py-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search Templates..."
              className="w-full p-2 pl-3 pr-10 border rounded-md"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                Category <ChevronDown size={16} className="ml-1" />
              </button>
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                Industry <ChevronDown size={16} className="ml-1" />
              </button>
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                Price <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            <button className="border rounded p-2 text-sm bg-white flex items-center">
              Sort By: Newest First <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Template Cards Grid */}
      <div className="bg-gray-50 py-6 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateCards.map((template) => (
              <div key={template.id} className="bg-white rounded-md overflow-hidden shadow-sm">
                {/* Template Image Placeholder */}
                <div className="bg-gray-200 h-36 relative">
                  {template.isFree && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      FREE
                    </span>
                  )}
                  {template.isHot && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      HOT
                    </span>
                  )}
                  {template.isPro && (
                    <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                      PRO
                    </span>
                  )}
                </div>
                
                {/* Template Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{template.title}</h3>
                    {template.price && (
                      <span className="text-sm text-blue-600 font-medium">{template.price}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{template.description}</p>
                  
                  <div className="flex gap-2">
                    <button className="bg-white border border-blue-600 text-blue-600 py-1 px-4 rounded text-sm font-medium hover:bg-blue-50 transition flex-1">
                      Preview
                    </button>
                    <button className="bg-blue-600 text-white py-1 px-4 rounded text-sm font-medium hover:bg-blue-700 transition flex-1">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="border border-blue-600 text-blue-600 py-2 px-6 rounded text-sm font-medium hover:bg-blue-50 transition inline-flex items-center">
              Load More <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Newsletter */}
      <JobRightFit />
    </div>
  );
}