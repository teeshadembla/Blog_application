import {Box, styled, FormControl, InputBase, Button, TextareaAutosize} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

const UpdatePost = () =>{
    const [post, setPost] = useState(initialPost);  
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
     
    const [file, setFile] = useState("");
    const {account} = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const fetchData = async()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        const getImg = async() =>{
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file",file);

                //API Call for image uploading
                try{
                    const response = await API.uploadFile(data);
                    post.picture = response.data;
                }catch(err){
                    console.log(err,"File hasn't even been able to be uploaded")
                }
            }
        }
        getImg();
        post.categories = location.search?.split("=")[1] || 'All';
        post.username = account.username;
    }, [file])

    const handleChange = (e) =>{
        setPost({...post, [e.target.name]: e.target.value});
        console.log(post);
    }

    const updateBlogPost = async() =>{
        let response = await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }

    return(
        <>
        <Container>
            <Image src={url} alt='banner'/>
        </Container>

        <StyledFormControl encType="multipart/form-data">
            <label style={{marginLeft: "80px"}} type='file' htmlFor='fileInput'>
                <AddCircleIcon fontSize='large' color='action'/>
            </label>

            <input type='file' name='file' id='fileInput' style={{display: 'none'}} onChange={(e) => {
                console.log("Selected file:", e.target.files[0]);
                setFile(e.target.files[0])}
                }>

                </input>
            
            <InputTextField placeholder='Title' value={post.title} name='title' onChange={(e)=>handleChange(e)}/>
            <Button variant='contained' style={{marginRight: "80px"}} onClick={()=>updateBlogPost()}>Update</Button>

        </StyledFormControl>

        <Textarea
            minRows={5}
            placeholder='Tell your story....'
            name='description'
            value={post.description}
            onChange={(e)=>handleChange(e)}
            style={{marginLeft: "80px", marginRight: "80px"}}
        />
        </>
    )
}

export default UpdatePost;