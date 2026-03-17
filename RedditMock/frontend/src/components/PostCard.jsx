import './PostCard.css';

function PostCard({ post }) {
  const author = post.author?.username ?? 'Unknown';
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="post-card">
      <div className="post-votes">
        <button className="vote-button">▲</button>
        <span className="vote-count">{post.upvotes}</span>
        <button className="vote-button">▼</button>
      </div>
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <div className="post-meta">
          <span className="post-meta-item">Posted by <span className="post-author">{author}</span></span>
          <span className="post-meta-item">·</span>
          <span className="post-meta-item">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
