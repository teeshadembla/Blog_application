import {AppBar, Toolbar, Typography, styled} from '@mui/material';
import {Link} from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;
`
const Container = styled(Toolbar)`
    justify-content: center;
`
const Header= () =>{
    return (
        <Component>
            <Container>
                <Link to='/' style={{padding: 20, textDecoration: "none", color: "#000"}}>HOME</Link>
                <Link to='/about' style={{padding: 20, textDecoration: "none", color: "#000"}}>ABOUT</Link>
                <Link to='/contact' style={{padding: 20, textDecoration: "none", color: "#000"}}>CONTACT</Link>
                <Link to="/login" style={{padding: 20, textDecoration: "none", color: "#000"}}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header