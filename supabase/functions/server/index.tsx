import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage buckets
const bucketName = 'make-9a414d17-gmate-storage';
const { data: buckets } = await supabaseAdmin.storage.listBuckets();
const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
if (!bucketExists) {
  await supabaseAdmin.storage.createBucket(bucketName, { public: false });
}

// Health check endpoint
app.get("/make-server-9a414d17/health", (c) => {
  return c.json({ status: "ok" });
});

// Student Signup
app.post("/make-server-9a414d17/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, studentName, universityName, contactNo, semester, idNo, bloodGroup, emergencyContact } = body;

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        studentName,
        universityName,
        contactNo,
        semester,
        idNo,
        bloodGroup,
        emergencyContact,
        verified: false,
      },
      email_confirm: true,
    });

    if (authError) {
      console.log(`Authentication error during student signup: ${authError.message}`);
      return c.json({ error: authError.message }, 400);
    }

    // Store student profile in KV store
    await kv.set(`student:${authData.user.id}`, {
      id: authData.user.id,
      email,
      studentName,
      universityName,
      contactNo,
      semester,
      idNo,
      bloodGroup,
      emergencyContact,
      verified: false,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, userId: authData.user.id });
  } catch (error) {
    console.log(`Error during student signup: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Upload ID Card
app.post("/make-server-9a414d17/upload-id-card", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { file, fileName } = body;

    // Upload to Supabase Storage
    const filePath = `id-cards/${user.id}/${fileName}`;
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, Buffer.from(file, 'base64'), {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.log(`Storage error while uploading ID card: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Update student profile
    const studentKey = `student:${user.id}`;
    const studentData = await kv.get(studentKey);
    if (studentData) {
      await kv.set(studentKey, { ...studentData, idCardPath: filePath });
    }

    return c.json({ success: true, path: filePath });
  } catch (error) {
    console.log(`Error uploading ID card: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Upload Face Scan
app.post("/make-server-9a414d17/upload-face-scan", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { file, fileName } = body;

    // Upload to Supabase Storage
    const filePath = `face-scans/${user.id}/${fileName}`;
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, Buffer.from(file, 'base64'), {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.log(`Storage error while uploading face scan: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Update student profile and trigger verification
    const studentKey = `student:${user.id}`;
    const studentData = await kv.get(studentKey);
    if (studentData) {
      await kv.set(studentKey, {
        ...studentData,
        faceScanPath: filePath,
        verificationStatus: 'pending',
      });
    }

    return c.json({ success: true, path: filePath });
  } catch (error) {
    console.log(`Error uploading face scan: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Get Student Profile
app.get("/make-server-9a414d17/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const studentData = await kv.get(`student:${user.id}`);

    if (!studentData) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json(studentData);
  } catch (error) {
    console.log(`Error fetching student profile: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Verify Student (Admin action - for demo, auto-verify after 3 seconds)
app.post("/make-server-9a414d17/verify-student", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const studentKey = `student:${user.id}`;
    const studentData = await kv.get(studentKey);

    if (studentData) {
      await kv.set(studentKey, {
        ...studentData,
        verified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date().toISOString(),
      });
    }

    return c.json({ success: true, verified: true });
  } catch (error) {
    console.log(`Error verifying student: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Create Marketplace Listing
app.post("/make-server-9a414d17/marketplace/create", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { category, title, description, price, images } = body;

    const listingId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const listing = {
      id: listingId,
      userId: user.id,
      category,
      title,
      description,
      price,
      images,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    await kv.set(`listing:${listingId}`, listing);
    await kv.set(`user-listings:${user.id}:${listingId}`, listingId);

    return c.json({ success: true, listing });
  } catch (error) {
    console.log(`Error creating marketplace listing: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Get Marketplace Listings
app.get("/make-server-9a414d17/marketplace/listings", async (c) => {
  try {
    const category = c.req.query('category');
    const listings = await kv.getByPrefix('listing:');

    let filteredListings = listings.filter(l => l.status === 'active');
    if (category) {
      filteredListings = filteredListings.filter(l => l.category === category);
    }

    return c.json({ listings: filteredListings });
  } catch (error) {
    console.log(`Error fetching marketplace listings: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Create SOS Alert
app.post("/make-server-9a414d17/sos/create", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user || userError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { location, message } = body;

    const alertId = `sos-${Date.now()}`;
    const alert = {
      id: alertId,
      userId: user.id,
      location,
      message,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    await kv.set(`sos:${alertId}`, alert);

    return c.json({ success: true, alert });
  } catch (error) {
    console.log(`Error creating SOS alert: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Get Active SOS Alerts
app.get("/make-server-9a414d17/sos/active", async (c) => {
  try {
    const alerts = await kv.getByPrefix('sos:');
    const activeAlerts = alerts.filter(a => a.status === 'active');
    return c.json({ alerts: activeAlerts });
  } catch (error) {
    console.log(`Error fetching SOS alerts: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);