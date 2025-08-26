"use client";

import { redirectToVincentConnect, handleVincentAuth } from "./lib/vincent-auth";
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";

export default function HomePage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { isAuthenticated } = handleVincentAuth();
    setIsAuthed(isAuthenticated);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthed && <Navbar />}
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vincent Boilerplate
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A minimal Next.js app with Vincent authentication
          </p>
          
          {isAuthed ? (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome! You're authenticated.
              </h2>
              <p className="text-gray-600">
                You can now build your app with Vincent authentication.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 mb-6">
                Connect your wallet to continue
              </p>
              <button
                onClick={() => redirectToVincentConnect()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Login with Vincent
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

