import { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        setError('Failed to load posts. Is the backend running?');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="home">
      <PostList posts={posts} />
    </main>
  );
}

export default Home;
