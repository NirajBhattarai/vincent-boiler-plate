"use client";

import { useState } from "react";
import { User, LogOut, Copy } from "lucide-react";
import { getCurrentUser, removeStoredVincentJWT } from "../lib/vincent-auth";

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    removeStoredVincentJWT();
    window.location.reload();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              Vincent Boilerplate
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>{formatAddress(user.ethAddress)}</span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      Connected Wallet
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-900 flex items-center justify-between">
                      <span>{formatAddress(user.ethAddress)}</span>
                      <button
                        onClick={() => copyAddress(user.ethAddress)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Copy address"
                      >
                        <Copy className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                      </button>
                    </div>
                    {copySuccess && (
                      <div className="px-4 py-1 text-xs text-green-600 bg-green-50">
                        Address copied!
                      </div>
                    )}
                    <div className="border-t">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
}
