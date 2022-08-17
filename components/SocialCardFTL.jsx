import React, { useRef, useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";

const SocialCardFTL = ({ card }) => {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("Learn Ruby on Rails - Full Course");
  const [image, setImage] = useState();
  const handleEdit = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div className="bg-white drop-shadow-primary rounded-secondary px-7 pt-8 pb-4 w-max">
      <div className="w-[290px] group">
        <div className="overflow-hidden w-full h-[150px]">
          <img
            className="scale-100  object-cover h-full w-full"
            onLoad={(img) => {
              setImage(card?.image?.url);
              console.log({ img });
            }}
            src={
              card?.image?.url
                ? card?.image?.url
                : "/assets/images/No-Image-Placeholder.webp"
            }
            alt="Card Banner"
          />
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between gap-x-4 ">
            {showInput ? (
              <input
                onChange={(e) => {
                  if (e.target.value) {
                    setTitle(e.target.value);
                  }
                }}
                className="px-2 py-1 w-[260px] text-sm placeholder:text-sm"
                placeholder={card?.title}
                autoFocus
              />
            ) : (
              <h6 className="line-clamp-2">{card?.title}</h6>
            )}

            <span
              onClick={handleEdit}
              className="cursor-pointer hidden group-hover:block"
            >
              {showInput ? <FaCheck /> : <FaPen />}
            </span>
          </div>

          <p className="text-xs line-clamp-5 mt-2 mb-8">
            {card.description}
            <span className="hidden group-hover:inline">
              <FaPen className=" ml-2 " />
            </span>
          </p>

          <span className="text-xs font-bold">
            🌎 {card?.url.split("/")[2]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialCardFTL;
