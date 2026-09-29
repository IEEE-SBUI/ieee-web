export interface PrizeItem {
  rank: string;
  prize: string;
}

export interface FlowStep {
  step: string;
  title: string;
  desc: string;
}

export interface CompetitionTrack {
  id: "bpc" | "hackathon" | "stem";
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  theme: string;
  registrationFee: {
    amount: string;
    note?: string;
  };
  prizes: PrizeItem[];
  eligibility: string;
  teamSize: string;
  rules: string[];
  flow: FlowStep[];
  requirements: string[];
  pocBudget?: string;
  benefits?: string[];
  timeline: { date: string; title: string; desc?: string }[];
  href: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  phase: string;
  desc?: string;
}

export interface TechtonicConfig {
  name: string;
  edition: string;
  tagline: string;
  shortDescription: string;
  status: "active" | "archived";
  registrationUrl: string;
  guidebookUrl: string;
  vision: string;
  missions: {
    number: string;
    title: string;
    desc: string;
  }[];
  contact: {
    instagram: string;
    instagramUrl: string;
    email: string;
    contacts: { name: string; phone: string; role: string }[];
  };
  competitions: Record<"bpc" | "hackathon" | "stem", CompetitionTrack>;
  overallTimeline: TimelineMilestone[];
  whyParticipate: { title: string; desc: string }[];
}

