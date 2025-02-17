"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import "./style.css";

const images = [
  "https://images.pexels.com/photos/22434934/pexels-photo-22434934/free-photo-of-beatiful-sunset-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/22504685/pexels-photo-22504685/free-photo-of-landscape-of-a-lake-by-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/22610592/pexels-photo-22610592/free-photo-of-view-of-green-trees-reflecting-in-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/22890392/pexels-photo-22890392/free-photo-of-lake-in-a-mountain-valley.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

// const MyCarousel = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [index, setIndex] = useState(0);
//   // eslint-disable-next-line no-undef
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   useEffect(() => {
//     startAutoSlide();
//     return () => stopAutoSlide();
//   }, []);

//   const startAutoSlide = () => {
//     stopAutoSlide();
//     intervalRef.current = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 2000);
//   };

//   const stopAutoSlide = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   useEffect(() => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollTo({
//         left: index * sliderRef.current.clientWidth,
//         behavior: "smooth",
//       });
//     }
//   }, [index]);

//   const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
//     stopAutoSlide();
//     isDragging.current = true;
//     startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
//     scrollLeft.current = sliderRef.current!.scrollLeft;
//   };

//   const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging.current || !sliderRef.current) return;
//     const x = "touches" in e ? e.touches[0].clientX : e.clientX;
//     const walk = (x - startX.current) * 1.5; // Adjust sensitivity
//     sliderRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//     startAutoSlide();
//   };

//   return (
//     <div className="relative w-full max-w-3xl mx-auto overflow-hidden perspective-1000">
//       <div
//         ref={sliderRef}
//         className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleMouseDown}
//         onTouchMove={handleMouseMove}
//         onTouchEnd={handleMouseUp}
//       >
//         {images.map((src, i) => (
//           <div key={i} className="shrink-0 max-w-full h-96 snap-center ">
//             <Image
//               src={src}
//               alt={`Slide ${i + 1}`}
//               width={800}
//               height={400}
//               className="w-full rounded-lg"
//             />
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default MyCarousel;

// {images.map((src, i) => (
//   <div key={i} className="flex">
//     {i === (index + 1) % images.length && (
//       <Image
//         src={src}
//         alt={`Slide ${i + 1}`}
//         width={800}
//         height={400}
//         className=" w-full !rounded-[40px] object-fill   select-none pointer-events-none cursor-pointer"
//       />
//     )}
//     <div
//       key={i}
//       className={clsx(
//         "shrink-0  flex justify-between items-center h-96 w-full snap-center transition-transform duration-500 relative select-none",
//         {
//           "opacity-100 scale-100 rotate-y-0 z-10 ": i === index,
//           // "opacity-60 scale-95 rotate-y-15 translate-x-5 z-0":
//           //   i === (index + 1) % images.length,
//           // "opacity-40 scale-90 rotate-y-25 translate-x-10 z-0":
//           //   i === (index + 2) % images.length,
//         }
//       )}
//     >
//       <Image
//         src={src}
//         alt={`Slide ${i + 1}`}
//         width={800}
//         height={400}
//         className=" w-full !rounded-[40px] object-fill   select-none pointer-events-none cursor-pointer"
//       />
//     </div>
//   </div>
// ))}

const Carousel = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // eslint-disable-next-line no-undef
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  }, [index]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    stopAutoSlide();
    isDragging.current = true;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    scrollLeft.current = sliderRef.current!.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const walk = (x - startX.current) * 2; // Adjust sensitivity
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
    velocity.current = walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      const direction = velocity.current > 0 ? -1 : 1;
      setIndex((prev) =>
        Math.max(0, Math.min(images.length - 1, prev + direction))
      );
    }
    startAutoSlide();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden perspective-1000 ">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={clsx(
              "w-full min-w-[80%] flex justify-center items-center h-96 snap-center transition-transform duration-500 relative select-none",
              {
                "opacity-100 scale-100 rotate-y-0 z-20": i === index,
                "opacity-70 scale-95 -rotate-y-10 translate-x-4 z-10":
                  i === (index + 1) % images.length,
                "opacity-70 scale-95 rotate-y-10 -translate-x-4 z-10":
                  i === (index - 1 + images.length) % images.length,
                "opacity-40 scale-90 -rotate-y-15 translate-x-6 z-0":
                  i === (index + 2) % images.length,
                "opacity-40 scale-90 rotate-y-15 -translate-x-6 z-0":
                  i === (index - 2 + images.length) % images.length,
              }
            )}
          >
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              width={800}
              height={400}
              className="w-full !rounded-[40px] object-fill select-none pointer-events-none cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
