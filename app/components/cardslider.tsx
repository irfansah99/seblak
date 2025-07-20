"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://i.pinimg.com/474x/5f/c1/6f/5fc16f01cbf535f37989306fa67da3ec.jpg",
  "https://i.pinimg.com/474x/61/3e/ef/613eef9409e0ca64cb64372f0fab04db.jpg",
  "https://i.pinimg.com/474x/06/40/01/064001280d9c315e010de603714a6b97.jpg",
  "https://i.pinimg.com/736x/75/7c/e8/757ce8e4edfd856976ca58a9f187ae1d.jpg",
  "https://i.pinimg.com/736x/f1/63/8a/f1638ad56e648fe6686cd682734a94d9.jpg",
  "https://i.pinimg.com/736x/8a/86/8d/8a868d806e5562d67af4b55e0df2fa81.jpg",
];

export default function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full mx-auto my-8 px-5 ">
      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-full"
        navigation={false} 
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className=" h-full  p-5">
              <img
                src={src}
                alt={`Slide ${idx}`}
                className="w-full  lg:h-[450px] h-50 object-cover rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol custom di bawah */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-cyan-500 hover:bg-cyan-700 text-white px-5 py-3 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-cyan-500 hover:bg-cyan-700 text-white px-5 py-3 rounded-full"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
