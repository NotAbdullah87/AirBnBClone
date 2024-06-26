import { Container, Typography } from '@mui/material';
import './App.css';
import Header from './components/header';
import SearchSection from './components/searchSection';
import MainSectionHero from './components/mainsectionHero';
import Footer from './components/footer';


function App() {
  return (
   <div>
    <Header />
    <Container>
   {/* <SearchSection  /> */}
   </Container>
   <hr style={{fontSize:'10px',marginTop:"2rem",opacity:"20%"}}></hr>
   <MainSectionHero />
    <Footer />
   </div>
  );
}

export default App; 