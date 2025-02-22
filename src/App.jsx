import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from "./components/Layout/Header"
import './App.css';

import Planner from "./components/Planner/Planner"
import TopicPlan from "./components/Planner/TopicPlan"
import EditTopic from "./components/Planner/EditPlain"
import PrevPlans from './components/Planner/PrevPlans';
import Home from './components/Home/Home';
import HeroPage from "./components/Hero/Hero"
import Authente from "./components/Authente/Authente"
import AboutUs from './components/About/About';
import Footer from "./components/Layout/Footer"
import PageNotFound from "./components/Restrictions/PageNotFount"
function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<HeroPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/topics' element={<PrevPlans />} />
          <Route path='/topic/:_id' element={<TopicPlan />} />
          <Route path='/topic/edit/:_id' element={<EditTopic />} />
          <Route path='/authente' element={<Authente />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