export const TECHTONIC_CONFIG: TechtonicConfig = {
  name: "Techtonic 3.0",
  edition: "3.0",
  tagline: "Energizing Tomorrow through Secure Intelligence",
  shortDescription:
    "Techtonic 3.0 is the annual flagship technology event organized by IEEE Student Branch Universitas Indonesia. It brings together university students, high school innovators, academics, and industry leaders across three national competition tracks.",
  status: "active",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdoC3E-k5_cDw_zI-qtyCnYYYkREzUaqmOP5fpEGcLUsNlz1A/viewform",
  guidebookUrl:
    "https://drive.google.com/drive/folders/1HhZ6eM7e2AvB7VwQ-aOnqFED8QW9hKeI",

  vision:
    "To establish Techtonic as a leading platform for empowering young innovators, fostering cutting-edge technological solutions in sustainable energy, cybersecurity, and IoT while bridging students with academic and industry ecosystems.",

  missions: [
    {
      number: "01",
      title: "Encourage Innovation",
      desc: "Encourage creative, impactful, and secure technological innovations addressing real-world energy and digital challenges.",
    },
    {
      number: "02",
      title: "Develop Collaboration",
      desc: "Develop multidisciplinary collaboration in Sustainable Energy, Cybersecurity, Digital Trust, IoT, and Edge Computing.",
    },
    {
      number: "03",
      title: "Enable Learning & Competition",
      desc: "Provide structured platforms for hands-on learning, mentorship, and high-level competition for the younger generation.",
    },
    {
      number: "04",
      title: "Foster Responsible Engineering",
      desc: "Foster an innovation culture that upholds ethics, security-by-design, sustainability, and green engineering.",
    },
  ],

  contact: {
    instagram: "@techtonic.ui",
    instagramUrl: "https://instagram.com/techtonic.ui",
    email: "techtonicieeesbui2025@gmail.com",
    contacts: [
      { name: "Raddo", phone: "+62 821-6055-5955", role: "Contact Person" },
      { name: "James", phone: "+62 811-9554-788", role: "Contact Person" },
      { name: "Awan", phone: "+62 821-8387-1774", role: "Contact Person" },
    ],
  },

  overallTimeline: [
    {
      date: "17 – 27 Aug",
      title: "Early Registration",
      phase: "Registration",
    },
    {
      date: "28 Aug – 16 Sept",
      title: "Normal & Extended Registration",
      phase: "Registration",
    },
    {
      date: "17 Sept – 2 Oct",
      title: "Preliminary Proposal & BMC Submissions",
      phase: "Proposal",
    },
    {
      date: "3 Oct",
      title: "Grand Opening",
      phase: "Main Event",
    },
    {
      date: "4 Oct",
      title: "Semifinalist Announcement",
      phase: "Selection",
    },
    {
      date: "5 – 27 Oct",
      title: "Semifinal Stage: Full Proposal Submissions",
      phase: "Proposal",
    },
    {
      date: "30 Oct",
      title: "Finalist Announcement",
      phase: "Selection",
    },
    {
      date: "31 Oct",
      title: "Technical Meeting",
      phase: "Preparation",
    },
    {
      date: "1 – 20 Nov",
      title: "Final Sprint & Mentoring Period",
      phase: "Development",
    },
    {
      date: "21 Nov",
      title: "Finalist Presentation & Grand Closing",
      phase: "Exhibition",
    },
  ],

  competitions: {
    bpc: {
      id: "bpc",
      title: "Business Plan Competition (BPC)",
      subtitle: "Sustainable Energy and Electrification",
      tag: "Business & Sustainability",
      summary:
        "The Business Plan Competition (BPC) challenges participants to develop innovative technology-based business ideas emphasizing sustainability, industry relevance, and real-world implementation potential in renewable energy adoption, energy efficiency, electrification, and scalable business models.",
      theme: "Sustainable Energy and Electrification",
      registrationFee: {
        amount: "FREE",
        note: "Preliminary Stage is FREE. Semifinalists pay registration fee after qualifying.",
      },
      prizes: [
        { rank: "1st Place", prize: "IDR 6,500,000 + Certificate" },
        { rank: "2nd Place", prize: "IDR 3,500,000 + Certificate" },
        { rank: "3rd Place", prize: "IDR 1,500,000 + Certificate" },
        { rank: "Best Presentation", prize: "IDR 500,000 + Certificate" },
      ],
      eligibility:
        "Only active undergraduate students enrolled in accredited higher education institutions are eligible.",
      teamSize: "2–3 members per team",
      rules: [
        "Only undergraduate students are eligible.",
        "Teams consist of 2–3 participants.",
        "Team members may come from different institutions.",
        "Each participant may join only one team.",
        "Team members cannot be changed after registration.",
        "Judges' decisions are final.",
        "Business ideas must be original.",
        "Ideas must not have previously won a similar competition.",
        "Ideas must not already be fully developed organizational projects.",
        "Originality Statement is required with the Team Leader's signature over an Indonesian Rp10,000 stamp duty.",
        "Late submissions are not accepted. Deadlines are not extended.",
      ],
      flow: [
        {
          step: "01",
          title: "Preliminary: Business Model Canvas",
          desc: "Teams prepare and submit a 2-page Business Model Canvas (BMC) using the official template.",
        },
        {
          step: "02",
          title: "Semifinal: Proposal",
          desc: "Qualified semifinalists prepare and submit a comprehensive business proposal.",
        },
        {
          step: "03",
          title: "Final: Pitch Deck",
          desc: "Finalists prepare professional pitch decks and receive feedback during mentoring sessions.",
        },
        {
          step: "04",
          title: "Finalist Presentation & Grand Closing",
          desc: "Live pitch presentation to judging panel and official winner ceremony.",
        },
      ],
      requirements: [
        "BMC must use the official BMC format template provided in the guidebook.",
        "BMC must be written in proper English.",
        "Maximum length of 2 pages.",
        "Submitted in PDF format.",
        "Follow specified filename format: [BPC_Techtonic3.0_TeamName_BMC.pdf].",
        "Submission must be completed via the official Techtonic Google Form before deadline.",
      ],
      timeline: [
        { date: "17 – 27 Aug", title: "Early Registration" },
        { date: "28 Aug – 16 Sept", title: "Extended Registration" },
        {
          date: "17 Sept – 2 Oct",
          title: "Preliminary: BMC Making & Submission",
        },
        { date: "3 Oct", title: "Grand Opening" },
        { date: "4 Oct", title: "Semifinalist Announcement" },
        {
          date: "5 – 27 Oct",
          title: "Semifinal: Proposal Making & Submission",
        },
        { date: "30 Oct", title: "Finalist Announcement" },
        { date: "31 Oct", title: "Technical Meeting" },
        { date: "1 – 7 Nov", title: "Final: Pitch-deck Making & Submission" },
        { date: "8 – 20 Nov", title: "Finalist Private Mentoring" },
        {
          date: "21 Nov",
          title: "Finalist Presentation & Grand Closing",
        },
      ],
      href: "/techtonic/bpc",
    },

    hackathon: {
      id: "hackathon",
      title: "STASH — Smart Technology and Security Hackathon",
      subtitle: "Smart Technology & Secure Intelligence",
      tag: "Hackathon & Cybersecurity",
      summary:
        "STASH challenges participants to develop practical digital solutions using smart technologies while incorporating secure-by-design principles. Relevant areas include AI, IoT, automation, cybersecurity, data privacy, and resilient digital systems.",
      theme:
        "Secure-by-Design Smart Technology for Sustainable Digital Systems",
      registrationFee: {
        amount: "IDR 100,000",
        note: "Paid per team during registration with payment proof uploaded.",
      },
      prizes: [
        { rank: "1st Place", prize: "IDR 4,000,000 + Certificate" },
        { rank: "2nd Place", prize: "IDR 2,500,000 + Certificate" },
        { rank: "3rd Place", prize: "IDR 1,500,000 + Certificate" },
        { rank: "Best Creative", prize: "IDR 300,000 + Certificate" },
        { rank: "Best Booth", prize: "IDR 300,000 + Certificate" },
      ],
      eligibility:
        "Active senior high school students or equivalent, and higher education students enrolled in D3, D4, or Bachelor's (S1) programs.",
      teamSize: "3–4 members per team",
      rules: [
        "Active senior high school students or higher education students (D3/D4/S1).",
        "Teams consist of 3–4 participants.",
        "Members may come from different institutions.",
        "Each participant can join only one team.",
        "Team members cannot be changed after registration.",
        "Ideas must be original and not previously won a similar competition.",
        "Ideas must not already be fully developed organizational projects.",
        "Originality Statement is required.",
        "Late submissions are not accepted. No deadline extensions.",
        "Paid re-registration fees are non-refundable if participants withdraw.",
      ],
      flow: [
        {
          step: "01",
          title: "Concept Proposal",
          desc: "Submit concept proposal covering problem definition, architectural draft, and secure intelligence principles.",
        },
        {
          step: "02",
          title: "Full Proposal",
          desc: "Shortlisted teams submit full technical blueprint, threat modeling, and implementation schedule.",
        },
        {
          step: "03",
          title: "Development Period & Submission / MVP",
          desc: "Finalists develop their approved proposal into a functional Product or Minimum Viable Product (MVP).",
        },
        {
          step: "04",
          title: "Grand Closing & Awarding / Live Demo",
          desc: "Live demonstration and security pitch before a panel of cybersecurity and IoT industry leaders.",
        },
      ],
      pocBudget: "Rp150,000 – Rp300,000",
      requirements: [
        "Problem definition, proposed solution, and technical novelty.",
        "System architecture diagram and technical logic.",
        "Visual system diagrams & component breakdown.",
        "Proof-of-Concept scope and functional demonstration plan.",
        "Bill of Materials (BOM) and budget (Rp150,000–Rp300,000 POC budget range).",
        "SWOT analysis, implementation plan, and real-world practical impact.",
      ],
      timeline: [
        { date: "17 – 27 Aug", title: "Early Registration" },
        { date: "28 Aug – 16 Sept", title: "Normal Registration" },
        {
          date: "16 Sept – 2 Oct",
          title: "Extended Registration & Proposal Submission",
        },
        { date: "3 Oct", title: "Grand Opening" },
        { date: "4 Oct", title: "Semifinalist Announcement" },
        {
          date: "5 – 27 Oct",
          title: "Semifinal: Full Proposal making & submission",
        },
        { date: "30 Oct", title: "Finalist Announcement" },
        { date: "31 Oct", title: "Technical Meeting" },
        {
          date: "1 Nov – 20 Nov",
          title: "Final: Pitch-deck making & MVP development",
        },
        {
          date: "21 Nov",
          title: "Finalist Presentation & Grand Closing",
        },
      ],
      href: "/techtonic/hackathon",
    },

    stem: {
      id: "stem",
      title: "STEM Innovation — Project Exhibition",
      subtitle:
        "Connecting Lives through IoT: Engineering a Better-Integrated World",
      tag: "IoT & Hardware Exhibition",
      summary:
        "STEM Innovation challenges participants to design physical hardware prototypes, electronic systems, robotics, and IoT solutions that connect everyday objects through smart digital networks to automate tasks, monitor environments, and improve human life.",
      theme:
        "Connecting Lives through IoT: Engineering a Better-Integrated World",
      registrationFee: {
        amount: "FREE",
        note: "Free registration for high school and university student teams.",
      },
      prizes: [
        { rank: "1st Place", prize: "IDR 4,000,000 + Certificate" },
        { rank: "2nd Place", prize: "IDR 2,500,000 + Certificate" },
        { rank: "3rd Place", prize: "IDR 1,000,000 + Certificate" },
        { rank: "Best Creative", prize: "IDR 300,000 + Certificate" },
        { rank: "Best Cleanliness Code", prize: "IDR 300,000 + Certificate" },
      ],
      benefits: [
        "Hands-on experience developing a concept into a physical Proof of Concept.",
        "Networking opportunities with industry professionals and STEM peers.",
        "Cash prizes and official IEEE certificates.",
        "Practical skill development in engineering design, budgeting, and hardware troubleshooting.",
      ],
      eligibility:
        "High school students, vocational students, and university undergraduates in teams of 2–4 members.",
      teamSize: "2–4 members per team",
      rules: [
        "High school students, vocational students, and university undergraduates.",
        "Teams consist of 2–4 participants.",
        "Members may come from different institutions.",
        "Each participant can join only one team.",
        "Team members cannot be changed after registration.",
        "Originality Statement is required.",
        "Hardware prototype must operate safely within electrical and power guidelines.",
      ],
      flow: [
        {
          step: "01",
          title: "Project Concept Proposal",
          desc: "Submit IoT circuit design, hardware schematic, and target community application.",
        },
        {
          step: "02",
          title: "Technical Meeting",
          desc: "Briefing session on exhibition setup, hardware power requirements, and safety compliance.",
        },
        {
          step: "03",
          title: "Proof-of-Concept Construction",
          desc: "Teams assemble a functional physical prototype, sensor telemetry, and microcontroller integration.",
        },
        {
          step: "04",
          title: "Exhibition & Awarding",
          desc: "Interactive hardware exhibition booth showcase and evaluation during Techtonic 3.0 summit.",
        },
      ],
      pocBudget: "Rp150,000 – Rp300,000",
      requirements: [
        "Submit hardware schematic, micro-controller choice, and sensor setup details.",
        "Proof-of-Concept physical working prototype required for final booth exhibition.",
        "Adherence to Bill of Materials budget (Rp150,000–Rp300,000).",
        "Demonstration of practical application in energy, remote monitoring, or smart automation.",
      ],
      timeline: [
        { date: "17 – 27 Aug", title: "Early Registration" },
        { date: "28 Aug – 16 Sept", title: "Normal Registration" },
        {
          date: "16 Sept – 2 Oct",
          title: "Extended Registration & Proposal Submission",
        },
        { date: "3 Oct", title: "Grand Opening" },
        { date: "4 Oct", title: "Semifinalist Announcement" },
        {
          date: "5 – 27 Oct",
          title: "Semifinal: Full Proposal making & submission",
        },
        { date: "30 Oct", title: "Finalist Announcement" },
        { date: "31 Oct", title: "Technical Meeting" },
        {
          date: "1 Nov – 20 Nov",
          title: "Final: Pitch-deck & Proof-of-Concept Construction",
        },
        { date: "21 Nov", title: "Finalist Presentation & Grand Closing" },
      ],
      href: "/techtonic/stem",
    },
  },

  whyParticipate: [
    {
      title: "In-Depth Learning",
      desc: "Gain hands-on knowledge in sustainable business strategies, cybersecurity, IoT prototyping, and modern engineering.",
    },
    {
      title: "Competition Experience",
      desc: "Test your innovation against top student minds and young innovators from universities and high schools nationwide.",
    },
    {
      title: "Collaboration & Networking",
      desc: "Connect with multidisciplinary peers, academic mentors, and technology communities.",
    },
    {
      title: "Innovation Development",
      desc: "Transform abstract tech ideas into practical, real-world solutions with feedback from domain experts.",
    },
    {
      title: "Industry & Community Exposure",
      desc: "Showcase your work directly to corporate sponsors, academic leaders, and IEEE professional chapters.",
    },
    {
      title: "Impactful Solutions",
      desc: "Engage in solving real-world challenges around energy transition, secure digital systems, and smart integration.",
    },
  ],
};

export const isArchived = TECHTONIC_CONFIG.status === "archived";
