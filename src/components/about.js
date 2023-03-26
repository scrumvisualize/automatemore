import React, { useState, useEffect, useCallback } from 'react';

const appUrl = process.env.REACT_APP_URL;

const About = () => {

    var myImage = "images/vim.png";

  
    const About = () =>
        <div className='some-page-wrapper'>
            <div className='row header'>
                <h1>About me</h1>
            </div>
            <hr></hr>
            <div className='row'>
                <div className='aboutColumn'>
                    <div class="box leftside">
                        <div className='aboutImage'>
                            <img src="images/vim.png"></img>
                        </div>

                        <div className='aboutRole'>
                            <h2>Vinod Mathew</h2>
                        </div>
                        <div className='aboutRole'>
                            <h4>Automation Engineer @ <a href="https://www.teachstarter.com/">Teach Starter</a></h4>
                        </div>
                        <div className='socialoptions'>
                            <a href="https://github.com/scrumvisualize?tab=repositories">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm10.488 8.272l5.531 3.243-.686 1.162-5.532-3.243.687-1.162zm-1.456 3.113l6.185 1.739-.331 1.23-6.204-1.667.35-1.302zm-.672 2.813l6.498.65-.118 1.28-6.504-.586.124-1.344zm-.193 2.469h6.667v1.333h-6.667v-1.333zm8.833 3.333h-11v-7h1v6h9v-6h1v7zm-.852-8.704l-3.56-5.219 1.115-.76 3.559 5.219-1.114.76zm1.356-.841l-1.08-6.224 1.328-.231 1.081 6.224-1.329.231z" /></svg>
                            </a>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="box rightside">
                        <p>
                            Hey! , Hola!, Bonjour! , Hallå! , Nǐ hǎo! , Namaskaram! , I'm Vinod! I'm an automation engineer working at <a href="https://www.teachstarter.com/">Teach Starter</a>, in Brisbane. I am currently working on Cypress, Javascript and GitHub actions. 
                        </p>
                        <hr></hr>
                        <div>Other things about me:</div>
                        <ul className="profile data">
                            <li>I am originally from South India. I completed my engineering in 2002, later started my career in testing & completed an ISTQB certification.
                            </li>
                            {/* <li>I've worked in various industries such as Healthcare, Airline, Market Research, Job Management, Education and have experience in messaging standards like HL7, IATA.</li> */}
                            <li>On a daily basis, I'm responsible for creating e2e automation tests, creating api tests in Cypress and maintaining stable automation framework.</li>
                            <li>I have developed different web applications using Reactjs, Express, Axios, Sequelize, MySQL, Postgres, Java, Html, and javascript.</li>
                            <li>I love to play soccer during weekdays/weekends with my community soccer club in Brisbane. It helps my mental and physical wellbeing and keeps my spirits high!</li>
                            {/* <li>Last year I joined Lotus club in Brisbane and really enjoy playing cards.</li> */}
                            <li>One of my long time wishes was to create a blog site in Reactjs & I am passionate to do more projects within React</li>
                            <li>I am interested in innovation and ideas and would love to listen to people with similar vibes! </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    return <About />
}

export default About;