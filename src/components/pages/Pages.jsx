import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbars from '../Navigation/Navbars';
import Home from '../Home/home'; 
import About from '../Ourstory/ourstorydetail';
import Events from '../gallarycompanents/events';
import Blog from '../blog/blog';
import Blogdetail from '../blog/blogdetail';
import Contact from '../contact/contactusdetail'; 
import SampleOrder from '../OrderSample/sample';
import Orderd from '../OrderSample/orderd';

const Pages = () => {
    return (
        <TransitionGroup>
            <CSSTransition
                classNames="fade"
                timeout={200}
            >
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ourStory" element={<About />} />
                        <Route path="/gallery" element={<Events />} />
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
