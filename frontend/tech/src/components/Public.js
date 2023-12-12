import { Link } from "react-router-dom";
import React from 'react';

const Public = () => {
  const content = (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white text-lg font-bold">Tech</div>
            {/* Add your navigation links here */}
            <div className="space-x-4">
              <Link to="/register" className="btn btn-primary text-white"> Sign Up </Link>
              <Link to="/login" className="btn btn-light text-white"> Login </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Body */}
      <main className="flex-grow p-8">
        <section className="bg-white p-8 rounded-md shadow-md">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold"> Welcome to <span className="text-blue-500">Tech</span> </h1>
          </header>
          <p className="text-center text-gray-600 mb-4"> Tech is a social media platform for developers. </p>
          <p className="text-center text-gray-600 mb-6"> Create a profile, share posts, and get help from other developers. </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p> Tech &copy; 2021 </p>
        </div>
      </footer>
    </div>
  );
  return content;
};

export default Public;
