"use client";
import Image from "next/image";
import heroImg from "../../public/hero-image.png";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import useAOS from "@/lib/aos-setup";

const Hero = () => {
  useAOS();
  return (
    <div className="bg-white">
      <div className="mx-auto pb-6">
        <div className="relative isolate overflow-hidden bg-white px-6 pt-10 md:pt-0 sm:px-16 lg:flex lg:gap-x-16 lg:px-24">
          <div
            data-aos="fade-right"
            className="mx-auto max-w-lg text-start lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
          >
            <h2 className="leading-tight text-5xl sm:text-4xl font-bold tracking-tight text-dark-blue">
              Simplify timetable management and Organize day well
            </h2>
            <p className="mt-6 text-md leading-8 text-pink">
              Schedulify streamlines timetable creation, eliminates scheduling
              conflicts, and provides insightful analytics to help you optimize
              your institution&apos;s schedule.
            </p>
            <div className="mt-10 flex">
              <Link href="#" className="pink-button group">
                <div className="flex justify-center items-center p-[10px] gap-2">
                  <p className="font-semibold  transition-all duration-300 group-hover:mr-2">
                    Learn More
                  </p>
                  <FaArrowRightLong className="transition-all transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="relative flex items-center justify-center mt-16 md:mt-0 w-[450px] md:w-[750px]"
          >
            <Image
              src={heroImg}
              alt="Picture of the author"
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
