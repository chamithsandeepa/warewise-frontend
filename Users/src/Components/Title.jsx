import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-[1px] bg-black"></div>
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-light text-gray-600 tracking-wide">
          {text1}{" "}
          <span className="font-bold text-black tracking-wider uppercase">
            {text2}
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-black rounded-full"></div>
        <div className="w-8 h-[1px] bg-black"></div>
      </div>
    </div>
  );
};

export default Title;
