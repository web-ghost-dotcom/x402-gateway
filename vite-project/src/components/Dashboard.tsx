import React, { useEffect, useState } from "react";
import {
  Search,
  Grid,
  List,
  MoreVertical,
  Activity,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api.service";
import type { APIListing } from "../types/marketplace.types";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [apis, setApis] = useState<APIListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch APIs on component mount
  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllListings();
        setApis(data);
      } catch (err) {
        console.error("Error fetching APIs:", err);
        setError("Failed to load APIs");
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Handle Add New button click
  const handleAddNew = () => {
    navigate("/marketplace-listing");
  };

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
          <button className="py-3 border-b-2 border-white">APIs</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Integrations
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Deployments
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Activity
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Domains
          </button>
          <button className="py-3 text-gray-400 hover:text-white">Usage</button>
          <button className="py-3 text-gray-400 hover:text-white">
            Observability
          </button>
          <button className="py-3 text-gray-400 hover:text-white">
            Settings
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Search and Actions */}
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
              onClick={handleAddNew}
              className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-200"
            >
              Add New...
            </button>
          </div>
        </div>

        {/* Usage Section */}
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

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Alerts</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <h3 className="font-medium mb-2">Get alerted for anomalies</h3>
            <p className="text-sm text-gray-400 mb-4">
              Automatically monitor your APIs for anomalies and get notified.
            </p>
            <button className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-200">
              Upgrade to Observability Plus
            </button>
          </div>
        </div>

        {/* APIs List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">APIs</h2>
          
          {loading ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading APIs...</p>
            </div>
          ) : error ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : apis.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
              <h3 className="font-medium mb-2">No APIs yet</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get started by adding your first API to the marketplace
              </p>
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-200"
              >
                Add Your First API
              </button>
            </div>
          ) : (
            <div className="space-y-0 border border-gray-800 rounded-lg overflow-hidden">
              {apis.map((api, index) => (
                <div
                  key={api.id}
                  className={`bg-gray-900 p-6 flex items-center justify-between hover:bg-gray-850 transition-colors ${
                    index !== 0 ? "border-t border-gray-800" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚡</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{api.name}</h3>
                        <span className="px-2 py-0.5 text-xs rounded bg-green-900 text-green-300">
                          Live
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {api.baseUrl}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{api.category || "Uncategorized"}</span>
                        <span>•</span>
                        <span>Added {formatDate(api.createdAt)}</span>
                        {api.description && (
                          <>
                            <span>•</span>
                            <span className="max-w-md truncate">{api.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm font-medium">{api.pricePerCall}</div>
                      <div className="text-xs text-gray-500">Per Call</div>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
