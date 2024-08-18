import Image from "next/image";
import image from "../../public/sectionOne.png";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import useAOS from "@/lib/aos-setup";

const features = [
  {
    name: "Instant Updates and Notifications",
    description:
      "Keep your schedule up to date with real-time updates and instant notifications. Schedulify ensures that your timetable is always accurate and reflects any changes promptly.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure Data Protection with SSL Encryption",
    description:
      "We prioritize the security of your scheduling data. Schedulify is secured with SSL encryption, ensuring that all timetable data is confidential and protected from unauthorized access.",
    icon: LockClosedIcon,
  },
  {
    name: "Reliable Database Management",
    description:
      "With automated database backups, Schedulify guarantees the integrity and availability of your scheduling records, ensuring that your timetable is always accessible when you need it.",
    icon: ServerIcon,
  },
];

export default function FeaturedOne() {
  useAOS();
  return (
    <div className="overflow-hidden bg-white">
      <div className="mx-auto max-w-full py-8 px-8 lg:px-16">
        <div className="mx-auto items-center grid grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div data-aos="fade-up" className="rounded-lg overflow-hidden">
            <Image
              src={image}
              alt="Picture of the author"
              width={1000}
              height={1000}
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>
          <div data-aos="fade-down" className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-dark-blue sm:text-4xl">
                Efficient Timetable Management
              </p>
              <p className="mt-6 text-md  text-dark-blue">
                Schedulify ensures quick and efficient scheduling of classes,
                meetings, and activities. Designed to streamline the timetable
                process, it provides a seamless experience for both educators
                and students.
              </p>
              <dl className="mt-6 max-w-xl space-y-6 text-base lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-dark-blue">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-dark-blue"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <br />
                    <dd className="inline text-sm text-pink">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
