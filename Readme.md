# MERN Stack Blogging Application

This is a feature-rich MERN (MongoDB, Express.js, React.js, Node.js) stack application designed to provide users with a seamless and engaging blogging experience. The backend folder contains the Express.js server code with MongoDB integration, while the frontend folder contains the React.js code with Tailwind CSS for responsive and modern UI design.

## Backend Setup

1. Navigate to the `backend` folder: `cd backend`.
2. Install the required dependencies: `npm install`.
3. Create a `.env.local` file in the root of the `backend` folder.
4. Set the following environment variables in the `.env` file:

```plaintext
mongoURI = <your_mongodb_uri>
port = <backend_server_port>
JWT_SECRET = <your_jwt_secret_key>
JWT_EXPIRY = "1d"
COOKIE_EXPIRY = 1
SMPT_HOST = <smtp_host>
SMPT_PORT = <smtp_port>
SMPT_SERVICE = <smtp_service>
SMPT_MAIL = <smtp_email>
SMPT_PASSWORD = <smtp_password>
CLOUDINARY_NAME = <cloudinary_name>
CLOUDINARY_API_KEY = <cloudinary_api_key>
CLOUDINARY_API_SECRET = <cloudinary_api_secret>
```

Replace the placeholders `<your_mongodb_uri>`, `<backend_server_port>`, `<your_jwt_secret_key>`, `<smtp_host>`, `<smtp_port>`, `<smtp_service>`, `<smtp_email>`, `<smtp_password>`, `<cloudinary_name>`, `<cloudinary_api_key>`, and `<cloudinary_api_secret>` with your specific values.

5. Start the backend server: `npm start`.

## Frontend Setup

1. Navigate to the `frontend` folder: `cd frontend`.
2. Install the required dependencies: `npm install`.
3. Start the frontend development server: `npm start`.

## Cloning and Using the Project

To clone and use this project, follow these steps:

1. Clone the repository: `git clone https://github.com/keshav2003garg/BlogScape.git`.
2. Follow the backend and frontend setup instructions mentioned above.
3. You are now ready to use the MERN stack blogging application!

## Key Features

- User Registration and Authentication: Create a new account or log in to an existing account to access the full functionality of the platform.
- Create Engaging Blog Posts: Write and publish captivating blog posts with a title, description, and optional photos to express your thoughts and experiences effectively.
- Interactive User Interface: Enjoy a modern and intuitive user interface built with React.js and enhanced with Tailwind CSS for a visually appealing.
- User Profiles: Customize your profile, view other bloggers' profiles, and showcase your published blog posts to establish a unique online presence.
- Categorization and Discovery: Organize your blog posts into categories and enable users to explore a wide range of topics through a convenient category-based navigation system.

## Live Project

You can experience the live project at [Live Project](https://bloggscape.vercel.app/). Feel free to explore the features, read blog posts, and engage with the vibrant blogging community.

For any questions or assistance, please don't hesitate to contact. Enjoy your blogging journey!