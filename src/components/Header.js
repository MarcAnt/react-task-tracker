import React from 'react'

import PropTypes from 'prop-types'
import Button from './Button'

// npm i react-router-dom para usar la funcionalidad 
import { useLocation } from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {
    // npm i react-router-dom para usar la funcionalidad 
    const location = useLocation();
    return (
        <header className="header">
           <h1>{title}</h1>
           {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Show'} onClick={onAdd} />}
           
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired, 
}

export default Header
