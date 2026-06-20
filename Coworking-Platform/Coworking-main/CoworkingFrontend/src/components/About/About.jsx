import React from 'react'

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container px-6 m-auto text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src="https://scx2.b-cdn.net/gfx/news/hires/2014/14-researchshow.jpg"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
                      Finding place for temporary offices and meeting rooms..
                      </h2>
                      <p className="mt-6 text-gray-600">
                         Our Coworking  is an innovative online platform designed to help professionals, startups, and businesses effortlessly find temporary office spaces and meeting rooms anytime, anywhere. Whether you're traveling, working remotely, or simply in need of a flexible workspace, our platform connects you to fully-equipped, professional environments across multiple locations. With an intuitive interface and real-time availability, users can easily search, filter, and book spaces that meet their specific needs—be it for an hour, a day, or longer durations.</p>

                         
<p className="mt-6 text-gray-600">
What sets our platform apart is its commitment to providing a pure working environment—spaces that are not only functional but also quiet, clean, and productivity-focused. We ensure that every listing meets high standards for connectivity, privacy, and comfort, fostering a seamless work experience. This project bridges the gap between mobility and professionalism, empowering users to maintain peak productivity regardless of where they are.
                 </p>
                  </div>
              </div>
          </div>
      </div>
  );
}