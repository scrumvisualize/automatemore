import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';
import { useForm } from "react-hook-form";
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios'


const appUrl = process.env.REACT_APP_URL;

const blogListData = [
    {
        id: 1,
        heading: "React state vs Vue State",
        date: "22-May-2022",
        tag: "React",
        count: "3"
    },
    {
        id: 2,
        heading: "Cypress testing details",
        date: "22-May-2022",
        tag: "Cypress",
        count: "5"
    },
    {
        id: 3,
        heading: "Unix commands",
        date: "20-June-2022",
        tag: "Cypress",
        count: "3"
    }
]


const myDate = "##### 22 Feb 2023";
const myTags = "###### cypress";
const myImage = "![](https://picsum.photos/200)";
const myHeader = "### Main Header text here"; 
const myPara  = "Best heading added here.The most relevant data added here. Greatest of all time. Print the whole text here. Ideas are always usefull.... ";
const myCode = "``` const myData = Test ```";
const readMore = "[Some link details](https://localhost:8000)";

const Admin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [blogList, setBlogList] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [blogValue, setBlogValue] = React.useState(myImage + "\n" + myDate + "\n" + myTags + "\n" + myHeader + "\n" + myPara + "\n" + "\n" + myCode + "\n" +readMore);
    const [tagValue, setTagValue] = React.useState("");
    const [helperText, setHelperText] = useState('');
    const navigate = useNavigate();
    const [editBlogData, setEditBlogData] = useState([]);
    const [showAlert, setShowAlert] = React.useState(false);
    const [latestFeedback, setLatestFeedback] = useState([]);

   
    useEffect(() => {
        setShowAlert(true);
    }, []);



    useEffect(() => {
        setBlogList(blogListData);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('loginEmail');
        navigate("/login");
    };


    const onSubmit = () => {
        const email = localStorage.getItem('loginEmail');
        const blogId = localStorage.getItem('id');
        const params = {
            id: blogId,
            email: email,
            blogValue: blogValue, 
            tagValue: tagValue
        };
        const fetchData = async () => {
            console.log("Blog typed data::" + blogValue, tagValue , email);
            try {
                const res = await axios.put(`${appUrl}/service/createblogs`, {params});
                if (res.data.success) {
                    setHelperText("Successfully inserted the blog data !");
                    setBlogValue("");
                    setTagValue("");
                    window.location.reload(true);
                } else {
                    setHelperText(res.data.message);
                    localStorage.removeItem("id");
                    setBlogValue("");
                    setTagValue("");
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${appUrl}/service/listofblogs`);
              setBlogList(res.data.blogData);
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
}, []);


useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${appUrl}/service/feedback`);
        setLatestFeedback(res.data.feedData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
}, []);


    const handleBlogDelete = (idx) => {
        console.log("this is the blog id::" + idx);
        setDeleteDialog(true);
        const fetchData = async () => {
            try {            
                const res = await axios.delete(`${appUrl}/service/deleteblog`, {
                headers: {
                'Content-Type': 'application/json'
                },
                data: {
                'id': idx
                }
                });
                if (res.data.success) {
                    setHelperText("Blog delete Successfully!");
                    window.location.reload(true);
                } 
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }


    const handleBlogEdit = (idx) => {
        console.log("this is the blog id::" + idx); 
        localStorage.setItem('id', idx);
        const params = {
            id: idx,
        };
        const fetchData = async () => {
            try {            
                const res = await axios.get(`${appUrl}/service/findblogtoedit`, {params});
                setEditBlogData(res.data.blogData); 
                setBlogValue(res.data.blogData.blogdetails);
                setTagValue(res.data.blogData.tags);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }



    
    const Popup = () => {

        const showPopupAlert = () => {
            setShowAlert(false);
        }
          

        const style = {
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '250px',
          height: '100px',
          borderRadius: '5px',
          backgroundColor: '#6d418c',
          opacity: 1,
        }
      
        return (
          <div>
            {createPortal(
              <div style={style} >
                <span onClick={showPopupAlert} className="popuptext" id="myPopup"><strong>Success!</strong> This child is placed in the document body.</span>
              </div>,
              document.body
            )}
          </div>
        ) 
      }

    return (
        <div id="App">
            <div className='parent'>
                <div className='adminSection'>
                    <h1>Create a new blog</h1>
                    <div className='row'>
                        <div className='createBlogSection'>

                            <div data-color-mode="dark" className='container'>
                                <MDEditor
                                    className='reactEditorArea'
                                    id="blogdetails"
                                    name="blogdetails"
                                    value={blogValue}
                                    onChange={setBlogValue}
                                />
                                {/* <MDEditor.Markdown className='reactEditorOutput' source={blogValue} style={{ whiteSpace: 'pre-wrap' }} /> */}
                            </div>
                            <form>
                            <div className='row'>
                                <div className='tagsName'>
                                    <label>Tags:</label>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        placeholder="enter tags"
                                        value={tagValue}
                                        onChange={(e) => setTagValue(e.target.value)}     
                                    />
                                </div>
                                {/* <span className="validationmsg">
                                    {errors.tags && errors.tags.type === "required" && <span>Tag is required !</span>}
                                    {errors.tags && <span>{errors.tags.message}</span>}
                                </span> */}
                            </div>
                            </form>                 
                            <label>
                             <span className="adminSuccessMsg">{helperText}</span>
                            </label>
                            <div className='row'>
                                <div className='submitSection'>
                                    <input type="submit" onClick={onSubmit} className="submitBtn" />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='blogListSection'>
                    <div className="logout">
                        <input type="button" value="Logout" onClick={handleLogout} />
                    </div>
                    <h1>Edit blogs</h1>
                    <div className='row'>
                        <div className='editBlogSection'>
                            {
                                blogList.map(({ id, blogdetails, tags, count }) => (
                                    <div className='row'>
                                        <a key={id} className='blogitems'>
                                            <pre><span>{tags}</span> {blogdetails &&  blogdetails.length > 15 ? blogdetails.substring(0, 15) + '...' : blogdetails}<span>{count}</span></pre>
                                        </a>
                                        <div className='blogitems edit'>
                                            <button onClick={() => handleBlogEdit(id)}>Edit</button>
                                        </div>
                                        <div className='blogitems delete'>
                                            <button onClick={() => handleBlogDelete(id)}>Delete</button>
                                        </div>

                                    </div>
                                ))}
                        </div>
                    </div>
                    <label>
                        <span className="adminDeleteMsg">{helperText}</span>
                    </label>

                    <div className='row'>
                      <h1>Feedback</h1>
                        <div className='feedbackSection'>
                            {
                            latestFeedback.map( item => (
                            <div className='row'>
                                <a key={item.id} className='blogitems'>
                                    <pre><span>{item.id}</span> <span className='feedbackEmail'>{item.email}</span> <span className='feedbackComments'>{item.comments && item.comments.length > 50 ? item.comments.substring(0, 50) + '...' : item.comments}</span></pre>
                                </a>
                            </div>
                            ))}       
                        </div>
                    </div>
                </div>
                
            </div>
            {/* <Popup/> */}
        </div>
        
    )
}

export default Admin;