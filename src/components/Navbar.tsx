import Link from "next/link";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const DropdownMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`bg-gray-800 rounded-lg border-gray-200 ${darkMode ? "dark:bg-gray-900 dark:border-gray-700" : ""}`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Homepage wrapped in the dark line */}
        <div className="border-b border-gray-700">
          <Link href="/">
            <span
              className={`self-center text-lg font-semibold whitespace-nowrap ${
                darkMode ? "text-white" : "text-gray-300"
              } hover:text-blue-500 dark:hover:text-blue-500`}
              style={{ padding: "0.5rem", margin: "0.5rem" }}
            >
              Homepage
            </span>
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-700 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* Soft Skills */}
            <li>
              <Link href="/softskills">
                <span
                  className={`block py-2 pl-3 pr-4 ${
                    darkMode ? "text-white" : "text-gray-300"
                  } rounded hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent`}
                  style={{ padding: "0.5rem", margin: "0.5rem" }}
                >
                  Soft Skills
                </span>
              </Link>
            </li>
            {/* Tech Skills with Dropdown */}
            <li>
              <div
                onClick={toggleDropdown} // Add onClick event to toggle the dropdown
                className={`flex items-center justify-between w-full py-2 pl-3 pr-4 ${
                  darkMode ? "text-gray-300" : "text-gray-300"
                } border-b border-gray-100 hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-600 md:dark:hover:bg-transparent`}
                aria-expanded={isDropdownOpen ? "true" : "false"} // Set aria-expanded based on the dropdown visibility
                style={{ padding: "0.5rem", margin: "0.5rem" }}
              >
                Tech Skills
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1 4 4 4-4" />
                </svg>
              </div>
              {/* Dropdown menu */}
              <div
                id="dropdownNavbar"
                className={`z-10 ${isDropdownOpen ? "block" : "hidden"} font-normal bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44 ${
                  darkMode ? "dark:bg-gray-700 dark:divide-gray-600" : ""
                }`}
              >
                <ul className="py-2 text-sm text-gray-300 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link href="/techskills/html">
                      <span
                        className={`block px-4 py-2 hover:bg-gray-600 ${
                          darkMode ? "dark:hover:bg-gray-500 dark:text-white" : "dark:text-gray-400"
                        }`}
                      >
                        HTML
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/techskills/css">
                      <span
                        className={`block px-4 py-2 hover:bg-gray-600 ${
                          darkMode ? "dark:hover:bg-gray-500 dark:text-white" : "dark:text-gray-400"
                        }`}
                      >
                        CSS
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/techskills/javascript">
                      <span
                        className={`block px-4 py-2 hover:bg-gray-600 ${
                          darkMode ? "dark:hover:bg-gray-500 dark:text-white" : "dark:text-gray-400"
                        }`}
                      >
                        JavaScript
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/techskills/react">
                      <span
                        className={`block px-4 py-2 hover:bg-gray-600 ${
                          darkMode ? "dark:hover:bg-gray-500 dark:text-white" : "dark:text-gray-400"
                        }`}
                      >
                        React
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/techskills/advanced-react">
                      <span
                        className={`block px-4 py-2 hover:bg-gray-600 ${
                          darkMode ? "dark:hover:bg-gray-500 dark:text-white" : "dark:text-gray-400"
                        }`}
                      >
                        Advanced React
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
