import React, { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, NavLink } from 'react-router-dom';
import BlogItem from "./blogItem";
import ReactDom from 'react-dom';
import { Wave } from "react-animated-text";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import moment from 'moment';
import GroupByTags from "./groupByTags";

const appUrl = process.env.REACT_APP_URL;


const repoData = [
  {
    id: 1,
    repoName: "sss"
  },
  {
    id: 2,
    repoName: "devchoice"
  },
  {
    id: 3,
    repoName: "reactcoding"
  },
  {
    id: 4,
    repoName: "vmblogs"
  },
  {
    id: 5,
    repoName: "soccerpep"
  },
  {
    id: 6,
    repoName: "vinmatblogs"
  }

]


const loveData = [
  {
    id: 1,
    image: "/images/soccer3.png"
  },
  {
    id: 2,
    image: "/images/coding1.png"
  },
  {
    id: 3,
    image: "/images/food.png"
  },
  {
    id: 4,
    image: "/images/idea.png"
  }


]

const blogData = [
  {
    id: 1,
    date: "25 Jan 2023",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Cypress setup blog",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 2,
    date: "22 Jan 2022",
    photo: "https://media.graphassets.com/8EB6ktlTjaRaGvyT9NYQ",
    heading: "React state details",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 3,
    date: "22 Jan 2021",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Javascript timeout",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 4,
    date: "21 Jan 2022",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Playwright tool setup",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 5,
    date: "21 Jan 2022",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Unix commands",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 6,
    date: "22 Jan 2022",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Github actions run",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 7,
    date: "22 Jan 2022",
    photo: "https://media.graphassets.com/8EB6ktlTjaRaGvyT9NYQ",
    heading: "Vue state vs React state",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  }
]

