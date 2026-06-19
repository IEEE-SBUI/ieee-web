export type Corridor =
  | "Internal Operations"
  | "Education and Development"
  | "Public Relations";

export const CORRIDOR_COLORS: Record<Corridor, string> = {
  "Internal Operations": "#1CE1A4", // Teal
  "Education and Development": "#8280E5", // Indigo
  "Public Relations": "#46BCED", // Sky Blue
};
