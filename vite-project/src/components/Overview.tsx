import React, { useState } from "react";
import {
  Activity,
  MoreVertical,
  Copy,
  ExternalLink,
  Shield,
  RotateCcw,
} from "lucide-react";

const ProjectOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="text-black font-bold">▲</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              <span className="text-sm">provider-name's APIs</span>
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
            className={`py-3 ${
              activeTab === "overview"
                ? "border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Deployments
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Analytics
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Speed Insights
          </button>
          <button className="py-3 text-gray-400 hover:text-white">Logs</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Observability
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Firewall
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Settings
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">weather-forecast-api</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Repository</span>
            </button>
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm font-medium">
              Usage
            </button>
            <button className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm">
              Domains
            </button>
            <button className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-900 text-sm flex items-center space-x-2">
              <span>Visit</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-700 rounded hover:bg-gray-900">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Production Deployment */}
        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Production Deployment</h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800">
                    Build Logs
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800">
                    Runtime Logs
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800 flex items-center space-x-1">
                    <RotateCcw className="w-3 h-3" />
                    <span>Instant Rollback</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview Image */}
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

                {/* Deployment Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Deployment</div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">
                        weather-forecast-api-4rz66kclf-jayy-02s-projects.x402.app
                      </span>
                      <button className="p-1 hover:bg-gray-800 rounded">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Domains</div>
                      <div className="flex items-center space-x-2">
                        <a
                          href="#"
                          className="text-blue-400 hover:underline text-sm"
                        >
                          weather-forecast-api-ten.x402.app
                        </a>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs font-medium">
                          Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Created</div>
                      <div className="text-sm">Oct 26 by Jayy4rt</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Source</div>
                    <div className="flex items-center space-x-2 text-sm">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="font-mono">main</span>
                      <span>→</span>
                      <span className="font-mono">417f5dc</span>
                      <span>fix: build errors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment Settings */}
            <div className="border-t border-gray-800 p-6">
              <button className="flex items-center justify-between w-full text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    Deployment Settings
                  </span>
                  <span className="px-2 py-0.5 bg-blue-900 text-blue-300 rounded text-xs">
                    4 Recommendations
                  </span>
                </div>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <p className="text-sm text-gray-400 mt-2">
                To update your Production Deployment, push to the main branch.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Firewall */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Firewall</h3>
              <button className="text-sm text-blue-400 hover:underline">
                →
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">24h</span>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-center py-8">
              <Shield className="w-16 h-16 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-medium mb-1">Firewall is active</p>
              <button className="text-sm text-gray-400 hover:text-white">
                Enable Bot Protection
              </button>
            </div>
          </div>

          {/* Observability */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Observability</h3>
              <button className="text-sm text-blue-400 hover:underline">
                →
              </button>
            </div>
            <div className="text-2xl mb-2">6h</div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Requests</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Function Invocations</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Error Rate</span>
                <span>0%</span>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Analytics</h3>
              <button className="text-sm text-blue-400 hover:underline">
                →
              </button>
            </div>
            <div className="flex items-center justify-center py-8">
              <Activity className="w-16 h-16 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Track visitors and page views
              </p>
              <button className="px-3 py-1.5 text-sm bg-white text-black rounded hover:bg-gray-200 font-medium">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Deployments List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Deployments</h2>
            <button className="px-3 py-1.5 text-sm border border-gray-700 rounded hover:bg-gray-800">
              View All
            </button>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-800 hover:bg-gray-850">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="font-mono text-sm">417f5dc</div>
                          <div className="text-xs text-gray-500">
                            fix: build errors
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">
                        Ready
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">Oct 26</td>
                    <td className="p-4 text-sm text-gray-400">Jayy4rt</td>
                    <td className="p-4 text-right">
                      <button className="p-1 hover:bg-gray-800 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectOverview;
