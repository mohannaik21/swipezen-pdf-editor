# Swipezen PDF Editor

A professional web-based PDF editor tool built with React, designed specifically for Swipezen company's internal use. This tool allows users to edit PDF documents while preserving the company's branding and locked areas.

## Features

### 🎯 Core Functionality
- **PDF Upload & Display**: Upload and view PDF documents page by page
- **Smart Editing**: Edit text content while preserving document layout
- **Locked Areas**: Protect company branding, headers, footers, and contact information
- **Text Formatting**: Basic text editing with font size, bold, italic, and underline options
- **Save & Download**: Save changes and download the updated PDF

### 🔒 Security Features
- **Locked Areas**: Header, footer, Swipezen logo, and contact information are protected
- **Visual Indicators**: Clear indication of what can and cannot be edited
- **Company Branding**: Preserves Swipezen's professional appearance

### 📱 User Experience
- **Intuitive Interface**: Clean, modern design with clear navigation
- **Page Navigation**: Easy navigation between pages with thumbnails
- **Real-time Preview**: See changes as you edit
- **Responsive Design**: Works on desktop and tablet devices

## Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **PDF Processing**: pdf-lib, react-pdf
- **File Upload**: react-dropzone
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Application header with branding
│   ├── PDFUploader.jsx         # File upload component
│   ├── PDFViewer.jsx           # PDF display in read-only mode
│   ├── PDFEditor.jsx           # PDF editing interface
│   ├── PDFPage.jsx             # Individual page rendering
│   └── TextEditor.jsx          # Text editing modal
├── App.jsx                     # Main application component
├── main.jsx                    # React entry point
├── index.css                   # Global styles and Tailwind imports
└── App.css                     # Application-specific styles
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swipezen-pdf-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Usage

### 1. Upload PDF
- Click "Load Demo PDF" to see the application in action
- Or drag and drop a PDF file into the upload area
- The system will display the PDF page by page

### 2. View PDF
- Navigate through pages using the navigation controls
- Use page thumbnails for quick navigation
- View the document in read-only mode

### 3. Edit PDF
- Click the "Edit PDF" button to enter editing mode
- Click on any editable text to open the text editor
- Make changes to text content and formatting
- Save changes to update the document

### 4. Download
- Click "Download PDF" to save the edited document
- The locked areas will remain unchanged in the final PDF

## Locked Areas

The following areas are protected and cannot be edited:

- **Header**: Top section with decorative elements
- **Footer**: Bottom section with decorative elements  
- **Swipezen Logo**: Company logo in the top-right corner
- **Contact Information**: Phone, email, and website details

These areas are visually indicated with red labels and grayed-out overlays.

## Demo Content

The application includes a 12-page demo PDF based on Swipezen's training contract structure:

1. **Training Contract** - Main contract document
2. **Training** - Training terms and conditions
3. **Compensation** - Payment terms and conditions
4. **Cancellation** - Cancellation policy
5. **Publicity** - Marketing and publicity terms
6. **Modifications** - Contract modification terms
7. **Applicable Law** - Legal jurisdiction
8. **Witness** - Contract execution
9. **Exhibit A** - Course modules 1-2
10. **Exhibit A (Contd.)** - Course modules 3-4
11. **Exhibit A (Contd.)** - Course modules 5-6
12. **Exhibit B** - Training details and specifications

## Customization

### Adding New Locked Areas
To add new locked areas, modify the `getLockedAreas()` function in `App.jsx`:

```javascript
const getLockedAreas = () => {
  return {
    header: { top: 0, left: 0, width: '100%', height: '15%' },
    footer: { top: '85%', left: 0, width: '100%', height: '15%' },
    logo: { top: '2%', right: '5%', width: '120px', height: '60px' },
    contactInfo: { bottom: '5%', right: '5%', width: '200px', height: '80px' },
    // Add new locked areas here
    newArea: { top: '20%', left: '10%', width: '200px', height: '100px' }
  }
}
```

### Styling Customization
The application uses Tailwind CSS with custom Swipezen branding colors:

- `swipezen-blue`: #1e40af
- `swipezen-light-blue`: #3b82f6
- `swipezen-dark-blue`: #1e3a8a

Modify `tailwind.config.js` to change the color scheme.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact:
- Email: mail.swipegen@gmail.com
- Phone: +91-7985199972
- Website: www.swipegen.in

---

**Built with ❤️ by Swipezen Team**
