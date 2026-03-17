import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../models/Post.js', () => ({
  default: {
    find: vi.fn()
  }
}));

import Post from '../../models/Post.js';
import { getAllPosts } from '../postController.js';

const createResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('getAllPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all posts sorted by newest first', async () => {
    const posts = [
      { title: 'Newest post' },
      { title: 'Older post' }
    ];

    const sort = vi.fn().mockResolvedValue(posts);
    const populate = vi.fn().mockReturnValue({ sort });
    const res = createResponse();

    Post.find.mockReturnValue({ populate });

    await getAllPosts({}, res);

    expect(Post.find).toHaveBeenCalledTimes(1);
    expect(populate).toHaveBeenCalledWith('author', 'username email');
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(posts);
  });

  it('returns a 500 response when fetching posts fails', async () => {
    const error = new Error('Database unavailable');
    const sort = vi.fn().mockRejectedValue(error);
    const populate = vi.fn().mockReturnValue({ sort });
    const res = createResponse();

    Post.find.mockReturnValue({ populate });

    await getAllPosts({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Failed to fetch posts',
      error: 'Database unavailable'
    });
  });
});