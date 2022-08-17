import React, { useCallback, useRef, useState } from "react";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { FaDiscord } from "react-icons/fa";
import { SiSlack } from "react-icons/si";
import clsx from "clsx";
import SocialCardPreview from "./SocialCardPreview";
import { toPng } from "html-to-image";
import { useAppSelector } from "../service/redux/store";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import SocialCardFTL from "./SocialCardFTL";
import SocialCardCommon from "./SocialCardCommon";

const socialIcons = [
  {
    id: 1,
    title: "facebook",
    icon: <ImFacebook />,
  },
  {
    id: 2,
    title: "twitter",
    icon: <ImTwitter />,
  },
  {
    id: 3,
    title: "linkedin",
    icon: <ImLinkedin2 />,
  },
  {
    id: 4,
    title: "discord",
    icon: <FaDiscord />,
  },
  {
    id: 5,
    title: "slack",
    icon: <SiSlack />,
  },
];

const data = [
  {
    id: 1,
    type: "facebook",
    title: "Learn Ruby on Rails",
    description:
      "Learn Ruby on Rails in this full course for beginners. Ruby on Rails is a is a server-side web application framework used for creating full stack web apps.",
    photo: "/assets/images/card-banner-lg.png",
    link: "www.youtube.com",
  },

  {
    id: 2,
    type: "twitter",
    title: "Learn Ruby on Rails",
    description:
      "Learn Ruby on Rails in this full course for beginners. Ruby on Rails is a is a server-side web application framework used for creating full stack web apps.",
    photo: "/assets/images/card-banner-lg.png",
    link: "www.youtube.com",
  },
  {
    id: 3,
    type: "linkedin",
    title: "Learn Ruby on Rails",
    description:
      "Learn Ruby on Rails in this full course for beginners. Ruby on Rails is a is a server-side web application framework used for creating full stack web apps.",
    photo: "/assets/images/card-banner-lg.png",
    link: "www.youtube.com",
  },
  {
    id: 4,
    type: "discord",
    title: "Learn Ruby on Rails",
    description:
      "Learn Ruby on Rails in this full course for beginners. Ruby on Rails is a is a server-side web application framework used for creating full stack web apps.",
    photo: "/assets/images/card-banner-lg.png",
    link: "www.youtube.com",
  },
];

const SocialCards = ({ info, setInfo }) => {
  const [currentSocial, setCurrentSocial] = useState("facebook");
  const card = useSelector((state) => state.card.card);
  const loading = useSelector((state) => state.loading.loading);
  const ref = useRef(null);
  console.log({ loading, card });
  const handleCardDownload = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="py-10">
      {loading && (
        <div className=" flex justify-center mt-[60px] ">
          <Loader />
        </div>
      )}
      {!card && !loading && (
        <>
          <h5 className="text-center">Preview any social card</h5>

          <div className="w-max mt-6 md:mt-8 mx-auto border-[1px] border-primary_light rounded-secondary">
            {socialIcons.map((social) => (
              <button
                onClick={() => setCurrentSocial(social.title)}
                className={clsx(
                  "p-4 border-r-[1px] border-r-primary_light",
                  currentSocial === social.title
                    ? "shadow-primary shadow-white/30 shadow-inner bg-primary_light text-white"
                    : "shadow-primary_2 text-primary_light bg-gray_light",
                  social.id === 1
                    ? "rounded-tl-secondary rounded-bl-secondary"
                    : social.id === 5
                    ? "border-r-0 rounded-tr-secondary rounded-br-secondary"
                    : ""
                )}
                key={social.id}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </>
      )}
      {!loading && card && (
        <div className="mt-6 md:mt-12 flex items-center justify-center">
          <div ref={ref}>
            <SocialCardCommon data={card} />
          </div>
        </div>
      )}
      {!loading && !card && (
        <div className="mt-6 md:mt-12 flex items-center justify-center">
          <div ref={ref}>
            <SocialCardPreview
              data={data.filter((e) => e.type == currentSocial)[0]}
            />
          </div>
        </div>
      )}

      {!loading && (
        <>
          <div className=" mt-8 flex justify-center gap-x-4">
            <button
              onClick={handleCardDownload}
              className="w-[150px] md:w-[190px] text-primary_light text-base md:text-xl font-medium border-[1px] border-primary_light  py-2 md:py-3 px-2 md:px-5 rounded-primary"
            >
              Download Card
            </button>
            <button className="w-[150px] md:w-[190px] text-white text-base md:text-xl  font-medium bg-secondary py-2 md:py-3 px-2 md:px-5 rounded-primary">
              Copy URL
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialCards;
