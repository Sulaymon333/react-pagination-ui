import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);
    // console.log(posts);

    // paginate
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };

    // 10 current posts per page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="container mt-5">
            <h1 className="text-primary text-center mb-3">Mango Blog</h1>
            <Posts posts={currentPost} loading={isLoading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    );
};

export default App;
