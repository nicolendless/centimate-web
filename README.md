**💸 Centimate Web💸**
-----------------------------------------------------------------------

This is a **frontend application** for an expense tracking system, built with **Next.js (App Router)**. It interacts with a **separate backend API** (hosted in another [repository](https://github.com/nicolendless/centimate)), allowing users to log and create expenses.


**Features**
---------------

- **User Authentication** -- Secure login via API authentication.
- **Expense Management** -- View and create expenses via API.
- **Protected Routes** -- Middleware restricts access to authenticated users.
- **Pagination Support** -- Fetches expenses with paginated API calls.


**Tech Stack**
------------------

-   **Frontend**: Next.js 15, React, TypeScript
-   **Styling**: Tailwind CSS
-   **Backend API**: REST API (External repository)
-   **Authentication**: Cookie-based authentication (JWT stored in cookies)


**Setup Instructions**
-------------------------

### 1. **Set Up the Backend API**

> ⚠️ The backend API is required before running the frontend.\
> Please clone and set up the backend from **the separate API repository**.

```
git clone git@github.com:nicolendless/centimate.git
cd centimate
```

### 2️. **Set Up the Frontend**

After setting up the API, clone and run the frontend:

```
git clone git@github.com:nicolendless/centimate-web.git
cd centimate-web
npm install
```

### 3️. **Configure Environment Variables**

Create a `.env.local` file and specify the backend API URL:
```
API_URL=http://localhost:8080/api/v1
```

### 4. **Run the Development Server**
```
npm run dev
```

**Trade-offs & Future Improvements**
-------------------------------------------------------
❌ **Some error messages are not displayed in the UI** -- Instead, errors are thrown as exceptions, causing hard crashes in some cases.\
✅ **Solution:** Replace `throw new Error()` with UI feedback messages.

❌ **No Docker support yet** -- The project lacks containerization for deployment.\
✅ **Solution:** Create a `Dockerfile` and `docker-compose.yml` for easier setup.

❌ **Update & Delete are not implemented** -- The backend supports them, but the frontend doesn't.\
✅ **Solution:** Add UI for editing and deleting expenses.

❌ **No Sign-Up functionality** -- Only login is available.\
✅ **Solution:** Implement a Sign-Up page.

❌ **Dashboard should use a dedicated `ExpenseList` component** -- Currently, it fetches and renders expenses directly in `page.tsx`.\
✅ **Solution:** Refactor dashboard to use an `ExpenseList` component for better modularity.
