import React, { useState } from "react";
import { Search, Link as LinkIcon } from "lucide-react";

const NewProject: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<string>("");

  const repos = [
    { name: "Weather-API", date: "Oct 28", icon: "⚡" },
    { name: "speedrun-dex", date: "Oct 26", icon: "🎮" },
    { name: "Lisk-Sea-Campaign", date: "Oct 26", icon: "🌊" },
    { name: "Lisk-sea-campaign-wk1", date: "Oct 18", icon: "⚡" },
    { name: "SETTLE", date: "Oct 6", icon: "⚡" },
  ];

  const templates = [
    {
      name: "Express.js REST API",
      description: "Get started with Express.js REST API in seconds.",
      image: "📦",
    },
    {
      name: "FastAPI Template",
      description: "A full-featured Python FastAPI template built for X402",
      image: "🐍",
    },
    {
      name: "GraphQL API Starter",
      description: "GraphQL API that can be deployed to X402",
      image: "📊",
    },
    {
      name: "Node.js Serverless",
      description: "Simple Node.js + X402 serverless example that serves APIs",
      image: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="text-black font-bold">▲</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-3 py-1.5 text-sm hover:bg-gray-900 rounded">
              Find...
            </button>
            <span className="text-sm">F</span>
            <button className="px-3 py-1.5 text-sm hover:bg-gray-900 rounded">
              Feedback
            </button>
            <button className="w-8 h-8 bg-yellow-400 rounded-full"></button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Let's publish your API</h1>
          <button className="px-4 py-2 border border-purple-600 text-purple-400 rounded hover:bg-purple-900/20">
            👥 Collaborate on a Pro Trial
          </button>
        </div>

        {/* Import Repository URL */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Enter a Git repository URL to deploy..."
                className="w-full bg-black border border-gray-800 rounded pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-gray-600"
              />
            </div>
            <button className="px-6 py-3 bg-white text-black rounded text-sm font-medium hover:bg-gray-200">
              Continue
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Import Git Repository */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Import Git Repository</h2>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <select
                    className="bg-transparent border-none text-sm focus:outline-none"
                    defaultValue="Jayy4rt"
                  >
                    <option>Jayy4rt</option>
                  </select>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-black border border-gray-700 rounded pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-0 border border-gray-800 rounded overflow-hidden">
                {repos.map((repo, index) => (
                  <div
                    key={repo.name}
                    className={`flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer ${
                      index !== 0 ? "border-t border-gray-800" : ""
                    }`}
                    onClick={() => setSelectedRepo(repo.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{repo.icon}</span>
                      <div>
                        <div className="font-medium">{repo.name}</div>
                        <div className="text-xs text-gray-500">{repo.date}</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 border border-gray-700 rounded text-sm hover:bg-gray-800">
                      Import
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clone Template */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Clone Template</h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800">
                  Filter
                </button>
                <button className="px-3 py-1.5 text-sm text-blue-400 hover:underline">
                  Browse All →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {templates.map((template) => (
                <div
                  key={template.name}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-white rounded flex items-center justify-center text-4xl flex-shrink-0">
                      {template.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-400">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <span>▲</span>
              <a href="#" className="hover:text-white">
                Home
              </a>
              <a href="#" className="hover:text-white">
                Docs
              </a>
              <a href="#" className="hover:text-white">
                Guides
              </a>
              <a href="#" className="hover:text-white">
                Academy
              </a>
              <a href="#" className="hover:text-white">
                Help
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
              <a href="#" className="hover:text-white">
                Legal
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>All systems normal</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewProject;
