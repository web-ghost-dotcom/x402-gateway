import { Router } from "express";

const router = Router();

// In-memory storage (replace with database in production)
// TODO: Replace with MongoDB, PostgreSQL, or other database
interface APIListing {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  apiKey?: string | null;
  pricePerCall: string;
  category: string;
  status: string;
  source: string;
  owner: string;
  totalCalls: number;
  revenue: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export const apiListings = new Map<string, APIListing>();

// API Listings storage

// ==================== API Listing Routes ====================

// Get all API listings
router.get("/listings", (req, res) => {
  const listings = Array.from(apiListings.values());
  res.json({ success: true, data: listings });
});

// Get API listing by ID
router.get("/listings/:id", (req, res) => {
  const { id } = req.params;
  const listing = apiListings.get(id);

  if (!listing) {
    return res.status(404).json({ success: false, error: "API listing not found" });
  }

  res.json({ success: true, data: listing });
});

// Create new API listing
router.post("/listings", (req, res) => {
  try {
    const {
      name,
      description,
      baseUrl,
      apiKey,
      pricePerCall,
      category,
      owner,
      source,
      githubRepo,
    } = req.body;

    // Validation
    if (!name || !baseUrl || !pricePerCall || !owner) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, baseUrl, pricePerCall, owner",
      });
    }

    // Generate unique ID
    const id = `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newListing = {
      id,
      name,
      description: description || "",
      baseUrl,
      apiKey: apiKey || null,
      pricePerCall,
      category: category || "Uncategorized",
      tags: [],
      status: "active",
      source: source || "manual",
      githubRepo: githubRepo || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner,
      totalCalls: 0,
      revenue: "0 sats",
    };

    apiListings.set(id, newListing);

    res.status(201).json({
      success: true,
      data: newListing,
      message: "API listing created successfully",
    });
  } catch (error) {
    console.error("Error creating API listing:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create API listing",
    });
  }
});

// Update API listing
router.put("/listings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const listing = apiListings.get(id);

    if (!listing) {
      return res.status(404).json({ success: false, error: "API listing not found" });
    }

    // Check ownership (in production, verify JWT token)
    if (listing.owner !== req.body.owner) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const updatedListing = {
      ...listing,
      ...req.body,
      id, // Prevent ID from being changed
      owner: listing.owner, // Prevent owner from being changed
      updatedAt: new Date().toISOString(),
    };

    apiListings.set(id, updatedListing);

    res.json({
      success: true,
      data: updatedListing,
      message: "API listing updated successfully",
    });
  } catch (error) {
    console.error("Error updating API listing:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update API listing",
    });
  }
});

// Delete API listing
router.delete("/listings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const listing = apiListings.get(id);

    if (!listing) {
      return res.status(404).json({ success: false, error: "API listing not found" });
    }

    // Check ownership (in production, verify JWT token)
    if (listing.owner !== req.body.owner) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    apiListings.delete(id);

    res.json({
      success: true,
      message: "API listing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting API listing:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete API listing",
    });
  }
});

// Get listings by owner
router.get("/listings/owner/:walletAddress", (req, res) => {
  const { walletAddress } = req.params;
  const userListings = Array.from(apiListings.values()).filter(
    listing => listing.owner === walletAddress,
  );

  res.json({ success: true, data: userListings });
});

export default router;
