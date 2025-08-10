'use client'

import { useState } from 'react'
import { Download, FileText, Mail, Check } from 'lucide-react'

interface Contact {
  name: string
  email: string
  [key: string]: string
}

interface MailMergeGeneratorProps {
  contacts: Contact[]
  template: string
  subject: string
}

export default function MailMergeGenerator({ contacts, template, subject }: MailMergeGeneratorProps) {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateWordDocument = () => {
    setGenerating(true)

    // Generate Word document content
    const wordContent = contacts.map((contact, index) => {
      let personalizedEmail = template
      Object.keys(contact).forEach(key => {
        const placeholder = new RegExp(`{{${key}}}`, 'g')
        personalizedEmail = personalizedEmail.replace(placeholder, contact[key])
      })

      return `
Email ${index + 1}:
To: ${contact.name} <${contact.email}>
Subject: ${subject}

${personalizedEmail}

${'='.repeat(80)}
`
    }).join('\n')

    // Create and download the file
    const blob = new Blob([wordContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hackathon_emails_${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    window.URL.revokeObjectURL(url)

    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  const generateOutlookVBA = () => {
    const vbaScript = `
Sub SendPersonalizedEmails()
    ' This VBA script can be run in Outlook to send personalized emails
    ' Make sure to enable macros in Outlook

    Dim olApp As Object
    Dim olMail As Object
    Dim i As Integer

    Set olApp = CreateObject("Outlook.Application")

    ' Email data array
    Dim emailData As Variant
    emailData = Array( _
${contacts.map(contact => `        Array("${contact.name}", "${contact.email}", "${contact.company || ''}", "${contact.position || ''}")`).join(', _\n')} _
    )

    For i = 0 To UBound(emailData)
        Set olMail = olApp.CreateItem(0) ' olMailItem

        With olMail
            .To = emailData(i)(1) ' Email
            .Subject = "${subject}"
            .Body = Replace(Replace(Replace("${template.replace(/"/g, '""')}", "{{name}}", emailData(i)(0)), "{{email}}", emailData(i)(1)), "{{company}}", emailData(i)(2))
            .Display ' Use .Send to send automatically, .Display to review first
        End With

        Set olMail = Nothing
    Next i

    Set olApp = Nothing
    MsgBox "Email generation complete!"
End Sub`

    const blob = new Blob([vbaScript], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'outlook_mail_merge.vbs'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const generateCSVForOutlook = () => {
    const headers = Object.keys(contacts[0]).join(',')
    const rows = contacts.map(contact =>
      Object.values(contact).map(value => `"${value}"`).join(',')
    ).join('\n')

    const csvContent = `${headers}\n${rows}`

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contacts_for_outlook.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const generateWordMailMerge = () => {
    // Generate Word Mail Merge document
    const mailMergeTemplate = `
MAIL MERGE TEMPLATE FOR MICROSOFT WORD

Subject: ${subject}

To: «name» <«email»>

${template.replace(/{{(\w+)}}/g, '«$1»')}

INSTRUCTIONS:
1. Save this as a .docx file
2. In Word, go to Mailings > Start Mail Merge > Email Messages
3. Select Recipients > Use an Existing List
4. Choose the CSV file (contacts_for_outlook.csv)
5. Insert merge fields where you see «field_name»
6. Preview your results
7. Complete the merge to send emails

Note: Make sure Outlook is configured as your default email client.
`

    const blob = new Blob([mailMergeTemplate], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'word_mail_merge_template.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg p-6 text-center">
        <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">Upload contacts to generate mail merge files</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Ready to generate</span>
          <span className="text-blue-400 font-bold">{contacts.length} personalized emails</span>
        </div>
        <div className="text-gray-400 text-sm">
          Choose your preferred method for Word/Outlook integration
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Word Mail Merge Method */}
        <button
          onClick={() => {
            generateWordMailMerge()
            generateCSVForOutlook()
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FileText className="h-5 w-5 mr-2" />
          Generate Word Mail Merge Template + CSV
        </button>

        {/* Outlook VBA Method */}
        <button
          onClick={generateOutlookVBA}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Mail className="h-5 w-5 mr-2" />
          Generate Outlook VBA Script
        </button>

        {/* Simple Text File */}
        <button
          onClick={generateWordDocument}
          disabled={generating}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {generating ? (
            <>
              <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
              Generating...
            </>
          ) : generated ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Generated Successfully
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Generate Individual Email Files
            </>
          )}
        </button>
      </div>

      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <h4 className="text-blue-400 font-medium mb-2">Integration Methods:</h4>
        <div className="text-blue-300 text-sm space-y-2">
          <div><strong>Word Mail Merge:</strong> Traditional method using Word's built-in mail merge feature</div>
          <div><strong>Outlook VBA:</strong> Automated script to generate emails directly in Outlook</div>
          <div><strong>Individual Files:</strong> Separate text files for manual copy-paste</div>
        </div>
      </div>
    </div>
  )
}
