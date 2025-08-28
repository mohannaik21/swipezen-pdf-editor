import React from 'react'
import { FileText, Edit3, Download } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-swipezen-blue to-swipezen-light-blue rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Swipezen PDF Editor</h1>
                <p className="text-sm text-gray-600">Professional PDF Editing Tool</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Edit3 className="w-4 h-4" />
              <span>Edit PDFs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm text-gray-500">
              Powered by <span className="font-semibold text-swipezen-blue">Swipezen</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