const popularData = [
  {
    id: 1,
    topViews: 875,
    date: "22 Jan 2022",
    photo: "https://media.graphassets.com/8EB6ktlTjaRaGvyT9NYQ",
    heading: "React state",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 2,
    topViews: 27899,
    date: "21 Jan 2022",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Unix commands",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 3,
    topViews: 352,
    date: "21 Jan 2021",
    photo: "https://media.graphassets.com/uS7v3eV4SGP7QasetB2a",
    heading: "Handling Vue State",
    blogDetails: "The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },
  {
    id: 4,
    topViews: 5764,
    date: "22 Jan 2022",
    photo: "https://media.graphassets.com/8EB6ktlTjaRaGvyT9NYQ",
    heading: "Cypress text field",
    blogDetails: "Best heading added here. The most relevant data added here. Greatest of all time. Wont be a good idea play here always."
  },

]


const BlogSection = () => {

  const [repoList, setRepoList] = useState(repoData);
  const [interests, setInterests] = useState(loveData);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);

  const [popularResults, setPopularResults] = useState([]);
  const navigate = useNavigate();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 1920px)'
  });

  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${appUrl}/service/listofblogs`);
        setPopularResults(res.data.blogData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);



  const topTwo = popularResults.sort((a, b) => b.views - a.views).slice(0, 3)

  const SingleShot = () =>
    <div className='repoItems'>
      <div className='row'>
        <div className='shots'>
          {
            repoList.map(({ id, repoName }) => (
              <a key={id} href="https://github.com/scrumvisualize">
                <div key={id} className='shotSection'>
                  <div key={id} className='shotdataArea'>
                    <p key={id}>{repoName}</p>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>


  const MyInterests = () =>
    <div className='interestItems'>
      <div className='row'>
        <div className='loveItem'>
          {
            interests.map(({ id, image }) => (
              <a key={id}>
                <div key={id} className='loveSection'>
                  <div key={id} className='lovedataArea'>
                    <img key={id} src={image} />
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>

  const MostPopularBlogs = () =>
      <div className='row'>
        <div className='trendingArea'>
        {!topTwo.length && (<div className="noSearchData"><Wave text="Sorry, we couldn't load any trending blogs..!" /></div>)}
        { topTwo?.map (({id, blogdetails, views, createdAt }) => (
          <a> 
            <div key={id} 
             onClick={
              () =>
                navigate("popularBlogDetails", {
                  state: { id, blogdetails, views, createdAt}
                })
              } 
             className='popularArea'>
              <ReactMarkdown  children={blogdetails} className='dataDate renderElipsis tags readmoreLink views' remarkPlugins={[remarkGfm]}> 
              </ReactMarkdown>
              <div className='blogDate'>
                {moment(createdAt).format('DD-MMM-YYYY')}
                 <a className='readmoreLink'>
                  Read more →
                 </a>
                 <div className='blogViews'>
                {views > 999 ? (views / 1000).toFixed(2) + "K" : views}
                </div>
              </div>
            </div>
          </a>
        ))} 
         
        </div>
      </div>
    

  const MySponsor = () =>
    <div className='mainsponsors'>
      <div className='row'>
        <div className='sponsors'>
        <div className="column">
          <div className='sponsorImage'>
            <a href="https://orangevalleygroup.com/">
               <img src="images/orangevalley.png" />
            </a>
          </div>
          </div>
          <div className="column">
          <div className='sponsorImage'>
          <a href="https://www.facebook.com/southsidesoccerstuds/">
               <img src="images/SSSImg.png" />
            </a>
            </div>
          </div>
          <div className="column">
            <div className='sponsorImage'>
              <a href="https://loanhouselendingsolutions.com.au/">
               <img src="images/loanhouse.png" />
              </a>
            </div>
          </div>
          <div className="column">
          <div className='sponsorImage'>
            <a href="https://lachlan-miller.me/">
              <h4>Lachlan Miller</h4>
              <p><span className='motivators'>Great developer working in Vue.js team & Cypress.</span></p>
              <p><span className='motivators'>Have a read on his book about <b>Design Patterns for Vue.js</b> </span></p>
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>

  const BottomSection = () =>
    <div className='bottomSection'>
      <div className='bottomrow'>
        <NavLink className="bottom_link" to="/login">Login</NavLink>
      </div>
    </div>

  return (
    <div id="App">
      <div className='logoheader'>
        <img src="images/automatelogo.png" />
        {/* {isDesktopOrLaptop && <h1>Blogs</h1>} */}
      </div>
      <h2>GitHub Repos</h2>
      <img className='setionImgDropStyle' src="images/repo.svg" alt="drop" />
      <div className='container'>
        <SingleShot />
      </div>
      <h2>Things I Love</h2>
      <img className='setionImgDropStyle' src="images/love.svg" alt="drop" />
      <div className='container'>
        <MyInterests />
      </div>
      <h2>Collection Of Blogs</h2>
      <img className='setionImgDropStyle' src="images/try.svg" alt="drop" />
      <BlogItem />
      <h2>Trending Blogs</h2>
      <img className='setionImgDropStyle' src="images/try.svg" alt="drop" />
      <MostPopularBlogs />
      <h2>Group By Tags</h2>
      <div className='row'>
        <GroupByTags/>
      </div>
      <div className='row'>
          <div className='bannerImage'>
          <img src="images/bannerImg.png"></img>
          </div>
      </div>
      <h2>Proud Supporters</h2>
      <div className='container'>
        <MySponsor />
      </div>
      <h2>Let's kick some goals</h2>
      <div className='row'>
          <div className='soccerInvites'>
          <div className="column">
            <div className='soccerInviteImg'>
              <img src="images/soccerbanner1.png"></img>
            </div>
          </div>
          <div className="column">
            <div className='soccerInviteImg'>
              <div className='inviteText'>
                <h2>Join Us</h2>
                <p>
                  <span>
                    <div className='richtextjoining'>
                      <p>
                        Are you a committed soccer player ? Interested in playing 7 - a side game or occasional 9 - a side game. 
                        If your answer is Yes, please join us for regular fun.
                        Click on our SSS logo below which will direct to our FB page.
                      </p>
                        <p>
                          <a href="https://www.facebook.com/southsidesoccerstuds/">
                            <img src="images/SSSImg.png" />
                          </a>
                        </p>
                    </div>
                  </span>
                </p>
              </div>
            </div>
          </div>
          </div>
      </div>
      <BottomSection />
    </div>
  )
}



export default BlogSection;