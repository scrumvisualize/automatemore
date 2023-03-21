import React, { useState, useEffect, useCallback } from 'react';
import { Wave } from "react-animated-text";
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchBox";
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import axios from 'axios'
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

const appUrl = process.env.REACT_APP_URL;


const BlogItem = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [loadBlogs, setLoadBlogs] = useState(6);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }


  const { data, isLoading, isError } = useQuery(["blogs"], async () => {
    return await axios.get(`${appUrl}/service/listofblogs`).then((res) => res.data.blogData );
  });

  /* Type the blog text in the search box, system will filter the blog post based on the search criteria in the Home page */

  const results = React.useMemo(
    () =>
      data?.filter(blog => {
        return blog.blogdetails.toLowerCase().includes(searchTerm) || blog.blogdetails.toUpperCase().includes(searchTerm)
      }),
    [searchTerm, data]
  );
  
  
  
  if(isError){
    return  <div className='loadingDataError'><h1>Error in loading data..!</h1></div>
  }

  if(isLoading) {
    return <div className='loadingData'><h1>Loading...</h1></div>
  }



  const getClickCount = (idx) =>{
    console.log("Item Clicked::"+idx);
    const params = {
      id: idx
    }
    const fetchData = async () => {
      try {            
        const res = await axios.get(`${appUrl}/service/incrementblogviews`, {params});
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
    
  }
 
  const showMoreBlogs = () => {
    setLoadBlogs((preValue) => preValue + 3);
 }


const Columns = () =>
<div className='blogItems'>
  <div className='row'>
   <div className='blogArea'>
   {!results.length && (<div className="noSearchData"><Wave text="Sorry, we couldn't find any results..!" /></div>)}
   { 
    results?.slice(0, loadBlogs).map (({id, blogdetails, views, createdAt }) => (
    <a key={id}
    onClick={
      () =>
        navigate("blogDetails", {
          state: { id, blogdetails, views, createdAt}
        })
      } 
    >
      <div className='dataArea' onClick={() => getClickCount(id)} >
        <ReactMarkdown  children={blogdetails} className='dataDate renderElipsis tags readmoreLink views' remarkPlugins={[remarkGfm]}> 
        </ReactMarkdown>
        <div className='blogDate'>
            {moment(createdAt).format('DD-MMM-YYYY')}
             <a className='moreLink'>
              Read more →
             </a>
          </div>
      </div>
    </a>
   ))}
   </div>
   <div className="loadBlogs">
      <button onClick={() => {
           showMoreBlogs()
      }}>Load more...</button>
    </div>
  </div>
</div>  


    
    return (
      <>
        <SearchBox value={searchTerm} onChange={handleChange} />
        <Columns />
      </>
    );
}

export default BlogItem;