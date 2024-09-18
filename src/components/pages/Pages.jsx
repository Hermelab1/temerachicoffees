import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbars from '../Navigation/Navbars';
import Home from '../Home/home'; 
import About from '../Ourstory/ourstorydetail';
import Ourfarm from '../gallarycompanents/ourfarm'; 
import Events from '../gallarycompanents/events';
import Training from '../gallarycompanents/training';
import Blog from '../blog/blog';
import Blogdetail from '../blog/blogdetail';
import Contact from '../contact/contactusdetail'; 
import SampleOrder from '../OrderSample/sample';
import Orderd from '../OrderSample/orderd';
import '../../style/pages.css'; // Ensure this path is correct

const Pages = () => {
    return (
        <TransitionGroup>
            <CSSTransition
                classNames="fade"
                timeout={600}
            >
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ourStory" element={<About />} />
                        <Route path="/ourfarm" element={<Ourfarm />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blogdetail" element={<Blogdetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/sampleOrder" element={<SampleOrder />} /> 
                        <Route path="/orderd" element={<Orderd />} />
                    </Routes>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

const AppWithRouter = () => (
    <Router>
        <Navbars />
        <Pages />
    </Router>
);

export default AppWithRouter;
