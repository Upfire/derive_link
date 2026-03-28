import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for Bolt Fleet credentials (per tenant)
const boltCredentials = new Map();

// ─── Admin: Save Bolt Fleet credentials ──────────────────────────────────────
app.post('/api/bolt/credentials', (req, res) => {
  const { tenantId, clientId, clientSecret } = req.body;
  if (!tenantId || !clientId || !clientSecret) {
    return res.status(400).json({ error: 'tenantId, clientId, and clientSecret are required' });
  }
  boltCredentials.set(tenantId, { clientId, clientSecret, token: null, tokenExpiry: 0 });
  res.json({ ok: true });
});

// ─── Get OAuth2 token from Bolt Fleet ────────────────────────────────────────
async function getBoltToken(tenantId) {
  const creds = boltCredentials.get(tenantId);
  if (!creds) throw new Error('Bolt Fleet credentials not configured');

  // Reuse token if still valid
  if (creds.token && Date.now() < creds.tokenExpiry) {
    return creds.token;
  }

  const resp = await axios.post('https://fleets-api.bolt.eu/v1/oauth/token', {
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
    grant_type: 'client_credentials',
  });

  creds.token = resp.data.access_token;
  creds.tokenExpiry = Date.now() + (resp.data.expires_in - 60) * 1000;
  return creds.token;
}

// ─── Mock earnings for development ───────────────────────────────────────────
const MOCK_BOLT_EARNINGS = {
  gross_amount: 8450.00,
  net_amount: 6862.50,
  currency: 'PLN',
  trips_count: 187,
  period_from: '2026.03.21',
  period_to: '2026.03.27',
};

// ─── Fetch driver earnings from Bolt Fleet ───────────────────────────────────
app.get('/api/bolt/earnings', async (req, res) => {
  const { tenantId, driverId, dateFrom, dateTo } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: 'tenantId is required' });
  }

  const creds = boltCredentials.get(tenantId);

  // If no credentials configured, return mock data for development
  if (!creds) {
    return res.json({
      ...MOCK_BOLT_EARNINGS,
      period_from: dateFrom,
      period_to: dateTo,
      _mock: true,
    });
  }

  try {
    const token = await getBoltToken(tenantId);

    const resp = await axios.get('https://fleets-api.bolt.eu/v1/finances/reports/driverEarnings', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        driver_id: driverId,
        date_from: dateFrom,
        date_to: dateTo,
      },
    });

    res.json(resp.data);
  } catch (err) {
    console.error('Bolt Fleet API error:', err.response?.data || err.message);
    // Fallback to mock data if Bolt API fails
    res.json({
      ...MOCK_BOLT_EARNINGS,
      period_from: dateFrom,
      period_to: dateTo,
      _mock: true,
    });
  }
});

// ─── Check if credentials are configured ─────────────────────────────────────
app.get('/api/bolt/status', (req, res) => {
  const { tenantId } = req.query;
  const configured = boltCredentials.has(tenantId);
  res.json({ configured });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
