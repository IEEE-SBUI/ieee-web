export interface IEEEPortalLink {
  label: string;
  href: string;
}

export interface IEEEPortalCategory {
  title: string;
  links: IEEEPortalLink[];
}

export const IEEE_PORTALS: IEEEPortalCategory[] = [
  {
    title: "Research & Standards",
    links: [
      { label: "IEEExplore", href: "https://ieeexplore.ieee.org" },
      { label: "IEEE Spectrum", href: "https://spectrum.ieee.org" },
      { label: "IEEE Standard Association (SA)", href: "https://standards.ieee.org" },
    ],
  },
  {
    title: "Communities & Groups",
    links: [
      { label: "IEEE WIE", href: "https://wie.ieee.org" },
      { label: "IEEE Young Professionals", href: "https://yp.ieee.org" },
      { label: "IEEE Collabratec", href: "https://ieee-collabratec.ieee.org" },
    ],
  },
  {
    title: "Career & Technical Tools",
    links: [
      { label: "IEEE Jobs", href: "https://jobs.ieee.org" },
      { label: "IEEE IoT", href: "https://iot.ieee.org" },
      { label: "IEEE vTools", href: "https://vtools.ieee.org" },
    ],
  },
];
