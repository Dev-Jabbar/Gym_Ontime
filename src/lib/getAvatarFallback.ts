/**
 * Generates a ui-avatars.com fallback URL for when no real avatar is
 * set (Cloudinary URL missing/null). Centralized here so a future
 * change — provider swap, default size, param tweak — only needs to
 * happen in one place instead of being kept in sync across every
 * component that shows an avatar.
 *
 * format=png is explicit and intentional: ui-avatars.com's default
 * format depends on the requester's Accept header, which caused
 * next/image to receive SVG responses and reject them (SVGs are
 * blocked by default since they can contain scripts). Forcing PNG
 * sidesteps that entirely without loosening next.config.js's SVG
 * security setting.
 */
export function getAvatarFallback(name: string, size = 40): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=random&color=fff&size=${size}&format=png`;
}
