import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Submit program request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const programData = req.body;
    console.log('Program data received:', programData);
    
    // Validate required fields
    const requiredFields = [
      'appName', 'appDescription', 'appUrl', 
      'commissionStructure', 'paymentTerms', 'affiliateSignupUrl'
    ];
    
    for (const field of requiredFields) {
      if (!programData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Insert the program with the current user's ID
    const result = await db.insert(affiliatePrograms).values({
      userId: user.id,
      appName: programData.appName,
      appDescription: programData.appDescription,
      appUrl: programData.appUrl,
      commissionStructure: programData.commissionStructure,
      paymentTerms: programData.paymentTerms,
      affiliateSignupUrl: programData.affiliateSignupUrl,
      promotionalMaterials: programData.promotionalMaterials || null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    console.log('Program submitted successfully:', result);
    
    return res.status(201).json({ 
      message: 'Program submitted successfully',
      program: result[0]
    });
    
  } catch (error) {
    console.error('Error submitting program:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to submit program' });
  }
}