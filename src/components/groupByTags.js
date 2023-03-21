import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from "react-router-dom";

const appUrl = process.env.REACT_APP_URL;

const GroupByTags = () => {

    const [groupTags, setGroupTags] = useState([]);
    const [detailsTags, setDetailsTags] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [isShownFullDetails, setShowFullDetails] = useState(false);
    const navigate = useNavigate();

    const style = {
        width: '30px',
        height: '30px',
        marginLeft: '20px',
        backgroundColor: '#dae0f5',
        fontWeight: "900",
        opacity: 1,
        borderColor: "#fafcff"
    }

    useEffect(() => {
        setIsShown(current => !current);
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appUrl}/service/blogs/groupbyTags`);
                setGroupTags(res.data.grpData[0]);
                setDetailsTags(res.data.grpData[0]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
      }, []);


      useEffect(() => {
        setIsShown(current => !current);
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appUrl}/service/blogs/list`);
                setDetailsTags(res.data.blogData);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
      }, []);


    const handleClick = event => {
        setIsShown(current => !current);
    };

    /* On click on plus button in Home, system will group the blog contents based on tags. Below function does that.*/
    const showFullDetails = (idx) => {
        const filterdata = detailsTags.filter((item) => item?.id == idx);
        setShowFullDetails((prev) => (prev === idx ? false : idx));
        setFilterTags(
            detailsTags
                .filter((element) => element.tags === filterdata[0].tags)
                .map((item) => item.blogdetails)
        );
    }

    return (
        <div id="App">
            <div className='groupbyTags'>
                <div className='row'>
                    <div className='plusBtn'>
                        <input onClick={handleClick} style={style} type="button" value="+"></input>
                    </div>
                    {isShown && (
                        <div className='groupByTagData'>
                            {
                                groupTags.map(({ id, count, tagname }) => (
                                    <div key={id} className='row'>
                                        <div className='groupByTagInfo'>
                                            <input id="childBlogBtn" onClick={() => showFullDetails(id)} style={style} type="button" value="+"></input>
                                        </div>{" "} <br></br>

                                        {isShownFullDetails === id && (
                                            <div className='groupByTagRecord'>
                                                {
                                                    <div className="groupByTagData">
                                                        {filterTags.map((blogdetails, index) => (
                                                            <div className="blogdata" >
                                                                <a key={index} 
                                                                className='tagItemByGrp'
                                                                onClick={
                                                                    () =>
                                                                      navigate("blogDetails", {
                                                                        state: { id, blogdetails}
                                                                      })
                                                                    }
                                                                >
                                                                 <div className="datatagrecord">
                                                                 <ReactMarkdown  children={blogdetails} className='groupTagsImage groupHeader' remarkPlugins={[remarkGfm]}> 
                                                                </ReactMarkdown>
                                                                </div>   
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                        )}
                                        <div className="groupByTagInfo">
                                            <span className="groupByTagCount">{count}</span>
                                        </div>
                                        <div className="groupByTagInfo">
                                            <span className="groupByTagName">{tagname}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default GroupByTags;