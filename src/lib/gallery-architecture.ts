// Estimated from the reference film; these are not surveyed dimensions.
export const galleryArchitecture = {
  width: 6.8,
  length: 12,
  bayDepth: 4,
  springHeight: 2.25,
  vaultRise: 2.05,
  bayCenters: [-4, 0, 4],
};

export function vaultArcHeight(offset: number, halfSpan: number) {
  return galleryArchitecture.vaultRise * Math.sqrt(Math.max(0, 1 - (offset / halfSpan) ** 2));
}

export function vaultHeight(x: number, localZ: number) {
  const { width, bayDepth, springHeight } = galleryArchitecture;
  // The upper envelope retains arched side/end lunettes and diagonal groins.
  return springHeight + Math.max(vaultArcHeight(x, width / 2), vaultArcHeight(localZ, bayDepth / 2));
}