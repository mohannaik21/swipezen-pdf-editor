import React, { useState, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
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
  
  // PDF document management
  const [pdfDoc, setPdfDoc] = useState(null)
  const [lastSavedPages, setLastSavedPages] = useState([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [updatedPdfBytes, setUpdatedPdfBytes] = useState(null)
  const fileInputRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleFileUpload = async (file) => {
    setPdfFile(file)
    
    try {
      // Initialize PDF document
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      setPdfDoc(pdfDoc)
      
      // For demo purposes, we'll create mock pages based on the 12-page PDF structure
      const mockPages = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        content: getMockPageContent(index + 1),
        lockedAreas: getLockedAreas()
      }))
      
      setPdfPages(mockPages)
      setLastSavedPages(mockPages)
      setCurrentPage(0)
      setHasUnsavedChanges(false)
      setUpdatedPdfBytes(null)
    } catch (error) {
      console.error('Error loading PDF:', error)
      // Fallback to mock pages if PDF loading fails
      const mockPages = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        content: getMockPageContent(index + 1),
        lockedAreas: getLockedAreas()
      }))
      setPdfPages(mockPages)
      setLastSavedPages(mockPages)
      setCurrentPage(0)
    }
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
        title: "EXHIBIT A - Web Development + Cloud DevOps",
        modules: [
          {
            number: 1,
            topic: "Introduction to Web Development, SDLC & Client-Server Architecture",
            duration: 2,
            type: "Theory",
            description: "Introduces key concepts of modern web development, Software Development Life Cycle (SDLC), and the client-server model. Establishes foundational understanding for application development and deployment."
          },
          {
            number: 2,
            topic: "APIs - REST vs SOAP (Simplified Overview)",
            duration: 1.5,
            type: "Theory",
            description: "Explains the basics of Application Programming Interfaces (APIs), REST vs SOAP protocols, and how frontend and backend communicate. Uses real-life analogies for easy understanding."
          }
        ]
      },
      7: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        modules: [
          {
            number: 3,
            topic: "Source Control using Git and GitHub",
            duration: 1.5,
            type: "Hands-On",
            description: "Teaches students to use Git for version control and GitHub for collaborative code management. Focuses on basic commands (init, add, commit, push) and real-time usage scenarios."
          },
          {
            number: 4,
            topic: "Creating Web Pages with HTML",
            duration: 3,
            type: "Hands-On",
            description: "Guides students through building static webpages using HTML5 including headings, images, links, forms, and semantic elements. Emphasizes clean and structured markup."
          }
        ]
      },
      8: {
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
            description: "Covers essential JavaScript programming for the web: variables, functions, events, conditions, loops, and DOM manipulation. Students learn to make webpages interactive."
          }
        ]
      },
      9: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        modules: [
          {
            number: 7,
            topic: "Form Handling and Validation using JavaScript",
            duration: 2.5,
            type: "Hands-On",
            description: "Implements real-time form validation and user feedback using basic JavaScript. Includes error messages, required fields, and success notifications."
          },
          {
            number: 8,
            topic: "Introduction to Cloud Computing & Microsoft Azure",
            duration: 2.5,
            type: "Theory + Demo",
            description: "Introduces students to cloud computing concepts and the Azure platform. Covers Azure portal, core services, and real-time walkthrough of how Azure hosts websites."
          }
        ]
      },
      10: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        modules: [
          {
            number: 9,
            topic: "Deploying Web Projects on Azure + Azure Functions",
            duration: 5,
            type: "Hands-On",
            description: "Hands-on experience hosting HTML/CSS/JS websites using Azure App Service. Students create a simple Azure Function (serverless) and connect it to a form for backend processing."
          },
          {
            number: 10,
            topic: "Capstone Project - Live Portfolio Website with Contact Form",
            duration: 6,
            type: "Project-Based",
            description: "Students build and deploy a personal portfolio website with interactive sections and a working contact form connected to Azure Function. Final project includes presentation and submission."
          }
        ]
      },
      11: {
        title: "EXHIBIT A - Web Development + Cloud DevOps Contd...",
        programOutcome: "Program Outcome:",
        body: "This is a training program for one month which includes **30 hours of training on Web Development Bootcamp: From HTML to Cloud.** At the end of the training, students will be allocated a Mini Project which will help them to get exposure to solving real world problems along with our team. The program aims at enhancing the overall **employability of the students** by upskilling them for **Full Stack Development, Frontend, Backend development** and similar job roles in the IT industry."
      },
      12: {
        title: "EXHIBIT B",
        details: [
          { attribute: "Target Audience", value: "MCA Students" },
          { attribute: "Semester", value: "2" },
          { attribute: "Duration", value: "30 hours of Training" },
          { attribute: "Date", value: "TBD" },
          { attribute: "No. of Students", value: "120" }
        ],
        note: "This proposal has been prepared assuming **two batches of 60 students each.**"
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

  // Helper to build a PDF from the current pages state
  const generatePdfBytesFromPages = async (pages) => {
    const newPdfDoc = await PDFDocument.create()
    for (let i = 0; i < pages.length; i++) {
      const page = newPdfDoc.addPage([612, 792])
      const font = await newPdfDoc.embedFont(StandardFonts.Helvetica)

      const pageData = pages[i]
      if (!pageData?.content) continue

      let yPosition = 750
      const drawLines = (text, size = 12) => {
        const clean = text.replace(/\*\*(.*?)\*\*/g, '$1')
        for (const line of clean.split('\n')) {
          if (!line.trim()) continue
          page.drawText(line.trim(), { x: 50, y: yPosition, size, font, color: rgb(0, 0, 0) })
          yPosition -= 20
        }
      }

      if (pageData.content.title) {
        page.drawText(pageData.content.title, { x: 50, y: yPosition, size: 16, font, color: rgb(0, 0, 0) })
        yPosition -= 30
      }
      if (pageData.content.recipient) { drawLines(pageData.content.recipient, 14); yPosition -= 10 }
      if (pageData.content.greeting) { page.drawText(pageData.content.greeting, { x: 50, y: yPosition, size: 16, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.date) { page.drawText(pageData.content.date, { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.programOutcome) { page.drawText(pageData.content.programOutcome, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.body) drawLines(pageData.content.body)
      if (pageData.content.contractIntro) { drawLines(pageData.content.contractIntro); yPosition -= 10 }
      if (pageData.content.whereas) { drawLines(pageData.content.whereas) }
      if (pageData.content.therefore) { drawLines(pageData.content.therefore) }
      if (pageData.content.trainingTitle) { page.drawText(pageData.content.trainingTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.trainingBody) drawLines(pageData.content.trainingBody)
      if (pageData.content.compensationTitle) { page.drawText(pageData.content.compensationTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.compensationBody) { drawLines(pageData.content.compensationBody); yPosition -= 10 }
      if (pageData.content.cancellingTitle) { page.drawText(pageData.content.cancellingTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.cancellingBody) { drawLines(pageData.content.cancellingBody); yPosition -= 10 }
      if (pageData.content.publicityTitle) { page.drawText(pageData.content.publicityTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.publicityBody) drawLines(pageData.content.publicityBody)
      if (pageData.content.modificationTitle) { page.drawText(pageData.content.modificationTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.modificationBody) { drawLines(pageData.content.modificationBody); yPosition -= 10 }
      if (pageData.content.lawTitle) { page.drawText(pageData.content.lawTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.lawBody) { drawLines(pageData.content.lawBody); yPosition -= 10 }
      if (pageData.content.witnessTitle) { page.drawText(pageData.content.witnessTitle, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25 }
      if (pageData.content.witnessBody) { drawLines(pageData.content.witnessBody); yPosition -= 10 }
      if (pageData.content.signatories) {
        page.drawText(`${pageData.content.signatories.swipegen}:`, { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0, 0) }); yPosition -= 30
        page.drawText(`${pageData.content.signatories.dscasc}:`, { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0, 0) })
      }
      if (pageData.content.modules) {
        yPosition -= 20; page.drawText('Module Details:', { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25
        for (const m of pageData.content.modules) { page.drawText(`Module ${m.number}: ${m.topic}`, { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0, 0) }); yPosition -= 20 }
      }
      if (pageData.content.details) {
        yPosition -= 20; page.drawText('Details:', { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0, 0) }); yPosition -= 25
        for (const d of pageData.content.details) { page.drawText(`${d.attribute}: ${d.value}`, { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0, 0) }); yPosition -= 20 }
        if (pageData.content.note) { yPosition -= 10; drawLines(pageData.content.note) }
      }
    }
    return await newPdfDoc.save()
  }

  const handleSave = async (updatedPages) => {
    try {
      const pdfBytes = await generatePdfBytesFromPages(updatedPages)
      setUpdatedPdfBytes(pdfBytes)
      setPdfPages(updatedPages)
      setLastSavedPages(updatedPages)
      setHasUnsavedChanges(false)
      setIsEditing(false)
      console.log('Changes saved to PDF document')
      toast.success('Changes saved. You can now download the updated PDF.')
    } catch (error) {
      console.error('Error saving changes:', error)
      toast.error('Failed to save changes')
    }
  }

  const handleContentChange = (pageIndex, newContent) => {
    const updatedPages = [...pdfPages]
    updatedPages[pageIndex] = {
      ...updatedPages[pageIndex],
      content: newContent
    }
    setPdfPages(updatedPages)
    setHasUnsavedChanges(true)
  }

  const handleDownload = async () => {
    if (isDownloading) return
    
    setIsDownloading(true)
    try {
      let bytesToDownload = updatedPdfBytes
      
      // If there are unsaved changes, generate PDF from current pages
      if (hasUnsavedChanges) {
        console.log('Generating PDF from current unsaved pages...')
        bytesToDownload = await generatePdfBytesFromPages(pdfPages)
        // Don't set updatedPdfBytes here since changes aren't saved yet
      } else if (!bytesToDownload) {
        // If no saved edits and no unsaved changes, generate from current pages
        console.log('No saved edits found. Generating PDF from current pages...')
        bytesToDownload = await generatePdfBytesFromPages(pdfPages)
        setUpdatedPdfBytes(bytesToDownload)
      }

      const blob = new Blob([bytesToDownload], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'swipezen-pdf-edited.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      console.log('PDF download started')
      
      if (hasUnsavedChanges) {
        toast.success('PDF downloaded with current changes. Remember to save changes to preserve them.')
      } else {
        toast.success('PDF download started')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast.error('Failed to download PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDownloadOriginal = async () => {
    if (!pdfFile) return
    
    try {
      const blob = new Blob([await pdfFile.arrayBuffer()], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = pdfFile.name || 'swipezen-pdf-original.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success('Original PDF downloaded')
    } catch (error) {
      console.error('Error downloading original PDF:', error)
      toast.error('Failed to download original PDF')
    }
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
                      disabled={!hasUnsavedChanges}
                    >
                      {hasUnsavedChanges ? 'Save Changes*' : 'Save Changes'}
                    </button>
                  </>
                )}
                <button
                  onClick={handleDownload}
                  className={`btn-primary ${hasUnsavedChanges ? 'bg-orange-500 hover:bg-orange-600' : ''} ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={!pdfDoc || isDownloading}
                  title={hasUnsavedChanges ? 'Download current version (includes unsaved changes)' : 'Download saved PDF'}
                >
                  {isDownloading ? 'Generating...' : hasUnsavedChanges ? 'Download Current*' : 'Download PDF'}
                </button>
                <button
                  onClick={handleDownloadOriginal}
                  className="btn-secondary"
                  disabled={!pdfFile}
                >
                  Download Original
                </button>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Note:</strong> You have unsaved changes. You can download the current version, but remember to save changes to preserve them permanently.
                </p>
              </div>
            )}
            
            {isEditing ? (
              <PDFEditor
                pages={pdfPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSave={handleSave}
                onContentChange={handleContentChange}
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
