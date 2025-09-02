import React from 'react'
import { Phone, Mail, Globe } from 'lucide-react'

const PDFPage = ({ page, pageNumber, isEditing, onContentChange }) => {
  const { content, lockedAreas } = page

  const renderContent = () => {
    if (!content) return null

    // Render different content types based on page structure
    if (content.modules) {
      return renderModulesPage(content)
    } else if (content.details) {
      return renderDetailsPage(content)
    } else {
      return renderStandardPage(content)
    }
  }

  const renderStandardPage = (content) => (
    <div className="space-y-6">
      {content.title && (
        <h1 className={`font-bold text-gray-900 ${
          content.title === "TRAINING CONTRACT" 
            ? "text-left text-3xl" // Page 3: left-aligned and larger
            : content.title === "ABOUT US"
            ? "text-left text-2xl" // Page 2: left-aligned
            : "text-center text-2xl" // Other pages: centered
        }`}>
          {content.title}
        </h1>
      )}
      
      {content.recipient && (
        <div className="flex justify-between items-start">
          <div className="text-sm font-medium text-gray-700 whitespace-pre-line">
            {content.recipient}
          </div>
          {content.date && (
            <div className="text-sm text-gray-600">
              {content.date}
            </div>
          )}
        </div>
      )}

      {content.greeting && (
        <div className="text-lg font-medium text-gray-800">
          {content.greeting}
        </div>
      )}

      {/* Contract specific content for page 3 */}
      {content.contractIntro && (
        <div 
          className="text-sm text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: content.contractIntro
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.whereas && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.whereas}
        </div>
      )}

      {content.therefore && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.therefore}
        </div>
      )}

      {content.trainingTitle && (
        <div className="font-bold text-gray-900 text-left text-lg mt-6">
          {content.trainingTitle}
        </div>
      )}

      {content.trainingBody && (
        <div 
          className="text-sm text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: content.trainingBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {/* Page 4 specific content - Multiple sections */}
      {content.compensationTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.compensationTitle}
        </div>
      )}

      {content.compensationBody && (
        <div 
          className="text-sm text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: content.compensationBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.cancellingTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.cancellingTitle}
        </div>
      )}

      {content.cancellingBody && (
        <div 
          className="text-sm text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: content.cancellingBody
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      )}

      {content.publicityTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.publicityTitle}
        </div>
      )}

      {content.publicityBody && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.publicityBody}
        </div>
      )}

      {/* Page 5 specific content - Multiple sections */}
      {content.modificationTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.modificationTitle}
        </div>
      )}

      {content.modificationBody && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.modificationBody}
        </div>
      )}

      {content.lawTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.lawTitle}
        </div>
      )}

      {content.lawBody && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.lawBody}
        </div>
      )}

      {content.witnessTitle && (
        <div className="font-bold text-gray-900 text-left text-lg">
          {content.witnessTitle}
        </div>
      )}

      {content.witnessBody && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {content.witnessBody}
        </div>
      )}

      {/* Signatories for page 5 */}
      {content.signatories && (
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm font-medium text-gray-700">
            {content.signatories.swipegen}
          </div>
          <div className="text-sm font-medium text-gray-700">
            {content.signatories.dscasc}
          </div>
        </div>
      )}
      
      {content.programOutcome && (
        <div className="text-lg font-bold text-gray-900 text-left mt-6">
          {content.programOutcome}
        </div>
      )}

      {content.body && (
        <div 
          className="text-sm text-gray-800 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: content.body
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-swipezen-light-blue">$1</strong>')
              .replace(/\n\nTRAINING SESSIONS\n\n/g, '<br><br><strong>TRAINING SESSIONS</strong><br><br>')
          }}
        />
      )}
    </div>
  )

  const renderModulesPage = (content) => (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 text-center">
        {content.title}
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-swipezen-blue text-white">
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Module No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Topic</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Duration</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            {content.modules.map((module, index) => (
              <tr key={module.number}>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900">{module.number}</td>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900">{module.topic}</td>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900">{module.duration}</td>
                <td className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900">{module.type}</td>
                <td className="border border-gray-300 px-4 py-2 bg-blue-50 text-gray-900">{module.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderDetailsPage = (content) => (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 text-center">
        {content.title}
      </h1>
      
      <div className="max-w-md mx-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-swipezen-blue text-white">
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Attribute</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-bold">Detail</th>
            </tr>
          </thead>
          <tbody>
            {content.details.map((detail, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 bg-blue-50 text-gray-900 font-medium">
                  {detail.attribute}
                </td>
                <td className="border border-gray-300 px-4 py-2 bg-swipezen-light-blue text-gray-900">
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {content.note && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p 
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: content.note
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-swipezen-light-blue">$1</strong>')
              }}
            />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="pdf-page">
      {/* Header Locked Area */}
      <div 
        className="locked-overlay"
        style={{
          top: lockedAreas.header.top,
          left: lockedAreas.header.left,
          width: lockedAreas.header.width,
          height: lockedAreas.header.height
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-swipezen-blue to-swipezen-light-blue opacity-20"></div>
      </div>

      {/* Swipezen Logo (Locked) */}
      <div 
        className="swipezen-logo locked-overlay"
        style={{
          top: lockedAreas.logo.top,
          right: lockedAreas.logo.right,
          width: lockedAreas.logo.width,
          height: lockedAreas.logo.height
        }}
      >
        <div>SwipeGen</div>
        <div className="text-xs">GET IT RIGHT!</div>
      </div>

      {/* Main Content Area */}
      <div className="pdf-page-content">
        {renderContent()}
      </div>

      {/* Footer Locked Area */}
      <div 
        className="locked-overlay"
        style={{
          top: lockedAreas.footer.top,
          left: lockedAreas.footer.left,
          width: lockedAreas.footer.width,
          height: lockedAreas.footer.height
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-swipezen-blue to-swipezen-light-blue opacity-20"></div>
      </div>

      {/* Contact Information (Locked) */}
      <div 
        className="contact-info locked-overlay"
        style={{
          bottom: lockedAreas.contactInfo.bottom,
          right: lockedAreas.contactInfo.right,
          width: lockedAreas.contactInfo.width,
          height: lockedAreas.contactInfo.height
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
        Page {pageNumber}
      </div>

      {/* Locked Area Indicators */}
      {isEditing && (
        <>
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
        </>
      )}
    </div>
  )
}

export default PDFPage
