import {Grid} from '@mui/material';
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from './Posts';

const Home = () =>{
    return (
        <>
            <Banner></Banner>
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories/>
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;