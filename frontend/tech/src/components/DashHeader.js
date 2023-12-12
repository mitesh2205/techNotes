import { Link } from 'react-router-dom'
import React from 'react'

const DashHeader = () => {
  const content = (
    <nav class="flex items-center justify-between flex-wrap p-6 bg-blue-600">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight"><Link to="/dash">
                <h1 className='dash-header__title'> TechNotes </h1>
            </Link></span>
    </div>
  </nav>
  )

  return content
}

export default DashHeader