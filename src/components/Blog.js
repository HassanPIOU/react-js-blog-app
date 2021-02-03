import React, { useState,useEffect} from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {selectUserInput, setBlogData} from "../helpers/UserSlice";
import {BLOG_TOKEN} from "../config";
import loader from "../assets/img/loader.gif"

const Blog = () => {
    const searchInput = useSelector(selectUserInput)
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${BLOG_TOKEN}`

    const dispatch =  useDispatch()
    const [blog,setBlog] = useState()

    const [loading,setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
         axios
             .get(blog_url)
             .then((response) =>{
                 dispatch(setBlogData(response.data))
                 setBlog(response.data)
                 setLoading(false)
             })
             .catch((error) => {
                 console.log(error)
             })
    },[searchInput])

    return (
        <div className="blog_body">
              <h1 className="blog_header">Blog</h1>
            {loading ? <div><img src={loader} className="loading" alt=""/></div> :

             <div className="blogContent">
                    {blog?.articles?.map((blo,index) => (
                        <a className="blog" target="_blank" href={blo.url}>
                            <img src={blo.image} />
                            <div>
                                <h3 className="sourceName">
                                    <span>{blo.source.name}</span>
                                    <p>{blo.publishedAt}</p>
                                </h3>
                                <h1>{blo.title}</h1>
                                <p>{blo.description}</p>
                            </div>
                        </a>
                    ))}

                    {blog?.totalArticles == 0 && (
                        <h1 className="no__blogs">
                            No blogs available 😞. Search something else to read blogs on the
                            greatest platform.
                        </h1>
                    )}
                </div>
            }
        </div>
    )
}

export default Blog