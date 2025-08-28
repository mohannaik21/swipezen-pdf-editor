import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Edit3, Save, X, Type, Bold, Italic, Underline, Phone, Mail, Globe } from 'lucide-react'
import PDFPage from './PDFPage'
import TextEditor from './TextEditor'
import toast from 'react-hot-toast'

const PDFEditor = ({ pages, currentPage, onPageChange, onSave }) => {
  const [editingText, setEditingText] = useState(null)
  const [textEditorOpen, setTextEditorOpen] = useState(false)
  const [editedPages, setEditedPages] = useState([...pages])
  const [selectedText, setSelectedText] = useState('')
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 14
  })

  // Debug logging
  useEffect(() => {
    console.log('PDFEditor mounted with pages:', pages)
    console.log('Current page:', currentPage)
    console.log('Edited pages:', editedPages)
  }, [pages, currentPage, editedPages])

  const totalPages = editedPages.length

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

  const handleTextClick = (text, path) => {
    if (isInLockedArea(path)) {
      toast.error('This area is locked and cannot be edited')
      return
    }
    
    setSelectedText(text)
    setEditingText({ text, path })
    setTextEditorOpen(true)
  }

  const isInLockedArea = (path) => {
    // Check if the text element is in a locked area
    const lockedAreas = ['header', 'footer', 'logo', 'contactInfo']
    
    // Page 2 and Page 3 have all content locked
    if (currentPage === 1 || currentPage === 2) { // Page 2 and 3 (0-indexed)
      return true
    }
    
    return lockedAreas.some(area => path.includes(area))
  }

  const handleTextSave = (newText, formatting) => {
    if (!editingText) return

    const updatedPages = [...editedPages]
    const pageIndex = currentPage
    const page = { ...updatedPages[pageIndex] }
    
    // Update the text content based on the path
    const pathParts = editingText.path.split('.')
    let current = page.content
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]]
    }
    
    current[pathParts[pathParts.length - 1]] = newText
    
    updatedPages[pageIndex] = page
    setEditedPages(updatedPages)
    
    setTextEditorOpen(false)
    setEditingText(null)
    toast.success('Text updated successfully!')
  }

  const handleSaveAll = () => {
    onSave(editedPages)
    toast.success('All changes saved!')
  }

  const renderEditableContent = (content, path = '') => {
    console.log('Rendering editable content:', content, 'path:', path)
    
    if (!content) {
      console.log('No content to render')
      return <div className="text-gray-500">No content available</div>
    }

    try {
      if (content.modules) {
        return renderEditableModulesPage(content, path)
      } else if (content.details) {
        return renderEditableDetailsPage(content, path)
      } else {
        return renderEditableStandardPage(content, path)
      }
    } catch (error) {
      console.error('Error rendering editable content:', error)
      return <div className="text-red-500">Error rendering content: {error.message}</div>
    }
  }

  const renderEditableStandardPage = (content, path) => (
    <div className="space-y-6">
      {content.title && (
        <div
          className={`font-bold text-gray-900 p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area text-left text-xl' : 'cursor-pointer hover:bg-blue-50 editable-text text-center text-2xl'
          }`}
          onClick={() => handleTextClick(content.title, `${path}title`)}
        >
          {content.title}
        </div>
      )}
      
      {content.recipient && (
        <div className="flex justify-between items-start">
          <div 
            className={`text-sm font-medium text-gray-700 whitespace-pre-line p-2 rounded ${
              currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
            }`}
            onClick={() => handleTextClick(content.recipient, `${path}recipient`)}
          >
            {content.recipient}
          </div>
          {content.date && (
            <div 
              className={`text-sm text-gray-600 p-2 rounded ${
                currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
              }`}
              onClick={() => handleTextClick(content.date, `${path}date`)}
            >
              {content.date}
            </div>
          )}
        </div>
      )}

      {content.greeting && (
        <div 
          className={`text-lg font-medium text-gray-800 p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.greeting, `${path}greeting`)}
        >
          {content.greeting}
        </div>
      )}

      {/* Contract specific content for page 3 */}
      {content.contractIntro && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.contractIntro, `${path}contractIntro`)}
          dangerouslySetInnerHTML={{
            __html: content.contractIntro
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.whereas && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.whereas, `${path}whereas`)}
        >
          {content.whereas}
        </div>
      )}

      {content.therefore && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.therefore, `${path}therefore`)}
        >
          {content.therefore}
        </div>
      )}

      {content.trainingTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area text-left text-lg' : 'cursor-pointer hover:bg-blue-50 editable-text text-left text-lg'
          }`}
          onClick={() => handleTextClick(content.trainingTitle, `${path}trainingTitle`)}
        >
          {content.trainingTitle}
        </div>
      )}

      {content.trainingBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.trainingBody, `${path}trainingBody`)}
          dangerouslySetInnerHTML={{
            __html: content.trainingBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {/* Page 4 specific content - Multiple sections */}
      {content.compensationTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.compensationTitle, `${path}compensationTitle`)}
        >
          {content.compensationTitle}
        </div>
      )}

      {content.compensationBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.compensationBody, `${path}compensationBody`)}
          dangerouslySetInnerHTML={{
            __html: content.compensationBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.cancellingTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.cancellingTitle, `${path}cancellingTitle`)}
        >
          {content.cancellingTitle}
        </div>
      )}

      {content.cancellingBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.cancellingBody, `${path}cancellingBody`)}
          dangerouslySetInnerHTML={{
            __html: content.cancellingBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.publicityTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.publicityTitle, `${path}publicityTitle`)}
        >
          {content.publicityTitle}
        </div>
      )}

      {content.publicityBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.publicityBody, `${path}publicityBody`)}
        >
          {content.publicityBody}
        </div>
      )}

      {/* Page 5 specific content - Multiple sections */}
      {content.modificationTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.modificationTitle, `${path}modificationTitle`)}
        >
          {content.modificationTitle}
        </div>
      )}

      {content.modificationBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.modificationBody, `${path}modificationBody`)}
        >
          {content.modificationBody}
        </div>
      )}

      {content.lawTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.lawTitle, `${path}lawTitle`)}
        >
          {content.lawTitle}
        </div>
      )}

      {content.lawBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.lawBody, `${path}lawBody`)}
        >
          {content.lawBody}
        </div>
      )}

      {content.witnessTitle && (
        <div 
          className={`font-bold text-gray-900 p-2 rounded text-left text-lg ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.witnessTitle, `${path}witnessTitle`)}
        >
          {content.witnessTitle}
        </div>
      )}

      {content.witnessBody && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.witnessBody, `${path}witnessBody`)}
        >
          {content.witnessBody}
        </div>
      )}

      {/* Signatories for page 5 */}
      {content.signatories && (
        <div className="flex justify-between items-center mt-8">
          <div 
            className={`text-sm font-medium text-gray-700 p-2 rounded ${
              currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
            }`}
            onClick={() => handleTextClick(content.signatories.swipegen, `${path}signatories.swipegen`)}
          >
            {content.signatories.swipegen}
          </div>
          <div 
            className={`text-sm font-medium text-gray-700 p-2 rounded ${
              currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
            }`}
            onClick={() => handleTextClick(content.signatories.dscasc, `${path}signatories.dscasc`)}
          >
            {content.signatories.dscasc}
          </div>
        </div>
      )}
      
      {content.body && (
        <div 
          className={`text-sm text-gray-800 leading-relaxed whitespace-pre-line p-2 rounded ${
            currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
          }`}
          onClick={() => handleTextClick(content.body, `${path}body`)}
          dangerouslySetInnerHTML={{
            __html: currentPage === 1 
              ? content.body
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\nTRAINING SESSIONS\n\n/g, '<br><br><strong>TRAINING SESSIONS</strong><br><br>')
              : content.body
          }}
        />
      )}
    </div>
  )

  const renderEditableModulesPage = (content, path) => (
    <div className="space-y-6">
      <div
        className={`text-xl font-bold text-gray-900 text-center p-2 rounded ${
          currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
        }`}
        onClick={() => handleTextClick(content.title, `${path}title`)}
      >
        {content.title}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-swipezen-blue text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">Module No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {content.modules.map((module, index) => (
              <tr key={module.number} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-2">{module.number}</td>
                <td 
                  className={`border border-gray-300 px-4 py-2 ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(module.topic, `${path}modules.${index}.topic`)}
                >
                  {module.topic}
                </td>
                <td 
                  className={`border border-gray-300 px-4 py-2 ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(module.duration.toString(), `${path}modules.${index}.duration`)}
                >
                  {module.duration}
                </td>
                <td 
                  className={`border border-gray-300 px-4 py-2 ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(module.type, `${path}modules.${index}.type`)}
                >
                  {module.type}
                </td>
                <td 
                  className={`border border-gray-300 px-4 py-2 ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(module.description, `${path}modules.${index}.description`)}
                >
                  {module.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderEditableDetailsPage = (content, path) => (
    <div className="space-y-6">
      <div
        className={`text-xl font-bold text-gray-900 text-center p-2 rounded ${
          currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
        }`}
        onClick={() => handleTextClick(content.title, `${path}title`)}
      >
        {content.title}
      </div>
      
      <div className="max-w-md mx-auto">
        <table className="w-full border-collapse">
          <tbody>
            {content.details.map((detail, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td 
                  className={`py-2 font-medium text-gray-700 p-1 rounded ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(detail.attribute, `${path}details.${index}.attribute`)}
                >
                  {detail.attribute}
                </td>
                <td 
                  className={`py-2 text-gray-900 p-1 rounded ${
                    currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
                  }`}
                  onClick={() => handleTextClick(detail.value, `${path}details.${index}.value`)}
                >
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {content.note && (
          <div 
            className={`mt-4 p-3 bg-gray-50 rounded-lg ${
              currentPage === 1 || currentPage === 2 ? 'locked-area' : 'cursor-pointer hover:bg-blue-50 editable-text'
            }`}
            onClick={() => handleTextClick(content.note, `${path}note`)}
          >
            <p className="text-sm text-gray-600">{content.note}</p>
          </div>
        )}
      </div>
    </div>
  )

  // Check if we have valid data
  if (!editedPages || editedPages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No PDF pages to edit</p>
      </div>
    )
  }

  if (currentPage >= editedPages.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Invalid page number</p>
      </div>
    )
  }

  const currentPageData = editedPages[currentPage]
  console.log('Current page data:', currentPageData)

  return (
    <div className="space-y-6">
      {/* Editor Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-medium text-gray-900">PDF Editor</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Edit3 className="w-4 h-4" />
              <span>Click on text to edit</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveAll}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save All Changes</span>
            </button>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Header, footer, logo, and contact information areas are locked and cannot be edited.
            {(currentPage === 1 || currentPage === 2) && ` Page ${currentPage + 1} content is completely locked.`}
            These areas are highlighted in red.
          </p>
        </div>
      </div>

      {/* Page Navigation */}
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

      {/* Current Page Display */}
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="pdf-page">
            {/* Header Locked Area */}
            <div 
              className="locked-overlay"
              style={{
                top: currentPageData.lockedAreas.header.top,
                left: currentPageData.lockedAreas.header.left,
                width: currentPageData.lockedAreas.header.width,
                height: currentPageData.lockedAreas.header.height
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-swipezen-blue to-swipezen-light-blue opacity-20"></div>
            </div>

            {/* Swipezen Logo (Locked) */}
            <div 
              className="swipezen-logo locked-overlay"
              style={{
                top: currentPageData.lockedAreas.logo.top,
                right: currentPageData.lockedAreas.logo.right,
                width: currentPageData.lockedAreas.logo.width,
                height: currentPageData.lockedAreas.logo.height
              }}
            >
              <div>SwipeGen</div>
              <div className="text-xs">GET IT RIGHT!</div>
            </div>

            {/* Main Content Area */}
            <div className="pdf-page-content">
              {renderEditableContent(currentPageData.content)}
            </div>

            {/* Footer Locked Area */}
            <div 
              className="locked-overlay"
              style={{
                top: currentPageData.lockedAreas.footer.top,
                left: currentPageData.lockedAreas.footer.left,
                width: currentPageData.lockedAreas.footer.width,
                height: currentPageData.lockedAreas.footer.height
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-swipezen-blue to-swipezen-light-blue opacity-20"></div>
            </div>

            {/* Contact Information (Locked) */}
            <div 
              className="contact-info locked-overlay"
              style={{
                bottom: currentPageData.lockedAreas.contactInfo.bottom,
                right: currentPageData.lockedAreas.contactInfo.right,
                width: currentPageData.lockedAreas.contactInfo.width,
                height: currentPageData.lockedAreas.contactInfo.height
              }}
            >
              <div>
                <Phone className="icon" />
                +91-7985199972
              </div>
              <div>
                <Mail className="icon" />
                mail.swipegen@gmail.com
              </div>
              <div>
                <Globe className="icon" />
                www.swipegen.in
              </div>
            </div>

            {/* Page Number */}
            <div className="absolute bottom-4 left-4 text-xs text-gray-500">
              Page {currentPage + 1}
            </div>

            {/* Locked Area Indicators */}
            <div className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Header Locked
            </div>
            <div className="absolute bottom-2 left-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Footer Locked
            </div>
            <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Logo Locked
            </div>
            <div className="absolute bottom-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Contact Locked
            </div>
            
            {/* Page 2 and 3 specific indicator */}
            {(currentPage === 1 || currentPage === 2) && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-800 text-sm px-4 py-2 rounded-lg font-medium">
                Page {currentPage + 1} - All Content Locked
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Editor Modal */}
      {textEditorOpen && (
        <TextEditor
          text={selectedText}
          onSave={handleTextSave}
          onCancel={() => setTextEditorOpen(false)}
          formatting={textFormat}
          onFormatChange={setTextFormat}
        />
      )}
    </div>
  )
}

export default PDFEditor
