import Navbar from "../Navbar";
import "./HomePage.css";
import {
  FeaturesSection,
  Footer,
  HeroCarousel,
  SearchSection,
  StatsSection,
  SuccessStoriesSection,
} from "./HomePageSections";

// Import images
import image2 from "../../assets/images/happy-couple/amish-thakkar-REmCdjjUeB8-unsplash.jpg";
import image3 from "../../assets/images/happy-couple/arto-suraj-U24mGMjnIIo-unsplash.jpg";
import image4 from "../../assets/images/happy-couple/awesome-sauce-creative-uRWekN5S39g-unsplash.jpg";
import image5 from "../../assets/images/happy-couple/mohammed-sultan-farooqui-JjOm8445mXw-unsplash.jpg";
import image1 from "../../assets/images/happy-couple/naeem-ad-qZqjCgYEWl4-unsplash.jpg";

const CAROUSEL_DATA = [
  {
    image: image1,
    alt: "Happy couple",
    title: "Where Love Stories Begin",
    subtitle: "Find your perfect match today",
    description: "Join thousands of happy couples who found their soulmate",
  },
  {
    image: image2,
    alt: "Sweet couple",
    title: "Your Perfect Match Awaits",
    subtitle: "Discover meaningful connections",
    description: "Connect with verified profiles from your community",
  },
  {
    image: image3,
    alt: "Married couple",
    title: "Trusted by Millions",
    subtitle: "India's #1 matrimonial platform",
    description: "Over 50,000 success stories and counting",
  },
  {
    image: image4,
    alt: "Wedding couple",
    title: "Safe & Secure Platform",
    subtitle: "Your privacy is our priority",
    description: "100% verified profiles with advanced privacy controls",
  },
  {
    image: image5,
    alt: "Loving couple",
    title: "Start Your Journey Today",
    subtitle: "Register free and find love",
    description: "Advanced matching algorithm finds your ideal partner",
  },
];

const STATS_DATA = [
  { value: "2M+", label: "Active Members" },
  { value: "50K+", label: "Success Stories" },
  { value: "500+", label: "Daily Matches" },
  { value: "100%", label: "Verified Profiles" },
];

const FEATURES_DATA = [
  {
    icon: "🔒",
    title: "Secure & Private",
    description: "Your data is protected with industry-standard encryption.",
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    description: "All profiles are manually verified for authenticity.",
  },
  {
    icon: "💬",
    title: "Instant Messaging",
    description:
      "Connect instantly with matches through our secure chat system.",
  },
  {
    icon: "🎯",
    title: "Smart Matching",
    description:
      "Advanced algorithms find compatible matches based on your preferences.",
  },
  {
    icon: "🎉",
    title: "Exclusive Events",
    description:
      "Participate in curated meetup events to meet potential matches.",
  },
  {
    icon: "🎧",
    title: "Premium Support",
    description: "24/7 customer support to help you find the perfect match.",
  },
];

const SUCCESS_STATS = [
  { value: "50,000+", label: "Happy Couples" },
  { value: "2,500+", label: "This Year" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Cities" },
];

const STORIES_DATA = [
  {
    image: image1,
    names: "Rahul & Priya",
    location: "Mumbai",
    date: "Oct 2025",
    text: "We found each other on Perfect Match and it's been an incredible journey...",
    badge: "Recent",
  },
  {
    image: image2,
    names: "Amit & Sneha",
    location: "Delhi",
    date: "Jan 2025",
    text: "Perfect Match helped us find our soulmates. We're happily married now...",
  },
  {
    image: image3,
    names: "Vikram & Meera",
    location: "Bangalore",
    date: "May 2025",
    text: "The smart matching algorithm is amazing! We connected instantly...",
  },
];

function HomePage() {
  return (
    <div>
      <Navbar userType="guest" sticky={true} />
      <HeroCarousel data={CAROUSEL_DATA} />
      <StatsSection data={STATS_DATA} />
      <SearchSection />
      <FeaturesSection data={FEATURES_DATA} />
      <SuccessStoriesSection stats={SUCCESS_STATS} stories={STORIES_DATA} />
      <Footer />
    </div>
  );
}

export default HomePage;
