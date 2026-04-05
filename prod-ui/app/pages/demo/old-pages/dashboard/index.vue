<template>
    <div class="landing-page">
        <div class="left-section">
            <h1 class="intro-text">Welcome to <span class="highlight">Our Awesome Product!</span></h1>
            <p class="subtext">Discover amazing features and benefits that will transform your workflow and boost productivity.</p>
            <button class="learn-more-btn">🚀 Learn More</button>
        </div>
      <div class="right-section">
        <img src="/img/codecamp.jpg" alt="Landing Image" class="landing-image" />
      </div>
    </div>
  
    <!-- Tutorial Cards Section -->
    <div class="tutorial-cards">
      <h2 class="section-title">Top Tutorials</h2>
      <div class="card-container">
        <div v-for="course in courses" :key="course.id" class="course-card">
          <img :src="course.image" :alt="course.title" class="course-image" />
          <div class="course-content">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="instructor">{{ course.instructor }}</p>
            <div class="rating">
              <span class="stars">⭐ {{ course.rating }}</span>
              <span class="reviews">({{ course.reviews }})</span>
            </div>
            <div class="price">₱{{ course.price }}</div>
            <span v-if="course.bestseller" class="tag">Bestseller</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courses: [
          {
            id: 1,
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu, Developer and Lead Instructor",
            rating: 4.7,
            reviews: "361,653",
            price: 3990,
            image: "/img/python.png",
            bestseller: true,
          },
          {
            id: 2,
            title: "Web Development Bootcamp",
            instructor: "Colt Steele, Senior Instructor",
            rating: 4.8,
            reviews: "250,000",
            price: 2990,
            image: "/img/webdev.png",
            bestseller: true,
          },
          {
            id: 3,
            title: "Mastering React & Next.js",
            instructor: "Stephen Grider, Software Engineer",
            rating: 4.6,
            reviews: "180,500",
            price: 4590,
            image: "/img/react.png",
            bestseller: false,
          },
          {
            id: 4,
            title: "Mastering Cinematic Filmmaking",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.9,
            reviews: "12,340",
            price: 3990,
            image: "/img/cinematic.jpg",
            bestseller: true,
            },
            {
            id: 5,
            title: "Advanced Video Editing with Premiere Pro",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.8,
            reviews: "9,875",
            price: 3590,
            image: "/img/pr.jpg",
            bestseller: false,
            },
            {
            id: 6,
            title: "Color Grading Like a Pro: DaVinci Resolve Essentials",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.7,
            reviews: "7,230",
            price: 3490,
            image: "/img/color.png",
            bestseller: false,
            },
            {
            id: 7,
            title: "Mobile Videography: Shoot Stunning Videos with Your Phone",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.6,
            reviews: "5,890",
            price: 2990,
            image: "/img/mobile.jpg",
            bestseller: true,
            },
            {
            id: 8,
            title: "Wedding Films Masterclass: From Prep to Final Edit",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.9,
            reviews: "10,110",
            price: 4590,
            image: "/img/codecamp.jpg",
            bestseller: true,
            },
            {
            id: 9,
            title: "Creative Storytelling in Video Production",
            instructor: "Jefferson Canamo, Professional Videographer & Editor",
            rating: 4.8,
            reviews: "6,500",
            price: 3790,
            image: "/img/codecamp.jpg",
            bestseller: false,
            }
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Landing Page Section */
    .left-section {
    background-color: #130A27;
    padding: 3rem;
    text-align: center;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn 1s ease-in-out;
    }

    .intro-text {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
    }

    .highlight {
    color: #00d4ff;
    background: linear-gradient(to right, #00d4ff, #6c63ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }

    .subtext {
    font-size: 1.125rem;
    max-width: 520px;
    margin-bottom: 2rem;
    color: #dddddd;
    }

    .learn-more-btn {
    padding: 12px 28px;
    background: #00d4ff;
    color: #130A27;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 212, 255, 0.3);
    transition: background 0.3s ease, transform 0.2s ease;
    }

    .learn-more-btn:hover {
    background: #00aacc;
    transform: scale(1.05);
    }



  .landing-page {
    display: flex;
    height: 100vh;
    width: 100vw;
  }
  
  .left-section,
  .right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .left-section {
    background-color: #141126;
    padding: 2rem;
    text-align: center;
  }
  
  .right-section {
    background-color: #141126;
  }
  
  .landing-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .learn-more-btn {
    padding: 10px 20px;
    background-color: white;
    color:black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }
  
  .learn-more-btn:hover {
    background-color: #0056b3;
  }
  
  /* Tutorial Cards Section */
  .tutorial-cards {
    padding: 2rem;
    background-color: #fff;
  }
  
  .section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .card-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .course-card {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    transition: transform 0.3s ease;
  }
  
  .course-card:hover {
    transform: translateY(-5px);
  }
  
  .course-image {
    width: 100%;
    height: 170px;
    object-fit: cover;
  }
  
  .course-content {
    padding: 1rem;
  }
  
  .course-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .instructor {
    font-size: 0.875rem;
    color: #555;
    margin-bottom: 0.5rem;
  }
  
  .rating {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  .stars {
    color: #e59819;
    font-weight: bold;
  }
  
  .reviews {
    color: #777;
    margin-left: 0.3rem;
  }
  
  .price {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .tag {
    display: inline-block;
    background-color: #dff5e2;
    color: #157347;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .landing-page {
      flex-direction: column;
    }
  
    .left-section,
    .right-section {
      width: 100%;
    }
  
    .card-container {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  