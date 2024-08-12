# Doc Hub - Secure Document Management Platform

## Project Overview
**Doc Hub** is a robust platform designed to securely manage and store documents. Users can create accounts, log in, and upload documents either publicly or privately. Publicly uploaded documents are visible to all users in the public vault, while privately uploaded documents are stored in a private vault, accessible only to the user.
The platform also offers a seamless document preview, download, and search functionality, providing users with a smooth and efficient experience.

## Key Features
1. **User Authentication:**
   * Users can create accounts and securely log in to the platform.
   * Authentication is implemented using JWT tokens, ensuring secure and validated user sessions.

![Screenshot (542)](https://github.com/user-attachments/assets/30d56e5f-ba53-470e-a51f-70d025b490ed)

![Screenshot (541)](https://github.com/user-attachments/assets/4498594b-6ed8-4fa4-96ac-3b66c4447ec6)


2. **Document Upload:**
   * Users can upload documents either publicly or privately.
   * Users can select if they want to keep the document private or public using the checkbox in uploading form.

![Screenshot (537)](https://github.com/user-attachments/assets/e99aa9ce-f3da-4b9f-909f-88caee02f6a6)


3. **Document Privacy:**
   * Public documents are stored in the public vault, accessible to all users.
   * Private documents are stored in the user's private vault, visible only to them.

![Screenshot (539)](https://github.com/user-attachments/assets/8e28644d-33a0-440a-9c14-ec84f7d46af9)

4. **Document Preview and Download:**
   * Before uploading, users can preview their documents to verify content.
   * Users can also download their documents during the preview process.

![Screenshot (538)](https://github.com/user-attachments/assets/ce9b3090-75e7-4d51-b5bf-f07c9d1f03b9)

  
5. **Document Search:**
   * In the public vault, users can search for documents by the username of the uploader.
   * In the private vault, users can search for their own documents by title.

![Screenshot (540)](https://github.com/user-attachments/assets/42516c2f-d5b8-4fc9-909d-9a05d410e704)


6. **Document Storage:**
   * The document is sent to backend and stored locally using blob.
  
7. **PDF Viewer:**
   * Users can open and view their PDF documents directly within the platform.
  
8. **High Performance:**
   * The platform is optimized to handle large amounts of data, providing a smooth and responsive user experience.

## Tech Stacks

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **State Management:** Context API

## Local Setup

### Prerequisites

* Node.js (v14.x or higher)
* MongoDB (Atlas)
* Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/doc-hub.git
cd doc-hub
```

2. **Install dependencies:**
   
For Backend:
```bash
cd server
npm install
```

For Frontend:
```bash
cd client
npm install
```

For Database(MongoDB): Set this as the local mongo atlas database url.
```bash
mongodb://127.0.0.1:27017/pdf-database
```

3. **Run the backend:** The backend server starts on localhost PORT: 5000
```bash
cd server
npm run dev
```

4. **Run the frontend:** The frontend client starts on localhost PORT: 3000
```bash
cd client
npm run start
```

5. **Access the platform:** Open your browser and go to http://localhost:3000 to start using Doc Hub.

6. **Document Storage:** Upon uploading the document, it gets stored in the `server/assets` directory/

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's style and passes all tests before submitting.

