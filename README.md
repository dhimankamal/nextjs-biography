GossipGeeks Next.js Biography Web Application
This project is a web application built using the Next.js framework, TypeScript, Prisma ORM, MySQL database, and Tailwind CSS. The application aims to provide a platform for creating and managing biographical profiles of celebrities. The application is designed to cater to the needs of GossipGeeks, an online entertainment news and information platform, to create biographical profiles of celebrities and share them with their readers.

Features
Create, edit, and delete biographical profiles of celebrities
Search and filter celebrity profiles based on various criteria
Upload and store photos using Cloudinary
Server-side pagination and infinite scrolling
Search engine optimization (SEO) using Next.js SEO and sitemap modules
Google Analytics integration for detailed analytics and insights into user behavior and traffic patterns.
Installation
Clone the repository: git clone https://github.com/your-username/gossipgeeks-biography.git
Install dependencies: npm install
Create a .env.local file and add environment variables for DATABASE_URL and CLOUDINARY_URL. An example .env.local file is provided in the repository.
Run the migrations to create the database tables: npx prisma migrate dev
Start the development server: npm run dev
Usage
Once the development server is started, you can access the application by navigating to http://localhost:3000 in your web browser.

Deployment
The project can be deployed using the Next.js build and start commands. Follow the deployment instructions for your chosen hosting platform that supports Node.js.

Contributing
We welcome contributions to this project. To contribute, please fork the repository, create a new branch, and submit a pull request. Make sure to follow the coding conventions and best practices used in the project.

License
This project is licensed under the MIT License. See the LICENSE file for more information.
