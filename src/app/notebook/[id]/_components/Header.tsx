import { NotebookText } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div>
      <div className="flex justify-start p-2 pl-4 items-center h-16">
        <NotebookText />
        Opensource NotebookLM
      </div>
    </div>
  )
}

export default Header
