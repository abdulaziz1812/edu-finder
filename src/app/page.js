"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import CollegeCardList from "./components/CollegeCardList";
import GraduatesGallery from "./components/GraduatesGallery";
import ResearchPapers from "./components/ResearchPapers";
import HomepageReviews from "./components/HomepageReviews";
import ScholarshipSection from "./components/ScholarshipSection";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/HowItWorks";
import BannerWithSearch from "./components/BannerWithSearch";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCollegeSearch = (query) => {
    setSearchQuery(query);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className=" bg-base-100 min-h-screen space-y-12">
      <BannerWithSearch onSearch={handleCollegeSearch} />


      {/* Search Results */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={1}
      >
        <SearchResults query={searchQuery} />
      </motion.div>

      {/* College Cards */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={2}
      >
        <CollegeCardList />
      </motion.div>

      {/* Graduates Gallery */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={3}
      >
        <GraduatesGallery />
      </motion.div>

      {/* Research Papers */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={4}
      >
        <ResearchPapers />
      </motion.div>

      {/* Homepage Reviews */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={5}
      >
        <HomepageReviews />
      </motion.div>

      {/* Scholarship Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={6}
      >
        <ScholarshipSection />
      </motion.div>

      {/* Scholarship Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={6}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Scholarship Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={6}
      >
        <HowItWorks />
      </motion.div>
    </main>
  );
}
