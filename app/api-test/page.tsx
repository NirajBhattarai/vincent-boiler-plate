"use client";

import { useState } from "react";

export default function ApiTestPage() {
  const [getResponse, setGetResponse] = useState<any>(null);
  const [postResponse, setPostResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testGetEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setGetResponse(data);
    } catch (error) {
      setGetResponse({ error: "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  const testPostEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test: "Hello from frontend!",
          number: 42,
        }),
      });
      const data = await response.json();
      setPostResponse(data);
    } catch (error) {
      setPostResponse({ error: "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          API Endpoint Test
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* GET Test */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              GET /api/hello
            </h2>
            <button
              onClick={testGetEndpoint}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4"
            >
              {loading ? "Testing..." : "Test GET Request"}
            </button>
            
            {getResponse && (
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Response:</h3>
                <pre className="text-sm text-gray-700 overflow-auto">
                  {JSON.stringify(getResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* POST Test */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              POST /api/hello
            </h2>
            <button
              onClick={testPostEndpoint}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4"
            >
              {loading ? "Testing..." : "Test POST Request"}
            </button>
            
            {postResponse && (
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Response:</h3>
                <pre className="text-sm text-gray-700 overflow-auto">
                  {JSON.stringify(postResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            API Endpoint Information
          </h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>GET /api/hello</strong> - Returns a simple hello message with timestamp</p>
            <p><strong>POST /api/hello</strong> - Accepts JSON data and echoes it back with timestamp</p>
            <p>Both endpoints return JSON responses with status information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
