import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import useAOS from "@/lib/aos-setup";
import Image from "next/image";
import avatar1 from "../../public/avatars/avatar1.png";
import avatar2 from "../../public/avatars/avatar2.png";
import avatar3 from "../../public/avatars/avatar3.png";
import avatar4 from "../../public/avatars/avatar4.png";
import avatar5 from "../../public/avatars/avatar5.png";
import avatar6 from "../../public/avatars/avatar7.png";

const Testimonial = () => {
  useAOS();
  return (
    <div>
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <div className="w-full bg-white px-5 py-12 md:py-12">
          <div className="w-full max-w-6xl mx-auto">
            <div data-aos="fade-right" className="text-center max-w-xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-dark-blue">
                What people <br />
                are saying.
              </h1>
              <h3 className="text-md mb-5 text-black">
                Dive into the experiences of our satisfied users. Discover
                firsthand accounts of how Schedulify is transforming the way
                they manage and organize their daily schedules. Real stories,
                real results.
              </h3>
              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-40 h-1 rounded-full bg-blue-600"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
              </div>
            </div>
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-1/3">
                <div data-aos="fade-up-right" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar1} alt="" width={500} height={500}  className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Kenzie Edgar.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-2xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink text-sm font-normal">
                        As a project manager, Schedulify has been a
                        game-changer. The real-time scheduling and automated
                        updates have drastically reduced our organizational
                        workload, allowing us to focus more on productivity
                        and less on planning.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
                <div data-aos="fade-down-right" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar2} alt="" width={500} height={500}  className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Stevie Tifft.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink font-normal">
                        I was skeptical about switching to a new scheduling
                        system, but I&apos;m glad I did. The mobile integration
                        means I can manage my team&apos;s schedules from
                        anywhere. It&apos;s incredibly convenient and
                        user-friendly.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div data-aos="fade-up" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar3} alt="" width={900} height={900}  className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Tommie Ewart.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink font-normal">
                        The seamless integration of Schedulify into our daily
                        routines has been remarkable. It&apos;s streamlined our
                        scheduling process and improved our team&apos;s overall
                        efficiency.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
                <div data-aos="fade-down" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar4} alt="" width={500} height={500}  className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Charlie Howse.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink font-normal">
                        Schedulify is a must-have for any growing business. The
                        ability to handle multi-location scheduling effortlessly
                        has made it easier for us to expand without worrying
                        about scheduling conflicts.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div data-aos="fade-up-left" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar5} alt="" width={500} height={500}  className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Nevada Herbertson.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink font-normal">
                        As an HR professional, ensuring smooth scheduling
                        across departments is crucial. Schedulify not only
                        simplifies scheduling but also ensures we&apos;re always
                        on top of deadlines and meeting times.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
                <div data-aos="fade-down-right" className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <Image src={avatar6} alt="" width={500} height={500}  className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-xl uppercase text-dark-blue">
                        Kris Stanton.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-xl leading-none italic font-bold text-dark-blue mr-1">
                        &quot;
                      </span>
                      <span className="text-pink font-normal">
                        The customizable notifications feature has been a
                        lifesaver for our remote team. We&apos;re instantly
                        notified of any schedule changes, allowing us to adapt
                        quickly. Schedulify has truly modernized our scheduling
                        process.
                      </span>
                      <span className="text-xl leading-none italic font-bold text-dark-blue ml-1">
                        &quot;
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
