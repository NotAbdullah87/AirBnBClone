import { Container, Typography } from '@mui/material';
import './App.css';
import Header from './components/header';
import SearchSection from './components/searchSection';


function App() {
  return (
   <div>
    <Header />
    <Container>
   <SearchSection  />
   </Container>

   </div>
  );
}

export default App; 