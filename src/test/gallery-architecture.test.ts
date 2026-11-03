import { describe, expect, it } from "vitest";
import { galleryArchitecture as room, vaultHeight } from "@/lib/gallery-architecture";

describe("film gallery vault proportions", () => {
  it("starts the vault almost halfway up the floor-to-crown height", () => {
    const ratio = room.springHeight / vaultHeight(0, 0);
    expect(ratio).toBeGreaterThanOrEqual(0.5);
    expect(ratio).toBeLessThanOrEqual(0.55);
  });
  it("joins each diagonal groin to the wall spring without a floating canopy", () => {
    expect(vaultHeight(room.width / 2, room.bayDepth / 2)).toBe(room.springHeight);
    expect(vaultHeight(0, 0)).toBeCloseTo(4.3);
  });
});