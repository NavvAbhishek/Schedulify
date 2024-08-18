"use client"
import FeaturedOne from "@/components/FeaturedOne";
import FeaturedTwo from "@/components/FeaturedTwo";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLtter";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";


const page = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <FeaturedOne/>
      <FeaturedTwo/>
      <NewsLetter/>
      <Testimonial/>
      <Footer/>
    </div>
  );
};

export default page;
