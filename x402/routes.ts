import { Router } from "express";
import { DatabaseService } from "./db/service.ts";

const router = Router();
const db = new DatabaseService();

// ==================== API Listing Routes ====================

// Get all API listings
router.get("/listings", async (req, res) => {
  try {
    const listings = await db.getAllAPIListings();
    res.json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching API listings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch API listings",
    });
  }
});

// Get API listing by ID
router.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await db.getAPIListing(id);

    if (!listing) {
      return res.status(404).json({ success: false, error: "API listing not found" });
    }

    res.json({ success: true, data: listing });
  } catch (error) {
    console.error("Error fetching API listing:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch API listing",
    });
  }
});

// Create new API listing
router.post("/listings", async (req, res) => {
  try {
    // Convert camelCase to snake_case for database fields
    const {
      name,
      description,
      baseUrl: base_url,
      apiKey: api_key,
      pricePerCall: price_per_call,
      category,
      walletAddress: owner,
      source,
    } = req.body;

    // Log the received data for debugging
    console.log("Received form data:", req.body);

    // Validation
    if (!name || !base_url || !price_per_call || !owner) {
      console.log("Missing fields:", {
        name: !name,
        base_url: !base_url,
        price_per_call: !price_per_call,
        owner: !owner,
      });
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, baseUrl, pricePerCall, walletAddress",
      });
    }

    const newListing = {
      name,
      description: description || "",
      base_url,
      api_key: api_key || null,
      price_per_call,
      category: category || "Uncategorized",
      source: source || "manual",
      owner,
      status: "active",
      total_calls: 0,
      revenue: "0",
    };

    const createdListing = await db.createAPIListing(newListing);

    res.status(201).json({
      success: true,
      data: createdListing,
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
router.put("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await db.getAPIListing(id);

    if (!listing) {
      return res.status(404).json({ success: false, error: "API listing not found" });
    }

    // Check ownership (in production, verify JWT token)
    if (listing.owner !== req.body.owner) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const updatedListing = await db.updateAPIListing(id, {
      ...req.body,
      owner: listing.owner, // Prevent owner from being changed
    });

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
router.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await db.getAPIListing(id);

    if (!listing) {
      return res.status(404).json({ success: false, error: "API listing not found" });
    }

    // Check ownership (in production, verify JWT token)
    if (listing.owner !== req.body.owner) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    await db.deleteAPIListing(id);

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
router.get("/listings/owner/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const listings = await db.getAPIListingsByOwner(walletAddress);
    res.json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user listings",
    });
  }
});

// Record API usage
router.post("/listings/:id/usage", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_address, success, error, cost } = req.body;

    // Validation
    if (!user_address || typeof success !== "boolean" || !cost) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: user_address, success, cost",
      });
    }

    const usage = await db.recordAPIUsage({
      api_id: id,
      user_address,
      success,
      error: error || null,
      cost,
    });

    const stats = await db.getAPIUsageStats(id);

    res.json({
      success: true,
      data: { usage, stats },
      message: "API usage recorded successfully",
    });
  } catch (error) {
    console.error("Error recording API usage:", error);
    res.status(500).json({
      success: false,
      error: "Failed to record API usage",
    });
  }
});

export default router;
