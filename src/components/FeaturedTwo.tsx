import { FaMobileAlt } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { BiSolidBellRing } from "react-icons/bi";
import { BsCloudArrowUpFill } from "react-icons/bs";
import { TbDeviceMobileSearch } from "react-icons/tb";
import { LuMonitorCheck } from "react-icons/lu";
import useAOS from "@/lib/aos-setup";

const FeaturedTwo = () => {
  useAOS();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div data-aos="fade-right" className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-dark-blue">
            Next-Gen Timetable Scheduling
          </h2>
          <p className="text-dark-blue text-md ">
            Step into the future of scheduling with our advanced system.
            Tailored for those who value precision, speed, and innovation.
          </p>
        </div>
        <div data-aos="fade-up" className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <LuMonitorCheck className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              Real-Time Scheduling
            </h3>
            <p className="text-pink">
              Instantly create and update schedules with real-time syncing,
              ensuring up-to-date timetables for all users.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <FaMobileAlt className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              Mobile Access
            </h3>
            <p className="text-pink">
              Access and manage your schedule on-the-go with our mobile-friendly
              platform, offering convenience and flexibility.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <TbReport className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              Automated Schedule Reports
            </h3>
            <p className="text-pink">
              Generate detailed timetable reports automatically, saving time and
              reducing manual errors.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BiSolidBellRing className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              Customizable Notifications
            </h3>
            <p className="text-pink">
              Receive tailored alerts for schedule changes and reminders,
              helping you stay informed and organized.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BsCloudArrowUpFill className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              Cloud-Based Scheduling
            </h3>
            <p className="text-pink">
              Enjoy secure, scalable, and accessible timetable data storage on
              the cloud.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <TbDeviceMobileSearch className="w-[24px] h-[24px] text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-dark-blue">
              User-Friendly Interface
            </h3>
            <p className="text-pink">
              Navigate easily with an intuitive interface designed for users of
              all technical levels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTwo;
