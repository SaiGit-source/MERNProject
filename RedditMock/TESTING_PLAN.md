# Plan: Testing & Documentation for OpenForum Backend

## What is Vitest?

**Vitest** is a lightweight, fast unit testing framework for Node.js (and JavaScript). Key points:

- **Jest-compatible syntax** — Tests written for Jest work with Vitest
- **Global test functions** — `describe()`, `it()`, `expect()` available globally (configured in vitest.config.js)
- **Mocking support** — Built-in mocking for modules and functions
- **Fast execution** — Uses native ES modules and runs tests in isolation
- **Setup/Teardown** — `beforeEach()`, `afterEach()` for test lifecycle
- **Assertions** — Uses Chai-like expect() syntax for assertions

Your project already has:

- `vitest` v1.0.0 installed
- `supertest` v6.3.3 for HTTP request testing
- `vitest.config.js` configured with `globals: true` and `environment: 'node'`
- `npm test` script ready to run

---

## TL;DR

Write unit tests for `getAllPosts` controller using Vitest + Supertest for HTTP mocking, then create a comprehensive README.md documenting the API and project setup.

---

## Steps

### Phase 1: Unit Tests for getAllPosts Controller

**1. Create test file structure** (_depends on phase 2 setup_)

- File: `backend/src/controller/__tests__/postController.test.js`
- Import `describe`, `it`, `expect` (globally available)
- Import controller and dependencies

**2. Mock MongoDB Post model** (_parallel with step 3_)

- Mock `Post.find()` to return dummy data
- Mock `.populate()` method
- Mock `.sort()` method
- Use `vi.mock()` from Vitest

**3. Create test cases for getAllPosts** (_depends on step 2_)

- **Test 1:** "Should fetch all posts successfully"
  - Mock Post.find() to return array of posts
  - Call getAllPosts(req, res)
  - Verify res.status(200) called with correct data

- **Test 2:** "Should sort posts by createdAt descending"
  - Verify .sort({ createdAt: -1 }) was called

- **Test 3:** "Should populate author with username and email"
  - Verify .populate('author', 'username email') was called

- **Test 4:** "Should return 500 on database error"
  - Mock Post.find() to throw error
  - Verify res.status(500) called with error message

**4. Setup test utilities** (_parallel with step 3_)

- Create mock req/res objects using Sinon or simple objects
- Mock response methods: `.status()`, `.json()`
- Alternatively use Supertest for integration-style testing

---

### Phase 2: README.md Documentation

**5. Create README.md structure** (_can run in parallel with phase 1_)

- File: `backend/README.md`
- Sections:

  ```
  # OpenForum Backend

  ## Overview
  [Brief description of the backend

  ## Tech Stack
  [List: Node.js, Express, MongoDB, Mongoose, Vitest]

  ## Setup Instructions
  [.env config, npm install, npm run seed, npm start]

  ## Project Structure
  [Directory tree with descriptions]

  ## API Documentation
    - GET /api/posts
    - POST /api/posts (future)
    - etc.

  ## Testing
  [How to run tests, test coverage]

  ## Models
  [Post and User schema documentation]

  ## Environment Variables
  [Required: MONGODB_URI, PORT]
  ```

**6. Document GET /api/posts endpoint**

- Method: GET
- URL: `/api/posts`
- Request: No body/params
- Response (200):
  ```json
  [
    {
      "_id": "65...",
      "title": "Best VS Code...",
      "body": "Here are...",
      "author": { "username": "user1", "email": "..." },
      "upvotes": 42,
      "createdAt": "2026-03-16T...",
      "tags": []
    }
  ]
  ```
- Response (500): Error message

**7. Add testing instructions to README**

- Command: `npm test`
- Test file locations
- How to run specific tests
- Expected output

---

### Phase 3: Integration & Verification

**8. Run tests and verify** (_depends on phase 1_)

- Run `npm test` from backend directory
- All tests should pass ✓
- Check test output for coverage info

**9. Create root-level README.md** (_after backend README complete_)

- File: `backend/README.md`
- Include link to backend API docs from phase 2

---

## Relevant Files

- `backend/src/controller/postController.js` — Controller being tested
- `backend/src/models/Post.js` — Post schema
- `backend/src/models/User.js` — User schema (referenced in Post)
- `backend/vitest.config.js` — Vitest configuration (already set up)
- `backend/package.json` — Test script + dependencies
- `backend/src/controller/__tests__/postController.test.js` — NEW test file
- `backend/README.md` — NEW documentation

---

## Verification

1. **Test execution**
   - Run `npm test` in backend directory
   - All test cases pass (4+ tests for getAllPosts)
   - Test summary shows pass/fail count

2. **Test coverage**
   - Controller function fully covered
   - Both success (200) and error (500) paths tested
   - Mock verification ensures correct Mongoose calls

3. **README completeness**
   - Setup instructions work end-to-end
   - API endpoint documented with request/response examples
   - Testing section clear
   - Project structure described

---

## Decisions

- **Mocking vs. Database:** Will mock MongoDB using `vi.mock()` to avoid test database dependency and improve test isolation
- **Test utilities:** Use simple mock req/res objects (not Supertest integration tests initially) for unit test focus
- **Documentation level:** API docs will include schema examples, status codes, and error handling
- **README scope:** Covers backend only; frontend docs can be separate file or added later

---

## Further Considerations

1. **Frontend README** — Should create `frontend/README.md` documenting component structure, setup, and running dev server
2. **CI/CD integration** — Once tests are solid, could add GitHub Actions for automated testing
3. **Controller expansion** — Future POST endpoint will need similar test structure
