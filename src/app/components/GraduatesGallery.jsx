"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const graduateGroups = [
  { name: "Harvard Graduates", image: "/grad/1.jpg" },
  { name: "Stanford Graduates", image: "/grad/2.jpg" },
  { name: "MIT Graduates", image: "/grad/3.jpg" },
  { name: "Oxford Graduates", image: "/grad/4.jpg" },
  { name: "Cambridge Graduates", image: "/grad/5.jpg" },
];

export default function GraduatesSwiperGallery() {
  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          🎓 Graduates Gallery
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12 leading-relaxed">
          Celebrate the success stories of our graduates from top universities around the world.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {graduateGroups.map(({ name, image }, idx) => (
            <SwiperSlide key={idx}>
              <div className="overflow-hidden rounded-lg shadow-lg bg-white group cursor-pointer">
                <img
                  src={image}
                  alt={`${name} Group Picture`}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold ">{name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
