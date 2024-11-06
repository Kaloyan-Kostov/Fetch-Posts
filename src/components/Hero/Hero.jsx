import React from "react";

const Hero = ({ isDisplayed, isFiltered }) => {
  return (
    <div>
      {!isDisplayed && !isFiltered && (
        <div className="relative h-[80vh] flex justify-center items-center border text-white text-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-60"></div>

          <div className="relative z-10 px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 opacity-90">
              This is Fetch-Posts.
            </h1>
            <hr />
            <p className="text-xl md:text-2xl mb-6 mt-4 opacity-70">
              Utilizing Fake data provided by {`{JSON}`} Placeholder
            </p>
            <h1 className="text-lg md:text-xl mb-6 opacity-70">
              /posts
              <br />
              /users
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
