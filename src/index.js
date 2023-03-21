import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import "./css/home.css";
import "./css/login.css";
import "./css/about.css";
import "./css/blogsection.css";
import "./css/footer.css";
import "./css/admin.css";
import "./css/blogdetails.css";
import "./css/popularblogdetails.css";
import "./css/contact.css";
import { BrowserRouter, Route, Routes, Switch} from "react-router-dom";
import Navigation from './components/navigation';
import Home from "./components/home";
import Login from "./components/login";
import About from "./components/about";
import BlogItem from "./components/blogItem";
import BlogDetails from "./components/blogDetails";
import PopularBlogDetails from "./components/popularBlogDetails";
import Admin from "./components/admin";
import Contact from "./components/contact";

import Footer from "./components/footer";
import { ProtectedRoute } from "./components/protectedRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <>
  <QueryClientProvider client={client}>
  <BrowserRouter>
      <Navigation />
      <Routes>
          <Route path="/"  element={<Home />}>
          </Route>
          <Route path="/login"  element={<Login />}>
          </Route>
          <Route path="/about"  element={<About />}>
          </Route>
          <Route path="/contact"  element={<Contact />}>
          </Route>
          <Route path="/blogItem"  element={<BlogItem />}>
          </Route>
          <Route path="/blogDetails"  element={<BlogDetails />}>
          </Route>
          <Route path="/popularBlogDetails"  element={<PopularBlogDetails />}>
          </Route>
          <Route path="/admin" element={
              <ProtectedRoute >
                  <Admin/>
              </ProtectedRoute>
              }>
          </Route>
        </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    <Footer/>
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals