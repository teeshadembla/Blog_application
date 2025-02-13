import {Box, TextField, Button, styled, Typography} from '@mui/material';
import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {API} from '../../service/api.js'
import { DataContext } from '../../context/DataProvider.jsx';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    border: none;
    border-radius: 2px;
    justify-content: space-between;
`;

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    paddingTop: 10,
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;

`
const signupInitialValues = {
    name: '',
    username: '',
    password: '',
}

const loginInitialValues = {
    username: '',
    password:'',
}

const Login = ({isUserAuthenticated}) =>{
    const [toggle, SetToggle] = useState(false);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(loginInitialValues);

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const changeLoginToSignUp = () =>{
        SetToggle(true);
    }

    const changeSignUptoLogin = () =>{
        SetToggle(false);
    }

    //tracks the value of data entered in the signup field
    const onInputChange = (e) =>{
        console.log(signup);
        setSignup({...signup, [e.target.name] : e.target.value});
    }

    //tracks the value of data entered in the login field
    const onValueChange = (e) =>{
        console.log(login);
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const signupUser = async() => {
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError("");
            setSignup(signupInitialValues);
            SetToggle(false);
        }else{
            setError("Something went wrong. Please try again later.");
        }
    }

    const loginUser = async() =>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError("");
            setLogin(loginInitialValues);
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
           
            setAccount({username: response.data.username, name: response.data.name});
            isUserAuthenticated(true);
            navigate('/');
        
        }else{
            setError("Something went wrong. Please try again later")
        }
    }
    
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'
    return(
        <Component>
            <Box>
                <Image src={imageURL} alt='login'/>
                {toggle===false? 
                
                <Wrapper>
                    <TextField style={{margin: 8}} id="standard-basic" onChange={(e)=> onValueChange(e)} name='username' label="Username" variant="standard" />
                    <TextField style={{margin: 8}} id="standard-basic" onChange={(e)=>onValueChange(e)} name='password' label="Password" variant="standard" />
                    <Button style={{margin: 8, backgroundColor: '#FB641B',textTransform: 'none'}} onClick={loginUser} variant="contained">Login</Button>
                    <Typography style={{padding: 6, color: '#878787'}}>OR</Typography>
                    <Button onClick={changeLoginToSignUp} style={{padding: 6,  backgroundColor: '#fff', color:'#2874f0', boxShadow: '0 2px 4px 0 rgb(0 0 0/20%)', textTransform: 'none'}}>Create an account</Button>
                </Wrapper>
                
                :

                <Wrapper>
                    <TextField style={{margin: 8}} id="standard-basic" onChange={(e) => onInputChange(e)} name='name' label="Name" variant="standard" />
                    <TextField style={{margin: 8}} id="standard-basic" onChange={(e) => onInputChange(e)} name='username' label="Username" variant="standard" />
                    <TextField style={{margin: 8}} id="standard-basic" onChange={(e) => onInputChange(e)} name='password' label="Password" variant="standard" />
                    {error && <Typography style={{fontSize: 10, color: "#ff6161", lineHeight: 0, marginTop: 10,fontWeight: 600 }}>{error}</Typography>}
                    <Button onClick={signupUser} style={{margin: 8, backgroundColor: '#FB641B',textTransform: 'none'}} variant="contained">Sign Up</Button>
                    <Typography style={{padding: 6, color: '#878787'}}>Already have an account?</Typography>
                    <Button onClick={changeSignUptoLogin} style={{padding: 6,  backgroundColor: '#fff', color:'#2874f0', boxShadow: '0 2px 4px 0 rgb(0 0 0/20%)', textTransform: 'none'}}>Login</Button>
                </Wrapper>
                
                }
                
            </Box>
        </Component>
    )
}

export default Login