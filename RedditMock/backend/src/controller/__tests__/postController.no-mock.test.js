import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Post from '../../models/Post.js';
import User from '../../models/User.js';
import { getAllPosts } from '../postController.js';

let mongoServer;

const createResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('getAllPosts without model mocking', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'vitest' });
  });

  afterEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('fetches posts from a real in-memory database sorted by createdAt desc', async () => {
    const [olderAuthor, newerAuthor] = await User.create([
      {
        username: 'older_user',
        email: 'older@example.com'
      },
      {
        username: 'newer_user',
        email: 'newer@example.com'
      }
    ]);

    await Post.create([
      {
        title: 'Older post',
        body: 'older',
        author: olderAuthor._id,
        createdAt: new Date('2025-01-01T00:00:00.000Z')
      },
      {
        title: 'Newest post',
        body: 'newer',
        author: newerAuthor._id,
        createdAt: new Date('2026-01-01T00:00:00.000Z')
      }
    ]);

    const res = createResponse();

    await getAllPosts({}, res);

    expect(res.status).toHaveBeenCalledWith(200);

    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveLength(2);
    expect(payload[0].title).toBe('Newest post');
    expect(payload[1].title).toBe('Older post');
  });
});