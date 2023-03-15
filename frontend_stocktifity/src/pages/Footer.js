import React from "react";
import { GiSelfLove } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="flex justify-center w-full border-t-2 bg-[#6B728E] p-4 text-white">
      <p className="flex items-center">
        Created with&nbsp;
        <GiSelfLove fill="red" />
        &nbsp;by Stocktifity
      </p>
    </footer>
  );
};

export default Footer;
