'use client'

import { useState, useRef } from 'react'
import { Upload, Mail, Eye, Send, Users, FileText, Download, Settings } from 'lucide-react'
import Header from '@/components/Header'
import MailMergeGenerator from '@/components/MailMergeGenerator'

interface Contact {
  name: string
  email: string
  [key: string]: string
}

export default function MailingPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [emailTemplate, setEmailTemplate] = useState(`Dear {{name}},

We're excited to invite you to participate in our upcoming hackathon event!

Event Details:
- Date: [Date]
- Location: [Location/Virtual]
- Duration: [Duration]

This is an incredible opportunity to:
- Work with cutting-edge AI technologies
- Network with fellow innovators
- Compete for amazing prizes
- Build solutions that matter

To register, please visit: [Registration Link]

We can't wait to see what you'll create!

Best regards,
The HackNation Team

P.S. Feel free to bring friends - teamwork makes the dream work!`)
  const [subject, setSubject] = useState('🚀 You\'re Invited: HackNation Hackathon - Build the Future!')
  const [currentPreview, setCurrentPreview] = useState<Contact | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target?.result as string
      const lines = csv.split('\n')
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())

      const parsedContacts = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim())
          const contact: Contact = { name: '', email: '' }

          headers.forEach((header, index) => {
            contact[header] = values[index] || ''
          })

          return contact
        })
        .filter(contact => contact.email && contact.name)

      setContacts(parsedContacts)
    }
    reader.readAsText(file)
  }

  const generateEmailPreview = (contact: Contact) => {
    let preview = emailTemplate
    Object.keys(contact).forEach(key => {
      const placeholder = `{{${key}}}`
      preview = preview.replace(new RegExp(placeholder, 'g'), contact[key])
    })
    return preview
  }

  const downloadTemplate = () => {
    const csvContent = "name,email,company,position\nJohn Doe,john@example.com,Tech Corp,Developer\nJane Smith,jane@example.com,StartupXYZ,Designer"
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Mail Merge System</h1>
            <p className="text-gray-400">Upload contacts, create templates, and send personalized emails at scale</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload & Contacts */}
            <div className="space-y-6">
              {/* CSV Upload */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Contacts
                  </h2>
                  <button
                    onClick={downloadTemplate}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Template
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Upload CSV file with contacts</p>
                  <p className="text-gray-500 text-sm mb-4">Required columns: name, email</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                </div>
              </div>

              {/* Contacts List */}
              {contacts.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Contacts ({contacts.length})
                  </h3>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {contacts.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          setCurrentPreview(contact)
                          setShowPreview(true)
                        }}
                      >
                        <div className="font-medium text-white">{contact.name}</div>
                        <div className="text-gray-400 text-sm">{contact.email}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Middle Column - Template Editor */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Email Template
                </h2>

                {/* Subject Line */}
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter email subject"
                  />
                </div>

                {/* Template Editor */}
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Body</label>
                  <textarea
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="w-full h-96 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                    placeholder="Enter your email template with {{placeholders}}"
                  />
                </div>

                {/* Template Variables Help */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Available Variables:</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div><code className="bg-gray-600 px-1 rounded">{"{{name}}"}</code> - Contact name</div>
                    <div><code className="bg-gray-600 px-1 rounded">{"{{email}}"}</code> - Contact email</div>
                    {contacts.length > 0 && Object.keys(contacts[0]).filter(key => !['name', 'email'].includes(key)).map(key => (
                      <div key={key}>
                        <code className="bg-gray-600 px-1 rounded">{`{{${key}}}`}</code> - {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview & Send */}
            <div className="space-y-6">
              {/* Email Preview */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Email Preview
                  </h2>
                  {contacts.length > 0 && (
                    <button
                      onClick={() => {
                        setCurrentPreview(contacts[0])
                        setShowPreview(true)
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Preview First
                    </button>
                  )}
                </div>

                {currentPreview ? (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="border-b border-gray-600 pb-3 mb-3">
                      <div className="text-gray-400 text-xs mb-1">Subject:</div>
                      <div className="text-white font-medium">{subject}</div>
                    </div>
                    <div className="border-b border-gray-600 pb-3 mb-3">
                      <div className="text-gray-400 text-xs mb-1">To:</div>
                      <div className="text-white">{currentPreview.name} &lt;{currentPreview.email}&gt;</div>
                    </div>
                    <div className="text-gray-300 text-sm whitespace-pre-wrap">
                      {generateEmailPreview(currentPreview)}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Upload contacts and select one to preview the email
                  </div>
                )}
              </div>

              {/* Send Emails */}
              {contacts.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Generate Mail Merge Files
                  </h2>

                  <MailMergeGenerator
                    contacts={contacts}
                    template={emailTemplate}
                    subject={subject}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
