import React from 'react';
import { useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const PopularBlogDetails = () => {

  const location = useLocation();
  const blogId = location.state.id;
  const blogDetails = location.state.blogdetails;
  const blogViews = location.state.views;
  const blogDate = location.state.createdAt;

    return (
        <div id="App">
            <div className='blogDetailsSection'>
                <div className='row'>
                    <div className="individual-blogs">  
                       <div className='blogTextPara'>
                       <ReactMarkdown  children={blogDetails} className='container popularImage' remarkPlugins={[remarkGfm]}> 
                        </ReactMarkdown>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularBlogDetails;