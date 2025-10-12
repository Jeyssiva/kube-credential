import express from "express";
import request from "supertest";
import * as verificationService from "../src/services/verification.service";
import { verifyCredential } from "../src/controllers/verification.controller";

const app = express();
app.use(express.json());
app.post("/api/verify", verifyCredential);

describe("verification.controller.ts", () => {
  it("✅ returns 200 when credential verified", async () => {
    jest.spyOn(verificationService, "verify").mockResolvedValueOnce({
      found: true,
      source: "local",
      record: { workerId: "worker-1" },
    });

    const res = await request(app)
      .post("/api/verify")
      .send({ title: "T", subject: "S" });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.worker).toContain("verified by");
  });

  it("✅ returns 400 for invalid payload", async () => {
    const res = await request(app).post("/api/verify").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("Invalid payload");
  });

  it("✅ returns 404 when not found", async () => {
    jest.spyOn(verificationService, "verify").mockResolvedValueOnce({ found: false });

    const res = await request(app)
      .post("/api/verify")
      .send({ title: "A", subject: "B" });

    expect(res.status).toBe(404);
    expect(res.body.valid).toBe(false);
  });
});
