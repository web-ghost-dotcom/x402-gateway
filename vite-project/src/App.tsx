import React, { useState } from "react";
import {
  Search,
  Grid,
  List,
  MoreVertical,
  Activity,
  TrendingUp,
  TrendingDown,
  Link2,
  ExternalLink,
  Shield,
  Download,
  Calendar,
  LogOut,
} from "lucide-react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import MarketplaceListingPage from "./components/MarketplaceListingPage";

type Page =
  | "dashboard"
  | "new-project"
  | "project-overview"
  | "analytics"
  | "marketplace-listing";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show authenticated content
  return (
    <div>
      {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === "new-project" && (
        <NewProject onNavigate={setCurrentPage} />
      )}
      {currentPage === "marketplace-listing" && (
        <MarketplaceListingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "project-overview" && (
        <ProjectOverview onNavigate={setCurrentPage} />
      )}
      {currentPage === "analytics" && <Analytics onNavigate={setCurrentPage} />}
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  const { logout, walletAddress } = useAuth();
  const apis = [
    {
      id: 1,
      name: "weather-forecast-api",
      url: "weather-forecast-api.gateway.x402.io",
      repo: "Jayy4rt/Weather-API",
      status: "Live",
      lastUpdate: "Oct 26",
      branch: "main",
      requests: "4K / 1M",
      revenue: "2,450 sats",
    },
    {
      id: 2,
      name: "image-classification-api",
      url: "image-classification-api.gateway.x402.io",
      repo: "Jayy4rt/Vision-AI",
      status: "Live",
      lastUpdate: "Sep 19",
      branch: "main",
      requests: "6 / 5K",
      revenue: "1,200 sats",
    },
    {
      id: 3,
      name: "geocoding-api",
      url: "geocoding-api.gateway.x402.io",
      repo: "Jayy4rt/Geocoding",
      status: "Live",
      lastUpdate: "Sep 19",
      branch: "main",
      requests: "387 / 1M",
      revenue: "850 sats",
    },
    {
      id: 4,
      name: "stock-data-api",
      url: "stock-data-api.gateway.x402.io",
      repo: "Jayy-02/Stock-API",
      status: "Ready",
      lastUpdate: "Jul 21",
      branch: "main",
      requests: "82.46 MB / 100 GB",
      revenue: "0 sats",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer"
              onClick={() => onNavigate("dashboard")}
            >
              <span className="text-black font-bold">▲</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              <span className="text-sm">provider-name's APIs</span>
              <span className="text-gray-500 text-sm">Hobby</span>
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
            {/* Wallet Address Display */}
            {walletAddress && (
              <div className="px-3 py-1.5 text-xs bg-gray-900 rounded border border-gray-700">
                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
              </div>
            )}
            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 hover:bg-gray-900 rounded text-gray-400 hover:text-white"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-yellow-400 rounded-full"></button>
          </div>
        </div>

        <nav className="flex items-center space-x-6 px-6 text-sm border-t border-gray-800">
          <button className="py-3 border-b-2 border-white">APIs</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Integrations
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Deployments
          </button>
          <button
            className="py-3 text-gray-400 hover:text-white"
            onClick={() => onNavigate("analytics")}
          >
            Activity
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Domains
          </button>
          <button className="py-3 text-gray-400 hover:text-white">Usage</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Settings
          </button>
        </nav>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search APIs..."
              className="w-full bg-black border border-gray-800 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-600"
            />
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button className="p-2 border border-gray-800 rounded hover:bg-gray-900">
              <List className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-800 rounded hover:bg-gray-900">
              <Grid className="w-4 h-4" />
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-200"
              onClick={() => onNavigate("marketplace-listing")}
            >
              Add New...
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Usage</h2>
              <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800">
                Upgrade
              </button>
            </div>
            <div className="text-sm text-gray-400 mb-2">Last 30 days</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">API Requests</span>
                </div>
                <span className="text-sm">4K / 1M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Revenue</span>
                </div>
                <span className="text-sm">82.46 sats / 100K sats</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">APIs</h2>
          <div className="space-y-0 border border-gray-800 rounded-lg overflow-hidden">
            {apis.map((api, index) => (
              <div
                key={api.id}
                className={`bg-gray-900 p-6 flex items-center justify-between hover:bg-gray-850 transition-colors cursor-pointer ${
                  index !== 0 ? "border-t border-gray-800" : ""
                }`}
                onClick={() => onNavigate("project-overview")}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">⚡</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{api.name}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded ${
                          api.status === "Live"
                            ? "bg-green-900 text-green-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {api.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{api.url}</div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{api.repo}</span>
                      <span>•</span>
                      <span>
                        {api.lastUpdate} on {api.branch}
                      </span>
                      <span>•</span>
                      <span>{api.requests}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium">{api.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <button className="p-2 hover:bg-gray-800 rounded">
                    <Activity className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// New Project Component
const NewProject: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
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
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer"
              onClick={() => onNavigate("dashboard")}
            >
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

      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Let's publish your API</h1>
          <button className="px-4 py-2 border border-purple-600 text-purple-400 rounded hover:bg-purple-900/20">
            👥 Collaborate on a Pro Trial
          </button>
        </div>

        <div className="mb-12">
          <div className="flex items-center space-x-2 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
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
                  <select className="bg-transparent border-none text-sm focus:outline-none">
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
    </div>
  );
};

// Project Overview Component (shortened for space)
const ProjectOverview: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer"
              onClick={() => onNavigate("dashboard")}
            >
              <span className="text-black font-bold">▲</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              <span
                className="text-sm cursor-pointer hover:text-gray-300"
                onClick={() => onNavigate("dashboard")}
              >
                provider-name's APIs
              </span>
              <span className="text-gray-500 text-sm">Hobby</span>
              <span className="text-gray-600">/</span>
              <span className="text-sm">weather-forecast-api</span>
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

        <nav className="flex items-center space-x-6 px-6 text-sm border-t border-gray-800">
          <button className="py-3 border-b-2 border-white">Overview</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Deployments
          </button>
          <button
            className="py-3 text-gray-400 hover:text-white"
            onClick={() => onNavigate("analytics")}
          >
            Analytics
          </button>
          <button className="py-3 text-gray-400 hover:text-white">Logs</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Settings
          </button>
        </nav>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">weather-forecast-api</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm">
              Repository
            </button>
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm font-medium">
              Usage
            </button>
            <button className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm flex items-center space-x-2">
              <span>Visit</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Production Deployment</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <div className="text-lg font-semibold">Weather API</div>
                  <div className="text-sm text-gray-300 mt-2">
                    Real-time forecast data
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs font-medium">
                  Ready
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Domain</div>
                <a href="#" className="text-blue-400 hover:underline text-sm">
                  weather-forecast-api-ten.x402.app
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Firewall</h3>
              <button
                className="text-sm text-blue-400 hover:underline"
                onClick={() => onNavigate("analytics")}
              >
                →
              </button>
            </div>
            <div className="flex items-center justify-center py-8">
              <Shield className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-center font-medium">Firewall is active</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Observability</h3>
              <button
                className="text-sm text-blue-400 hover:underline"
                onClick={() => onNavigate("analytics")}
              >
                →
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Requests</span>
                <span>2,450</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Success Rate</span>
                <span>99.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Analytics</h3>
              <button
                className="text-sm text-blue-400 hover:underline"
                onClick={() => onNavigate("analytics")}
              >
                →
              </button>
            </div>
            <div className="flex items-center justify-center py-8">
              <Activity className="w-16 h-16 text-gray-600" />
            </div>
            <div className="text-center">
              <button
                className="px-3 py-1.5 text-sm bg-white text-black rounded hover:bg-gray-200 font-medium"
                onClick={() => onNavigate("analytics")}
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Analytics Component (shortened)
const Analytics: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  const [timeRange, setTimeRange] = useState("30days");

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer"
              onClick={() => onNavigate("dashboard")}
            >
              <span className="text-black font-bold">▲</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              <span
                className="text-sm cursor-pointer hover:text-gray-300"
                onClick={() => onNavigate("dashboard")}
              >
                provider-name's APIs
              </span>
              <span className="text-gray-500 text-sm">Hobby</span>
              <span className="text-gray-600">/</span>
              <span className="text-sm">weather-forecast-api</span>
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

        <nav className="flex items-center space-x-6 px-6 text-sm border-t border-gray-800">
          <button
            className="py-3 text-gray-400 hover:text-white"
            onClick={() => onNavigate("project-overview")}
          >
            Overview
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Deployments
          </button>
          <button className="py-3 border-b-2 border-white">Analytics</button>
          <button className="py-3 text-gray-400 hover:text-white">Logs</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Settings
          </button>
        </nav>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Analytics - Weather Forecast API
            </h1>
            <p className="text-gray-400">
              Monitor your API performance and revenue
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {timeRange === "7days"
                  ? "Last 7 days"
                  : timeRange === "30days"
                  ? "Last 30 days"
                  : "Last 90 days"}
              </span>
            </button>
            <button className="px-3 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-400">Total Requests</h3>
              <Activity className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mb-2">4,287</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-400">Revenue Earned</h3>
              <TrendingUp className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mb-2">2,450 sats</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+8.3%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-400">Success Rate</h3>
              <Shield className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mb-2">99.2%</div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500">-0.3%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Request Volume</h2>
            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded ${
                  timeRange === "7days" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setTimeRange("7days")}
              >
                7D
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded ${
                  timeRange === "30days" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setTimeRange("30days")}
              >
                30D
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded ${
                  timeRange === "90days" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setTimeRange("90days")}
              >
                90D
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[45, 52, 48, 61, 55, 68, 72, 65, 78, 82, 75, 88, 92, 85].map(
              (height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Top Endpoints</h2>
            <div className="space-y-4">
              {[
                { endpoint: "/api/forecast", requests: 1842, percentage: 43 },
                { endpoint: "/api/current", requests: 1285, percentage: 30 },
                { endpoint: "/api/alerts", requests: 728, percentage: 17 },
                { endpoint: "/api/historical", requests: 432, percentage: 10 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <code className="text-blue-400">{item.endpoint}</code>
                    <span className="text-gray-400">
                      {item.requests.toLocaleString()} requests
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Response Times</h2>
            <div className="space-y-4">
              {[
                { metric: "Average", value: "142ms", status: "good" },
                { metric: "P50", value: "98ms", status: "good" },
                { metric: "P95", value: "284ms", status: "warning" },
                { metric: "P99", value: "512ms", status: "warning" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "good"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">{item.metric}</span>
                  </div>
                  <span className="text-lg font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-0 border border-gray-800 rounded overflow-hidden">
            {[
              {
                time: "2 min ago",
                event: "API Request",
                endpoint: "/api/forecast",
                status: 200,
                duration: "98ms",
              },
              {
                time: "5 min ago",
                event: "API Request",
                endpoint: "/api/current",
                status: 200,
                duration: "142ms",
              },
              {
                time: "8 min ago",
                event: "API Request",
                endpoint: "/api/alerts",
                status: 200,
                duration: "76ms",
              },
              {
                time: "12 min ago",
                event: "API Request",
                endpoint: "/api/forecast",
                status: 404,
                duration: "45ms",
              },
              {
                time: "15 min ago",
                event: "API Request",
                endpoint: "/api/historical",
                status: 200,
                duration: "234ms",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-gray-850 ${
                  index !== 0 ? "border-t border-gray-800" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">
                        {activity.event}
                      </span>
                      <code className="text-xs text-blue-400">
                        {activity.endpoint}
                      </code>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      activity.status === 200
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {activity.status}
                  </span>
                  <span className="text-sm text-gray-400">
                    {activity.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
