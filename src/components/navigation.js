import React, {useState, useEffect} from 'react'
import { NavLink} from 'react-router-dom';

const Navigation = () => {

    return (
        <div className="App">     
            <div className="wrapper">
                <div id="wrap">
                    <nav className="siteNavigation_nav_links">
                        <div className="main_links_nav">
                           <div className="navigationpanel">
                                <NavLink className="mob_link home" to="/">Home</NavLink>
                                <NavLink className="mob_link about" to="/about">About</NavLink>
                                <NavLink className="mob_link about" to="/contact">Contact</NavLink>
                           </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div> 
    )
}

export default Navigation;