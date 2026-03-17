import PostCard from './PostCard';
import './PostList.css';

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>All Posts</h2>
      </div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
