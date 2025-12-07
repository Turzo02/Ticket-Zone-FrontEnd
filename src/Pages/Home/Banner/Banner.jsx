import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import busImg from "/bus.jpeg";
import trainImg from "/train.jpeg";
import planeImg from "/plane.jpeg";
import launchImg from "/launch.jpeg";

const bannerData = [
  {
    id: 1,
    imgSrc: busImg,
    alt: "Modern bus traveling on the highway",
    title: "Comfortable Bus Journeys",
  },
  {
    id: 2,
    imgSrc: trainImg,
    alt: "High-speed train passing through a scenic route",
    title: "Fast & Reliable Train Rides",
  },
  {
    id: 3,
    imgSrc: planeImg,
    alt: "Passenger airplane flying across the sky",
    title: "Fly to Your Destination",
  },
  {
    id: 4,
    imgSrc: launchImg,
    alt: "Luxury launch sailing over calm water",
    title: "Relaxing Launch Experience",
  },
];

const Banner = ({ slides = bannerData, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, interval]);

  return (
    <div className="py-4 sm:py-4">
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out 
            ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <img
              src={slide.imgSrc}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Text */}
            <div className="absolute inset-0 flex justify-center items-end p-6 md:p-12 lg:p-20">
              <div
                className={`max-w-xl transition-all duration-700 delay-300
                ${index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-extrabold mb-2 text-white">
                  {slide.title}
                </h2>
              </div>
            </div>
          </div>
        ))}

        {/* Prev Button */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-10 transition hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-10 transition hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all
                ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
