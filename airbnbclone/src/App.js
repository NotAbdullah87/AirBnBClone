import { Container, Typography } from '@mui/material';
import './App.css';
import Header from './components/header';
import SearchSection from './components/searchSection';
import MainSectionHero from './components/mainsectionHero';


function App() {
  return (
   <div>
    <Header />
    <Container>
   <SearchSection  />
   </Container>
   <MainSectionHero />

   </div>
  );
}

export default App; 