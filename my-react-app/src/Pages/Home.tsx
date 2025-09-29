
import  { useEffect, useState } from 'react';
import { UnifiedHeroBackground } from '../Components/UnifiedHeroBackground';
import { InfoSec } from '../Components/infoSec';

const HomePage = () => {
  // These states and useEffect are specific to the home page's hero section
  let heroData = [
    { text1: "Dive into what", text2: "You love" },
    { text1: "Indulge", text2: "Your passion" },
    { text1: "Give into", text2: "Your passion" },
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <UnifiedHeroBackground
        heroData={heroData[heroCount]}
        playStatus={playStatus}
        setPlayStatus={setPlayStatus}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
      <InfoSec /> 
    </>
  );
};

export default HomePage;