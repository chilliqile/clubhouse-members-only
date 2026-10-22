# Clubhouse Message Board

This project was done to let me apply and strengthen my understanding of authenticatio and authorization in web application development.

## Features

- **Message board:** View messages posted by users.
- **Session-Based Authentication:** Authenticate users and manage sessions using Express.js and PostgreSQL.
- **Access Control:** Require users to log in to view author information and posting dates.
- **Message Creation:** Require users to log in before creating messages.
- **Role-Based Authorization:** Restrict message deletion to administrator users.

# Installation

## Prerequisites

- Node.js
- npm
- PostgreSQL

## Steps

1. **Clone the repository**

```bash
git clone git@github.com:chilliqile/clubhouse-members-only.git
cd clubhouse-members-only
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

   Create a `.env` file inside the project root and configure the environment variables as such. Adjust the variable names to match those in your application.

```env
HOST=your_hostname
USER=your_username
DATABASE=your_database_name
PASSWORD=your_password
DATABASE_PORT=your_database_port
PORT=your_localhost_port
```

4. Set up the database

```SQL
CREATE TABLE members (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    hash text NOT NULL,
    membership_status text DEFAULT "Basic",
    admin boolean DEFAULT false
);

CREATE TABLE messages (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    body text NOT NULL,
    posted_at timestamptz NOT NULL DEFAULT now(),
    user_id int REFERENCES members(id)
)
```

5. **Start the application**

```bash
node app.js
```

6. **Open the application**

   Navigate to the local URL and port configured in your application. For example, http://localhost:3000.
