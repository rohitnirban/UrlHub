import { Clock } from 'lucide-react'

export default function ExpiredURLPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full  overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <svg className="w-24 h-24 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">URL Expired</h1>
          <p className="text-center text-gray-600 mb-6">
            The URL you are trying to access has expired.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span>Delete in 24 hours</span>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
            <p className="font-bold">Contact Information</p>
            <p>Please contact the organization or person who provide you this URL for further assistance.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

