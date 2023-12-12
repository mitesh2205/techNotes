import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
const DashFooter = () => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname

    console.log(pathname)

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !==  '/dash') {
        console.log('not /dash')
        goHomeButton = (
            <button className='dash-footer__button icon-button' title="Home" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
        }
  const content = (
    

   
    <footer
      className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
        
      <div className="p-4 text-center bg-blue-600 dark:text-neutral-200">
        <span className="flex justify-center">
            {goHomeButton}
        </span>

        © 2023 Copyright
      </div>
    </footer>
    
  )
  return content
}

export default DashFooter