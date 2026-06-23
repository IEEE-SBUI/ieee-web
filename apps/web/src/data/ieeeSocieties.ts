export interface IEEESociety {
  name: string;
  price: number;
}

// All IEEE societies and their USD prices. This is the source of truth.
export const IEEE_SOCIETIES: IEEESociety[] = [
  { name: "Aerospace & Electronic Systems", price: 5 },
  { name: "Antennas and Propagation", price: 1 },
  { name: "Broadcast Technology", price: 10 },
  { name: "Circuits and Systems", price: 11 },
  { name: "Communications (ComSoc)", price: 1 },
  { name: "Computational Intelligence", price: 4 },
  { name: "Computer Society", price: 8 },
  { name: "Consumer Technology", price: 1 },
  { name: "Control Systems", price: 5 },
  { name: "Dielectrics and Electrical Insulation", price: 1 },
  { name: "Education Society", price: 1 },
  { name: "Electromagnetic Compatibility", price: 1 },
  { name: "Electron Devices", price: 3 },
  { name: "Electronics Packaging", price: 8 },
  { name: "Engineering in Medicine and Biology", price: 1 },
  { name: "Geoscience and Remote Sensing", price: 1 },
  { name: "Industrial Electronics", price: 1 },
  { name: "Industry Applications", price: 1 },
  { name: "Information Theory", price: 1 },
  { name: "Instrumentation and Measurement", price: 5 },
  { name: "Intelligent Transportation Systems", price: 9 },
  { name: "Magnetics", price: 14 },
  { name: "Microwave Theory and Technology", price: 1 },
  { name: "Nuclear and Plasma Sciences", price: 2 },
  { name: "Oceanic Engineering", price: 8 },
  { name: "Photonics", price: 10 },
  { name: "Power Electronics", price: 5 },
  { name: "Power & Energy (PES)", price: 1 },
  { name: "Product Safety Engineering", price: 1 },
  { name: "Professional Communication", price: 16 },
  { name: "Reliability", price: 8 },
  { name: "Robotics and Automation", price: 5 },
  { name: "Signal Processing", price: 4 },
  { name: "Society on Social Implications of Technology", price: 4 },
  { name: "Solid-State Circuits", price: 11 },
  { name: "Systems, Man, and Cybernetics", price: 1 },
  { name: "Technology and Engineering Management", price: 5 },
  { name: "Ultrasonics, Ferroelectrics, and Frequency Control", price: 10 },
  { name: "Vehicular Technology", price: 1 }
];
