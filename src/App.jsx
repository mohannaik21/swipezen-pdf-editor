import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import PDFUploader from './components/PDFUploader'
import PDFViewer from './components/PDFViewer'
import PDFEditor from './components/PDFEditor'
import './App.css'

function App() {
  const [pdfFile, setPdfFile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [pdfPages, setPdfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const handleFileUpload = (file) => {
    setPdfFile(file)
    // For demo purposes, we'll create mock pages based on the 12-page PDF structure
    const mockPages = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      content: getMockPageContent(index + 1),
      lockedAreas: getLockedAreas()
    }))
    setPdfPages(mockPages)
    setCurrentPage(0)
  }

  const getMockPageContent = (pageNumber) => {
    // Mock content based on the actual PDF structure
    const pageContents = {
      1: {
        recipient: "THE PRINCIPAL\nDepartment of Computer Applications\nDayananda Sagar College of Arts,\nScience and Commerce",
        greeting: "Greetings!",
        date: "July 30, 2025",
        body: "Thank you for considering partnering with SwipeGen to support your institution's training needs. We have developed this training course proposal to detail the training services that have been discussed in our previous conversations.\n\nIf you have any questions, don't hesitate to contact us directly at mail.swipegen@gmail.com"
      },
      2: {
        title: "ABOUT US",
        body: "SwipeGen is primarily based out of Bengaluru and is happy to offer its expertise in IT. Our tried and true system is based on couple of years of cumulative experience shared between our trainers. We take great pride in preparing our clients for success through IT training, and we are confident that after attending our sessions, students will be better equipped than ever to engage in work related to subjects like Full Stack Development, DevOps, Data Engineering, Programming, Object oriented concepts, Data Science, Cyber Security, Cloud computing, and many others.\n\nTRAINING SESSIONS\n\nOur training sessions are meticulously planned by our trainers and are designed to maneuver towards the maximization of efficiency. Your time is valuable, and so is ours, so our goal is to best prepare you while taking up the least amount of your time possible."
      },
      3: {
        title: "TRAINING CONTRACT",
        contractIntro: "This Training Contract (the \"Contract\") states the terms and conditions that govern the contractual agreement between **SwipeGen** (the \"Trainer\"), and **Department of CA (Computer Application), Dayananda Sagar College of Arts Science and Commerce, Bengaluru** (the \"Client\") who agrees to be bound by this Contract.",
        whereas: "WHEREAS, the Trainer holds significant expertise in subject matter and offers training services in subject matter for which the Client would like to engage the Trainer according to the terms and conditions herein.",
        therefore: "NOW, THEREFORE, In consideration of the mutual covenants and promises made by the parties within this Contract, the Trainer and the Client (individually, each a \"Party\" and collectively, the \"Parties\") agree as follows:",
        trainingTitle: "TRAINING",
        trainingBody: "The Trainer shall conduct training in the subject matter by the schedule attached here to as **Exhibit A**."
      },
      4: {
        compensationTitle: "COMPENSATION",
        compensationBody: "The total cost to be paid to the Trainer by the Client for the services here under shall be **INR 100 per student.**\n\nAt least **50%** of the payment needs to be completed **before the commencement of the training** and remaining amount to be paid **after completion of 70% of the training.** Refer **Exhibit B** for more details.",
        cancellingTitle: "CANCELLING THE TRAINING SESSIONS",
        cancellingBody: "The Client agrees and acknowledges that a change in the schedule may be a significant burden for the Trainer and thus the Client shall forfeit **50%** of the amount already paid to the Trainer if the Client must cancel the training services within 5 days of the date on which the training services are to be scheduled.",
        publicityTitle: "PUBLICITY AND MARKETING",
        publicityBody: "The Client authorizes the Trainer to utilize the Client's logo and associated trademarks as well as any media, photos, or footage from any training session solely for marketing the Trainer's services."
      },
      5: {
        modificationTitle: "NO MODIFICATION UNLESS IN WRITING",
        modificationBody: "No modification of this Contract shall be valid unless in writing and agreed upon by both Parties.",
        lawTitle: "APPLICABLE LAW",
        lawBody: "This Contract and the interpretation of its terms shall be governed by and construed in accordance with the laws of the State of Karnataka and subject to the exclusive jurisdiction of the federal and state courts located in the country, India.",
        witnessTitle: "IN WITNESS WHEREOF",
        witnessBody: "IN WITNESS WHEREOF, each of the Parties have executed this Contract, both Parties by its duly authorized officer, as of the day and year set forth below.",
        signatories: {
          swipegen: "SwipeGen",
          dscasc: "DSCASC"
        }
      },
      6: {
        title: "PUBLICITY AND MARKETING",
        body: "The Client authorizes the Trainer to utilize the Client's logo and associated trademarks as well as any media, photos, or footage from any training session solely for marketing the Trainer's services.\n\nThe Trainer shall use such materials in a professional and respectful manner.\n\nThe Client shall have the right to review and approve any marketing materials before publication.\n\nThe Trainer shall not use any confidential or proprietary information in marketing materials.\n\nBoth parties shall benefit from positive publicity generated through the training partnership.\n\nThe Client may also use the Trainer's branding in their own marketing materials with prior approval."
      },
      7: {
        title: "NO MODIFICATION UNLESS IN WRITING",
        body: "No modification of this Contract shall be valid unless in writing and agreed upon by both Parties.\n\nAny changes to the scope of work must be documented and signed by both parties.\n\nPrice adjustments must be agreed upon in writing before implementation.\n\nSchedule changes must be communicated in writing with reasonable notice.\n\nBoth parties shall maintain written records of all modifications.\n\nThis clause ensures clarity and prevents misunderstandings."
      },
      8: {
        title: "APPLICABLE LAW",
        body: "This Contract and the interpretation of its terms shall be governed by and construed in accordance with the laws of the State of Karnataka and subject to the exclusive jurisdiction of the federal and state courts located in the country, India.\n\nAny disputes arising from this contract shall be resolved through arbitration in Bengaluru.\n\nThe prevailing party shall be entitled to recover reasonable attorney fees.\n\nThis contract is enforceable in all jurisdictions where the services are provided.\n\nBoth parties agree to submit to the jurisdiction of the courts in Karnataka.\n\nThis clause ensures legal clarity and dispute resolution procedures."
      },
      9: {
        title: "IN WITNESS WHEREOF",
        body: "IN WITNESS WHEREOF, each of the Parties have executed this Contract, both Parties by its duly authorized officer, as of the day and year set forth below.\n\nThis contract shall be effective from the date of signing by both parties.\n\nBoth parties acknowledge that they have read and understood all terms and conditions.\n\nThe contract shall remain in effect until all obligations are fulfilled.\n\nAny amendments must be made in writing and signed by both parties.\n\nThis document represents the complete agreement between the parties."
      },
      10: {
        title: "EXHIBIT A - Web Development + Cloud DevOps",
        modules: [
          {
            number: 1,
            topic: "Introduction to Web Development, SDLC & Client-Server Architecture",
            duration: 2,
            type: "Theory",
            description: "Introduces key concepts of modern web development, Software Development Life Cycle (SDLC), and the client-server model."
          },
          {
            number: 2,
            topic: "APIs - REST vs SOAP (Simplified Overview)",
            duration: 1.5,
            type: "Theory",
            description: "Explains the basics of Application Programming Interfaces (APIs), REST vs SOAP protocols, and how frontend and backend communicate."
          }
        ]
      },
      11: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        modules: [
          {
            number: 3,
            topic: "Source Control using Git and GitHub",
            duration: 1.5,
            type: "Hands-On",
            description: "Teaches students to use Git for version control and GitHub for collaborative code management."
          },
          {
            number: 4,
            topic: "Creating Web Pages with HTML",
            duration: 3,
            type: "Hands-On",
            description: "Guides students through building static webpages using HTML5 including headings, images, links, forms, and semantic elements."
          }
        ]
      },
      12: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        modules: [
          {
            number: 5,
            topic: "Styling with CSS",
            duration: 3,
            type: "Hands-On",
            description: "Introduces CSS for styling web pages. Covers colors, fonts, layout techniques using Flexbox and Grid, and making websites responsive with media queries."
          },
          {
            number: 6,
            topic: "JavaScript Fundamentals for Web Interactivity",
            duration: 3.5,
            type: "Hands-On",
            description: "Covers essential JavaScript programming for the web: variables, functions, events, conditions, loops, and DOM manipulation."
          }
        ]
      }
    }
    
    return pageContents[pageNumber] || { title: `Page ${pageNumber}`, body: "Content for this page..." }
  }

  const getLockedAreas = () => {
    return {
      header: { top: 0, left: 0, width: '100%', height: '15%' },
      footer: { top: '85%', left: 0, width: '100%', height: '15%' },
      logo: { top: '2%', right: '5%', width: '120px', height: '60px' },
      contactInfo: { bottom: '5%', right: '5%', width: '200px', height: '80px' }
    }
  }

  // Function to determine which areas are locked for each page
  const getPageLockedAreas = (pageNumber) => {
    const baseLockedAreas = getLockedAreas()
    
    // Page 2 and Page 3 have all content locked
    if (pageNumber === 2 || pageNumber === 3) {
      return {
        ...baseLockedAreas,
        content: true // Lock all content on pages 2 and 3
      }
    }
    
    return baseLockedAreas
  }

  const handleSave = (updatedPages) => {
    setPdfPages(updatedPages)
    setIsEditing(false)
    // Here you would typically save to backend or generate PDF
  }

  const handleDownload = () => {
    // Implementation for PDF generation and download
    console.log('Downloading PDF with updated content...')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!pdfFile ? (
          <PDFUploader onFileUpload={handleFileUpload} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'Edit PDF' : 'View PDF'}
              </h2>
              <div className="flex gap-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit PDF
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(pdfPages)}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                  </>
                )}
                <button
                  onClick={handleDownload}
                  className="btn-primary"
                >
                  Download PDF
                </button>
              </div>
            </div>
            
            {isEditing ? (
              <PDFEditor
                pages={pdfPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSave={handleSave}
              />
            ) : (
              <PDFViewer
                pages={pdfPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
