import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const PDFUploader = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type === 'application/pdf') {
        onFileUpload(file)
        toast.success('PDF uploaded successfully!')
      } else {
        toast.error('Please upload a valid PDF file')
      }
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Swipezen PDF Editor
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Upload your PDF document to get started with editing
        </p>
        <p className="text-sm text-gray-500">
          Supported format: PDF files only
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject 
            ? 'border-swipezen-blue bg-blue-50' 
            : isDragReject 
            ? 'border-red-400 bg-red-50' 
            : 'border-gray-300 hover:border-swipezen-blue hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${isDragActive && !isDragReject 
              ? 'bg-swipezen-blue text-white' 
              : isDragReject 
              ? 'bg-red-400 text-white' 
              : 'bg-gray-100 text-gray-400'
            }
          `}>
            {isDragReject ? (
              <AlertCircle className="w-8 h-8" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          
          <div>
            {isDragActive && !isDragReject ? (
              <p className="text-lg font-medium text-swipezen-blue">
                Drop your PDF here
              </p>
            ) : isDragReject ? (
              <p className="text-lg font-medium text-red-600">
                Invalid file type. Please upload a PDF.
              </p>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drag & drop your PDF here
                </p>
                <p className="text-gray-500">or click to browse files</p>
              </>
            )}
          </div>
          
          {!isDragActive && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>PDF files only</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Demo Mode</h3>
          <p className="text-sm text-blue-700">
            Since actual PDF uploads aren't available in this demo, the system will simulate 
            a 12-page PDF document based on the Swipezen training contract structure.
          </p>
          <button
            onClick={() => onFileUpload({ name: 'demo.pdf', type: 'application/pdf' })}
            className="mt-3 btn-primary"
          >
            Load Demo PDF
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Upload PDF</h3>
          <p className="text-sm text-gray-600">Upload your PDF document</p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Edit Content</h3>
          <p className="text-sm text-gray-600">Edit text while preserving layout</p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Download</h3>
          <p className="text-sm text-gray-600">Download your edited PDF</p>
        </div>
      </div>
    </div>
  )
}

export default PDFUploader







