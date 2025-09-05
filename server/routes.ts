import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import aiRoutes from "./aiRoutes";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI-powered content generation routes
  app.use('/api', aiRoutes);

  // put other application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
