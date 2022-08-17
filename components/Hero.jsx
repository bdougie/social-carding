import React, { useRef } from "react";
import { TbSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setCard } from "../service/redux/CardSlice";
import { leLoadingToggle } from "../service/redux/LoadingSlice";
import { useAppSelector } from "../service/redux/store";
const Hero = () => {
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const link = useRef();
  function handleFetch() {
    dispatch(leLoadingToggle());
    // if(link.current.value.includes('facebook'))
    fetch(`/api/og/?url=${link.current.value}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setCard({ ...res.response, url: link.current.value }));
        dispatch(leLoadingToggle());
      });
  }
  return (
    <div className="h-[350px] md:h-[780px] md:max-h-screen bg-primary relative flex items-center justify-center text-center">
      <img
        className="absolute bottom-0 "
        src="/assets/images/hero-ellipse.png"
        alt="Hero Ellipse Photo"
      />

      <div className="space-y-5 md:space-y-9  relative z-10">
        <h1 className="text-left w-max mx-auto">
          <span className="text-[48px] md:text-[150px]">Social</span>
          <br />
          <span>Carding</span>
        </h1>

        <h4>Turn your links into clickable social cards</h4>

        <div className="w-[310px] md:w-full  flex justify-center gap-x-2 md:gap-x-3">
          <input
            ref={link}
            className="w-[180px] md:flex-1"
            type="text"
            placeholder="Try pasting a blog link"
          />
          <button
            onClick={handleFetch}
            className="bg-secondary p-2 md:p-3 rounded-primary text-white font-medium text-base md:text-xl flex items-center gap-x-2"
          >
            <TbSearch className="" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <img
        className="w-6 absolute left-1/2 -translate-x-1/2 bottom-8 cursor-pointer"
        src="/assets/icons/down-arrow.png"
        alt="Down Arrow Icon"
      />
    </div>
  );
};

export default Hero;
