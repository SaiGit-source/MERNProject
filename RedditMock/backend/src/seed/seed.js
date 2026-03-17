import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

dotenv.config();

const users = [
  { username: 'u/john_doe', email: 'john@example.com' },
  { username: 'u/jane_smith', email: 'jane@example.com' },
  { username: 'u/bob_wilson', email: 'bob@example.com' },
];

const postTemplates = [
  {
    title: 'Best VS Code Extensions for 2026',
    body: 'Here are my top 10 VS Code extensions that boost productivity. First on the list is GitHub Copilot, which uses AI to suggest code snippets and entire functions. Next is Prettier for automatic code formatting...',
    tags: ['vscode', 'productivity', 'tools'],
    upvotes: 42,
    authorIndex: 2,
    createdAt: new Date('2026-02-02')
  },
  {
    title: 'Understanding Async/Await in JavaScript',
    body: "Async/await makes asynchronous code look synchronous. Here's how it works under the hood. When you use the async keyword before a function, it automatically returns a Promise. The await keyword can only be used inside async functions...",
    tags: ['javascript', 'async', 'webdev'],
    upvotes: 31,
    authorIndex: 1,
    createdAt: new Date('2026-02-02')
  },
  {
    title: 'React Hooks Explained',
    body: 'React Hooks revolutionized how we write React components. Let me explain useState and useEffect. Before hooks, stateful logic could only be used in class components. Now, functional components can have state...',
    tags: ['react', 'javascript', 'frontend'],
    upvotes: 23,
    authorIndex: 1,
    createdAt: new Date('2026-02-02')
  },
  {
    title: 'MongoDB vs PostgreSQL',
    body: "Choosing between MongoDB and PostgreSQL depends on your use case. Here's my experience working with both in production. MongoDB shines when your data is document-oriented and schema flexibility matters...",
    tags: ['database', 'mongodb', 'postgresql'],
    upvotes: 8,
    authorIndex: 0,
    createdAt: new Date('2026-02-02')
  },
  {
    title: 'Getting Started with Node.js',
    body: "Node.js allows you to run JavaScript on the server side. Here's a beginner-friendly guide to setting up your first Node.js project. Start by installing Node.js from the official website, then use npm init to create a package.json...",
    tags: ['nodejs', 'javascript', 'backend'],
    upvotes: 15,
    authorIndex: 0,
    createdAt: new Date('2026-02-02')
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Post.deleteMany({});
    await User.deleteMany({});

    const createdUsers = await User.insertMany(users);
    console.log(`Inserted ${createdUsers.length} users`);

    const posts = postTemplates.map(({ authorIndex, ...post }) => ({
      ...post,
      author: createdUsers[authorIndex]._id,
    }));

    const createdPosts = await Post.insertMany(posts);
    console.log(`Inserted ${createdPosts.length} posts`);

    console.log('Seed complete');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
