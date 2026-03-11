-- TECH SAVVY Code Camp – Entity Relationship Schema
-- Import this file into Vuerd (ERD Editor) for visualization and editing.
-- Compatible with MySQL / MariaDB syntax.

-- =============================================================================
-- News & Updates
-- =============================================================================

-- Community submissions (pending/approved/rejected) – admin dashboard
CREATE TABLE news_submissions (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  description TEXT,
  image_url VARCHAR(500),
  date DATE NOT NULL,
  link VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  author VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  images JSON,
  headline_index INT DEFAULT 0
);

-- Approved news items shown on landing & news pages (synced from API or local)
CREATE TABLE approved_news (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  description TEXT,
  image_url VARCHAR(500),
  date DATE NOT NULL,
  link VARCHAR(500),
  images JSON,
  headline_index INT DEFAULT 0
);

-- =============================================================================
-- Calendar
-- =============================================================================

CREATE TABLE calendar_events (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50),
  description TEXT,
  link VARCHAR(500)
);

-- =============================================================================
-- Courses
-- =============================================================================

CREATE TABLE courses (
  id VARCHAR(36) PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  rating VARCHAR(10),
  review_count INT DEFAULT 0,
  duration VARCHAR(50),
  price VARCHAR(50),
  level VARCHAR(50),
  badge VARCHAR(50),
  image VARCHAR(500),
  description TEXT,
  learn_items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- Featured Projects
-- =============================================================================

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  url VARCHAR(500),
  image VARCHAR(500),
  alt VARCHAR(255)
);

-- =============================================================================
-- User & Dashboard
-- =============================================================================

CREATE TABLE profiles (
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  middle_name VARCHAR(100),
  email VARCHAR(255),
  address TEXT,
  contact_number VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(100),
  date_of_birth DATE,
  gender VARCHAR(20),
  occupation VARCHAR(100),
  bio TEXT,
  avatar VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  text TEXT,
  time VARCHAR(50),
  read BOOLEAN DEFAULT FALSE,
  icon VARCHAR(100),
  user_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- Optional relationships (for ERD display)
-- =============================================================================
-- approved_news.id can reference news_submissions.id when an item is approved
-- notifications.user_id -> profiles.id (if you add user_id to profiles)
-- For a minimal schema without FKs, the above tables are standalone.
