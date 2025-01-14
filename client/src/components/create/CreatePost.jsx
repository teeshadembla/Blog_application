import {Box, styled, FormControl, InputBase, Button, TextareaAutosize} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { categories } from '../../constants/data';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';


const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
    margin: 10px 10px 10px 10px;
    display: flex;
    flex-direction: row;
`

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`

const Textarea = styled(TextareaAutosize)`
    width: 1300px;
    margin-top: 50px;
    font-size: 18px;
    border: none;
`

const Container = styled(Box)`
    margin: 50px 100px
`

const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}

const CreatePost = () =>{
    const [post, setPost] = useState(initialPost);  
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
     
    const [file, setFile] = useState("");
    const {account} = useContext(DataContext);
    const location = useLocation();
    useEffect(()=>{
        const getImg = async() =>{
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file",file);

                //API Call for image uploading
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImg();
        post.categories = location.search?.split("=")[1] || 'All';
        post.username = account.username;
    }, [file])
    const handleChange = (e) =>{
        console.log({...post, [e.target.name]: e.target.value});
    }

    return(
        <>
        <Container>
            <Image src={url} alt='banner'/>
        </Container>

        <StyledFormControl>
            <label style={{marginLeft: "80px"}} htmlFor='fileInput'>
                <AddCircleIcon fontSize='large' color='action'/>
            </label>

            <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}></input>
            
            <InputTextField placeholder='Title' name='title' onChange={(e)=>handleChange(e)}/>
            <Button variant='contained' style={{marginRight: "80px"}}>Publish</Button>

        </StyledFormControl>

        <Textarea
            minRows={5}
            placeholder='Tell your story....'
            name='description'
            onChange={(e)=>handleChange(e)}
            style={{marginLeft: "80px", marginRight: "80px"}}
        />
        </>
    )
}

export default CreatePost;