import React, { useState, useEffect } from 'react'
import { X, Bold, Italic, Underline, Type, Save } from 'lucide-react'

const TextEditor = ({ text, onSave, onCancel, formatting, onFormatChange }) => {
  const [editedText, setEditedText] = useState(text)
  const [currentFormatting, setCurrentFormatting] = useState(formatting)

  useEffect(() => {
    setEditedText(text)
    setCurrentFormatting(formatting)
  }, [text, formatting])

  const handleSave = () => {
    onSave(editedText, currentFormatting)
  }

  const handleCancel = () => {
    setEditedText(text)
    setCurrentFormatting(formatting)
    onCancel()
  }

  const toggleFormat = (format) => {
    const newFormatting = {
      ...currentFormatting,
      [format]: !currentFormatting[format]
    }
    setCurrentFormatting(newFormatting)
    onFormatChange(newFormatting)
  }

  const handleFontSizeChange = (size) => {
    const newFormatting = {
      ...currentFormatting,
      fontSize: parseInt(size)
    }
    setCurrentFormatting(newFormatting)
    onFormatChange(newFormatting)
  }

  const getTextStyle = () => {
    return {
      fontWeight: currentFormatting.bold ? 'bold' : 'normal',
      fontStyle: currentFormatting.italic ? 'italic' : 'normal',
      textDecoration: currentFormatting.underline ? 'underline' : 'none',
      fontSize: `${currentFormatting.fontSize}px`
    }
  }

  return (
    <>
      <div className="text-editor-overlay" onClick={handleCancel} />
      <div className="text-editor">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Edit Text</h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleFormat('bold')}
              className={`p-2 rounded transition-colors ${
                currentFormatting.bold 
                  ? 'bg-swipezen-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => toggleFormat('italic')}
              className={`p-2 rounded transition-colors ${
                currentFormatting.italic 
                  ? 'bg-swipezen-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => toggleFormat('underline')}
              className={`p-2 rounded transition-colors ${
                currentFormatting.underline 
                  ? 'bg-swipezen-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-gray-600" />
            <select
              value={currentFormatting.fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-swipezen-blue focus:border-transparent"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
              <option value={18}>18px</option>
              <option value={20}>20px</option>
              <option value={24}>24px</option>
              <option value={28}>28px</option>
              <option value={32}>32px</option>
            </select>
          </div>
        </div>

        {/* Text Preview */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Preview:</div>
          <div 
            className="p-3 bg-gray-50 rounded border min-h-[100px] max-h-[200px] overflow-y-auto"
            style={getTextStyle()}
          >
            {editedText}
          </div>
        </div>

        {/* Text Input */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edit Text:
          </label>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-swipezen-blue focus:border-transparent"
            placeholder="Enter your text here..."
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default TextEditor
