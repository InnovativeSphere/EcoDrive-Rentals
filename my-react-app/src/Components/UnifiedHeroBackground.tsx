import video1 from "../assets/assets/video1.mp4";
import image1 from "../../src/assets/assets/image1.png";
import image2 from "../../src/assets/assets/image2.png";
import image3 from "../../src/assets/assets/image3.png";
import arrow_btn from "../assets/assets/arrow_btn.png";
import play_icon from "../assets/assets/play_icon.png";
import pause_icon from "../assets/assets/pause_icon.png";
import { Link } from "react-router-dom";

interface HeroData {
  text1: string;
  text2: string;
}

interface UnifiedHeroBackgroundProps {
  heroData: HeroData;
  setHeroCount: (count: number) => void;
  heroCount: number;
  playStatus: boolean;
  setPlayStatus: (status: boolean) => void;
}

export const UnifiedHeroBackground = ({
  heroData,
  setHeroCount,
  heroCount,
  playStatus,
  setPlayStatus,
}: UnifiedHeroBackgroundProps) => {
  const commonBgClasses = "h-full w-full absolute top-0 left-0 object-cover";

  const renderBackground = () => {
    if (playStatus) {
      return (
        <video className={`${commonBgClasses}`} autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
      );
    } else if (heroCount === 0) {
      return (
        <img className={`${commonBgClasses}`} src={image1} alt="Banner-img1" />
      );
    } else if (heroCount === 1) {
      return (
        <img className={`${commonBgClasses}`} src={image2} alt="Banner-img2" />
      );
    } else if (heroCount === 2) {
      return (
        <img className={`${commonBgClasses}`} src={image3} alt="Banner-img3" />
      );
    }
    return null;
  };

  return (
    // This is the container that defines the visible area of the Hero section.
    // 'relative' is crucial for the absolute background to be contained.
    // 'min-h-screen' here defines the height of *this* specific section.
    // 'flex flex-col' and 'justify-end' are to position the content at the bottom.
    // 'pb-20' is padding inside this section, from the bottom.
    <section className="relative min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
      {/* The background itself is an immediate child of this relative section */}
      <div
        className={`
        ${commonBgClasses}
        transition-opacity duration-700 ease-in-out
        ${playStatus || heroCount >= 0 ? "opacity-100" : "opacity-0"}
      `}
      >
        {renderBackground()}
      </div>

      {/* Hero Content Overlay (positioned over the background) */}
      {/* This div is now positioned relative to the section, on top of the background. */}
      {/* It will push content towards the bottom due to 'justify-end' on the parent section. */}
      <div className="relative z-10 w-full">
        {" "}
        {/* w-full ensures it takes full width */}
        <div className="mx-4 mt-20 sm:mx-8 sm:mt-24 md:mx-12 md:mt-32 lg:mx-20 lg:mt-40 xl:mt-48 text-white">
          <div className="text-4xl leading-tight sm:text-5xl md:text-6xl md:leading-snug lg:text-7xl lg:leading-normal font-medium">
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
          </div>

          <Link to="/categories">
            <div
              className="
              flex items-center gap-3 w-fit mt-8 py-2 px-4 pl-5 rounded-full
              bg-red-600 text-white cursor-pointer
              hover:bg-red-700 hover:scale-105
              transition-all duration-300 ease-in-out
              sm:gap-4 sm:mt-10 sm:py-3 sm:px-6 sm:pl-8
              md:gap-5 md:mt-12 md:py-4 md:px-8 md:pl-10
              lg:gap-6 lg:mt-14
            "
            >
              <p className="text-sm font-medium sm:text-base md:text-lg">
                Explore the Features
              </p>

              <img
                src={arrow_btn}
                alt="Arrow Button"
                className="
                w-6 transition-transform duration-300
                hover:translate-x-1
                sm:w-7 md:w-8
              "
              />
            </div>
          </Link>

          <div className="mt-16 flex flex-col sm:flex-row justify-between items-center sm:mt-20 md:mt-24 lg:mt-28">
            <ul className="flex items-center gap-3 list-none">
              <li
                onClick={() => setHeroCount(0)}
                className={`w-2 h-2 rounded-full cursor-pointer bg-red-300 transition-colors duration-300 ${
                  heroCount === 0 ? "bg-white ring-1 ring-red-400" : ""
                }`}
              ></li>
              <li
                onClick={() => setHeroCount(1)}
                className={`w-2 h-2 rounded-full cursor-pointer bg-red-300 transition-colors duration-300 ${
                  heroCount === 1 ? "bg-white ring-2 ring-red-500" : ""
                }`}
              ></li>
              <li
                onClick={() => setHeroCount(2)}
                className={`w-2 h-2 rounded-full cursor-pointer bg-red-300 transition-colors duration-300 ${
                  heroCount === 2 ? "bg-white ring-2 ring-red-500" : ""
                }`}
              ></li>
            </ul>

            <div className="flex items-center gap-3 mt-4 sm:gap-4 sm:mt-0">
              <img
                onClick={() => setPlayStatus(!playStatus)}
                src={playStatus ? pause_icon : play_icon}
                alt="Play/Pause Icon"
                className="w-8 sm:w-9 md:w-10 cursor-pointer"
              />

              <p className="text-white text-base sm:text-lg font-semibold">
                See the Video
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
