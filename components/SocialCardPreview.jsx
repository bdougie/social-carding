import React, { useEffect, useRef, useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import Loader from "./Loader";

const SocialCardPreview = ({ type, data }) => {
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState(data.description);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      console.log(URL.createObjectURL(file));
    }
  }, [file]);

  const handleTitleEdit = () => {
    setShowTitleInput((prev) => !prev);
  };

  const handleDescriptionEdit = () => {
    setShowDescriptionInput((prev) => !prev);
  };

  return (
    <div className="bg-white drop-shadow-primary rounded-secondary px-7 pt-8 pb-4 w-max relative">
      <div className=" w-[290px]">
        <div className=" relative h-[140px] overflow-hidden">
          <img
            className="w-full h-full object-cover object-top"
            src={file ? URL.createObjectURL(file) : data.photo}
            alt="Card Banner"
          />

          <input
            accept="image/*"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute top-0 bottom-0 left-0 right-0  opacity-0"
          />
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between gap-x-4 ">
            {showTitleInput ? (
              <input
                onChange={(e) => {
                  if (e.target.value) {
                    setTitle(e.target.value);
                  }
                }}
                value={title}
                className="px-2 py-1 w-[260px] text-sm placeholder:text-sm"
                placeholder="Type title"
                autoFocus
              />
            ) : (
              <h6>{title}</h6>
            )}

            <span onClick={handleTitleEdit} className="cursor-pointer">
              {showTitleInput ? <FaCheck /> : <FaPen />}
            </span>
          </div>

          <div className="text-xs mt-2 mb-8">
            {showDescriptionInput ? (
              <textarea
                rows={6}
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
                }}
                defaultValue={description}
                className="px-2 py-1 w-[260px] text-sm placeholder:text-sm"
                placeholder="Type description"
                autoFocus
              />
            ) : (
              <p className="inline break-words">{description}</p>
            )}

            <span
              onClick={handleDescriptionEdit}
              className="cursor-pointer ml-2"
            >
              {showDescriptionInput ? (
                <FaCheck className="inline" />
              ) : (
                <FaPen className="inline" />
              )}
            </span>
          </div>

          <span className="text-xs font-bold">🌎 {data.type}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialCardPreview;
