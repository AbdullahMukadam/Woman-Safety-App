import React from 'react'
import {ChevronRight} from "lucide-react"

const MenuItem = ({ icon: Icon, label, onClick, value }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
    >
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="flex-1 text-left text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-gray-400">{value}</span>}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  )

export default MenuItem