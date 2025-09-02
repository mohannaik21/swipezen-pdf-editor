import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PDFPage from './PDFPage'

const PDFViewer = ({ pages, currentPage, onPageChange }) => {
  const totalPages = pages.length

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1)
    }
  }

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      onPageChange(pageNumber)
    }
  }

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No PDF pages to display</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Navigation (Top) */}
      <div className="page-navigation">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="page-indicator">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          {/* Page Jump */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Go to:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage + 1}
              onChange={(e) => goToPage(parseInt(e.target.value) - 1)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-swipezen-blue focus:border-transparent"
            />
          </div>
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Page Thumbnails */}
      <div className="flex justify-center">
        <div className="flex space-x-2 overflow-x-auto pb-4 max-w-full">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => goToPage(index)}
              className={`
                flex-shrink-0 w-16 h-20 border-2 rounded cursor-pointer transition-all duration-200
                ${index === currentPage 
                  ? 'border-swipezen-blue bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Page Display */}
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          <PDFPage 
            page={pages[currentPage]} 
            pageNumber={currentPage + 1}
            isEditing={false}
            onContentChange={() => {}}
            // 🔑 Fix alignment for page 3 heading
            forceLeftAlignHeading={currentPage === 2} 
          />
        </div>
      </div>

      {/* Page Navigation (Bottom) */}
      <div className="page-navigation">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="page-indicator">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          {/* Quick Navigation */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((pageNum) => {
              const pageIndex = pageNum - 1
              if (pageIndex >= totalPages) return null
              
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageIndex)}
                  className={`
                    w-8 h-8 text-xs rounded border transition-colors
                    ${pageIndex === currentPage
                      ? 'bg-swipezen-blue text-white border-swipezen-blue'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {pageNum}
                </button>
              )
            })}
            
            {totalPages > 5 && (
              <>
                <span className="text-gray-400">...</span>
                <button
                  onClick={() => goToPage(totalPages - 1)}
                  className={`
                    w-8 h-8 text-xs rounded border transition-colors
                    ${currentPage === totalPages - 1
                      ? 'bg-swipezen-blue text-white border-swipezen-blue'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PDFViewer





