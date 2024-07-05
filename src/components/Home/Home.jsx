import React from 'react'
import{Link} from 'react-router-dom';
export default function Home() {
    return (
        <div className="w-full mx-auto max-w-7xl">
            <aside className="relative mx-2 overflow-hidden text-black rounded-lg sm:mx-16 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pt-10 pb-20 mx-auto sm:py-24 sm:px-6 lg:px-8">
                    <div className="max-w-xl gap-10 space-y-8 text-center sm:mt-1 mt-80 sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Download Now
                            <span className="hidden text-4xl sm:block"><h1>Coworking</h1></span>
                        </h2>

                        <Link
                            className="inline-flex items-center px-6 py-3 font-medium text-white bg-pink-700 rounded-lg hover:opacity-75"
                            to="/"
                        >
                            <svg
                                fill="white"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                            </svg>
                            &nbsp; Download now
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full h-full gap-4 pt-12 sm:my-20 sm:pt-1">
                    <img className="w-96" src="https://static.vecteezy.com/system/resources/previews/002/181/980/non_2x/business-people-working-together-coworking-space-with-creative-or-business-people-sitting-at-the-table-flat-modern-illustration-vector.jpg" alt="image1" />
                </div>
            </aside>

            <div className="grid place-items-center sm:mt-20">
                <img className="w-48 sm:w-96" src="https://img.freepik.com/free-vector/internet-order-delivery-tracking-gps-navigator-service-website-flat-design-element-pointer-magnifier-map-route-online-planning-path-finding_335657-2612.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711929600&semt=ais" alt="image2" />
            </div>

            <h1 className="py-10 text-2xl font-medium text-center sm:text-5xl">Finding Coworking Place...</h1>
        </div>
    );
}
