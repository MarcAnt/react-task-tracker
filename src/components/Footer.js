// npm i react-router-dom para usar la funcionalidad 
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>    
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
