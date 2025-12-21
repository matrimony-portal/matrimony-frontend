import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-icon">💍</span>
            <span className="logo-text">Bandan</span>
          </div>

          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#search">Search</a>
            </li>
            <li>
              <a href="#whyUs">Why us?</a>
            </li>
            <li>
              <a href="#successStories">Success Stories</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#footer">Contact</a>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <button className="btn login-btn">Login</button>
          <button className="btn register-btn">Register</button>
          <button className="btn subscribe-btn">👑 Subscribe</button>
        </div>
      </div>

      <div className="home-happy-couple">
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="1000">
              <img
                src="src/assets/images/happy-couple/naeem-ad-qZqjCgYEWl4-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/amish-thakkar-REmCdjjUeB8-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/arto-suraj-U24mGMjnIIo-unsplash.jpg"
                className="d-block w-100"
                alt="happy couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/awesome-sauce-creative-uRWekN5S39g-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/awesome-sauce-creative-uRWekN5S39g-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/mohammed-sultan-farooqui-JjOm8445mXw-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/monojit-dutta-MU5dYw2pmiY-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/alan-morales-NegpLeQFDh4-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/picnu-IXJJiTahl_s-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/pradeep-potter-cLKTteolrWc-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="src/assets/images/happy-couple/sagar-shrestha-WNYPL_-8hEc-unsplash.jpg"
                className="d-block w-100"
                alt="sweet couple"
              />
              <div className="custom-carousel-caption">
                <h5>Where the love stories begin</h5>
                <p>Find your perfect match Today</p>
                <p>Join Thousands of happy couples who found their soulmate</p>
              </div>
            </div>
          </div>

          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="5"
              aria-label="Slide 6"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="6"
              aria-label="Slide 7"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="7"
              aria-label="Slide 8"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="8"
              aria-label="Slide 9"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="9"
              aria-label="Slide 10"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="10"
              aria-label="Slide 11"
            ></button>
          </div>
        </div>
      </div>

      <div className="home-stats">
        <div className="stat-item">
          <h1>2M+</h1>
          <p>Active Members</p>
        </div>

        <div className="stat-item">
          <h1>50K+</h1>
          <p>Success Stories</p>
        </div>

        <div className="stat-item">
          <h1>500+</h1>
          <p>Daily Matches</p>
        </div>

        <div className="stat-item">
          <h1>100%</h1>
          <p>Verified Profiles</p>
        </div>
      </div>

      <div className="hero-search-section">
        <h1 className="hero-title">Find Your Perfect Life Partner</h1>
        <p className="hero-subtitle">
          Trusted by millions. Join the most successful matrimonial platform.
        </p>

        <div className="search-card">
          <div className="search-row">
            <div className="field">
              <label>I'm looking for</label>
              <select>
                <option>Select</option>
                <option>Man</option>
                <option>Woman</option>
              </select>
            </div>

            <div className="field">
              <label>Age</label>
              <select>
                <option>From</option>
                <option>18</option>
                <option>21</option>
                <option>25</option>
              </select>
            </div>

            <div className="field">
              <label>To</label>
              <select>
                <option>To</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
              </select>
            </div>
          </div>

          <div className="search-row single">
            <div className="field">
              <label>Religion</label>
              <select>
                <option>Any</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
              </select>
            </div>
          </div>

          <button className="search-btn">Search Matches</button>
        </div>

        <div className="hero-actions">
          <button className="register-btn">Register Free</button>
          <button className="login-btn">Log In</button>
        </div>
      </div>

      <div className="why-choose-section">
        <h2 className="section-title">Why Choose Perfect Match?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src="/icons/secure.png" alt="Secure" />
            <h4>Secure & Private</h4>
            <p>
              Your data is protected with industry-standard encryption. Complete
              privacy control over your profile.
            </p>
          </div>

          <div className="feature-card">
            <img src="/icons/verified.png" alt="Verified" />
            <h4>Verified Profiles</h4>
            <p>
              All profiles are manually verified for authenticity. Meet genuine
              people looking for serious relationships.
            </p>
          </div>

          <div className="feature-card">
            <img src="/icons/chat.png" alt="Messaging" />
            <h4>Instant Messaging</h4>
            <p>
              Connect instantly with matches through our secure chat system.
              Start meaningful conversations.
            </p>
          </div>

          <div className="feature-card">
            <img src="/icons/match.png" alt="Smart Matching" />
            <h4>Smart Matching</h4>
            <p>
              Advanced algorithms find compatible matches based on your
              preferences and interests.
            </p>
          </div>

          <div className="feature-card">
            <img src="/icons/events.png" alt="Events" />
            <h4>Exclusive Events</h4>
            <p>
              Participate in curated meetup events to meet potential matches in
              person.
            </p>
          </div>

          <div className="feature-card">
            <img src="/icons/support.png" alt="Support" />
            <h4>Premium Support</h4>
            <p>
              24/7 customer support to help you throughout your journey to find
              the perfect match.
            </p>
          </div>
        </div>
      </div>

      <div className="success-stories-section">
        <div className="success-header">
          <h2>💑 Success Stories</h2>
          <p>
            Real couples, real love stories. Your happily ever after starts
            here!
          </p>
        </div>

        <div className="success-stats-card">
          <div className="stat-box">
            <h3>50,000+</h3>
            <span>Happy Couples</span>
          </div>

          <div className="stat-box">
            <h3>2,500+</h3>
            <span>This Year</span>
          </div>

          <div className="stat-box">
            <h3>95%</h3>
            <span>Success Rate</span>
          </div>

          <div className="stat-box">
            <h3>200+</h3>
            <span>Cities</span>
          </div>
        </div>
      </div>

      <div className="stories-cards-section">
        <div className="stories-grid">
          {/* Card 1 */}
          <div className="story-card">
            <div className="story-image">
              <img
                src="src/assets/images/succes_stories_img/c4.avif"
                alt="Rahul & Priya"
              />
              <span className="badge">Recent</span>
            </div>

            <h3>Rahul & Priya</h3>
            <p className="story-meta">📍 Mumbai &nbsp; 💐 Married Oct 2025</p>

            <p className="story-text">
              "We found each other on Perfect Match and it's been an incredible
              journey. The platform made it so easy to connect with
              like-minded..."
            </p>

            <div className="story-info">
              <p>
                <strong>Met:</strong> Speed Dating Event
              </p>
              <p>
                <strong>Time to Match:</strong> 2 months
              </p>
              <p>
                <strong>Status:</strong> Happily Married
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="story-card">
            <div className="story-image">
              <img
                src="src/assets/images/succes_stories_img/c2.jpg"
                alt="Amit & Sneha"
              />
            </div>

            <h3>Amit & Sneha</h3>
            <p className="story-meta">📍 Delhi &nbsp; 💐 Married Jan 2025</p>

            <p className="story-text">
              "Perfect Match helped us find our soulmates. The verification
              process ensured we only met genuine people. We're happily..."
            </p>

            <div className="story-info">
              <p>
                <strong>Met:</strong> Online Platform
              </p>
              <p>
                <strong>Time to Match:</strong> 1 month
              </p>
              <p>
                <strong>Status:</strong> Happily Married
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="story-card">
            <div className="story-image">
              <img
                src="src/assets/images/succes_stories_img/c3.avif"
                alt="Vikram & Meera"
              />
            </div>

            <h3>Vikram & Meera</h3>
            <p className="story-meta">
              📍 Bangalore &nbsp; 💐 Married May 2025
            </p>

            <p className="story-text">
              "The smart matching algorithm of Perfect Match is amazing! We
              connected instantly and found we had so much in common..."
            </p>

            <div className="story-info">
              <p>
                <strong>Met:</strong> Cultural Evening
              </p>
              <p>
                <strong>Time to Match:</strong> 6 weeks
              </p>
              <p>
                <strong>Status:</strong> Happily Married
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>Our Story</li>
              <li>How it Works</li>
              <li>Trust & Safety</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>FAQ</li>
              <li>Report Profile</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Community Guidelines</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-bottom">
          © 2025 Perfect Match. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
