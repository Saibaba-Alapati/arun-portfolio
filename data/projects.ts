export type FwCard = { label: string; body: string; fullWidth?: boolean };

export type Project = {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  year: string;
  tags: string[];
  tagline: string;
  caseNumber: string;
  context?: string;
  heading: string;          // DM Serif Display h2 with optional <em>
  headingEm: string;        // the italic part
  framework: FwCard[];
  images: string[];
  learning: string;
  stats?: { value: string; label: string }[];
  campaignLink?: { label: string; url: string };
  externalLink?: { label: string; url: string };
};

export const projects: Project[] = [
  {
    slug: "keventers",
    title: "Keventers",
    category: "Beverage Brand",
    thumbnail: "/assets/k1.png",
    year: "2024",
    tags: ["Brand Strategy", "Social Media", "Storytelling"],
    tagline: "Making the product part of the story.",
    caseNumber: "Case Study 01",
    context:
      "Created for India's Best Marketer competition. The challenge: make a brand stand out without traditional advertising.",
    heading: "Making the Product\nPart of the",
    headingEm: "Story.",
    framework: [
      {
        label: "Problem",
        body: "How do you make a beverage brand <strong>memorable</strong> without making another beverage ad?",
      },
      {
        label: "Insight",
        body: "People remember <strong>stories more than product features.</strong> The feeling of discovery outlasts the product itself.",
      },
      {
        label: "Creative Idea",
        body: "A girl finds apology notes on Keventers products across the city. <strong>Each cup is a clue, each stall a checkpoint,</strong> until she finds him waiting with flowers.",
      },
      {
        label: "The Shift",
        body: "Keventers wasn't <strong>the product in the story.</strong> It became <strong>part of the story itself.</strong>",
      },
    ],
    images: ["/assets/k1.png", "/assets/k2.png", "/assets/k3.png"],
    learning:
      "The strongest brand integrations don't interrupt stories.\nThey become part of them.",
    campaignLink: {
      label: "Watch the campaign on LinkedIn",
      url: "https://www.linkedin.com/posts/aruntheja-vakulabharanam_marketing-advertising-brandstrategy-ugcPost-7378296297696546816-76oE/",
    },
  },
  {
    slug: "bhuvi-studio",
    title: "Bhuvi Studio",
    category: "Architecture & Design",
    thumbnail: "/assets/b1.png",
    year: "2024",
    tags: ["Founder-led Content", "Instagram Strategy", "Visual Storytelling"],
    tagline: "Making an architect's thinking the product itself.",
    caseNumber: "Case Study 02",
    heading: "People Connect With\nPeople,",
    headingEm: "Not Projects.",
    framework: [
      {
        label: "Problem",
        body: "Architecture content becomes a <strong>gallery of finished projects.</strong> Beautiful, but forgettable.",
      },
      {
        label: "Insight",
        body: "The founder's <strong>thinking was more interesting</strong> than the projects. The audience connected with the person, not the portfolio.",
      },
      {
        label: "Strategy",
        body: "Shifted to <strong>founder-led storytelling.</strong> Content built around process, design thinking and transformation rather than final outcomes. One reel showing a wall design transformation hit <strong>259,000+ views.</strong>",
        fullWidth: true,
      },
    ],
    images: ["/assets/b1.png", "/assets/b2.png", "/assets/b3.png"],
    learning: "Audiences are often more interested in the journey than the outcome.",
    stats: [{ value: "259K+", label: "Views on a single founder-led reel" }],
    externalLink: {
      label: "Watch Reel",
      url: "https://www.instagram.com/reel/DEEzUKYze7_/",
    },
  },
  {
    slug: "pedamma-pickles",
    title: "Pedamma Pickles",
    category: "Food & FMCG",
    thumbnail: "/assets/p1.png",
    year: "2023",
    tags: ["Nostalgia Marketing", "Regional Brand", "Content Strategy"],
    tagline: "Selling pickles by selling the memory of grandmother's kitchen.",
    caseNumber: "Pedamma Pickles",
    heading: "Emotion Drives Engagement\nMore Than",
    headingEm: "Product Features.",
    framework: [
      {
        label: "Insight",
        body: "People don't buy pickles. <strong>They buy nostalgia.</strong>",
      },
      {
        label: "Execution",
        body: "A gramophone. The founder grinding spices by hand. Familiar recipes made the way they always were. <strong>All to pull back a feeling of home.</strong>",
      },
    ],
    images: ["/assets/p1.png", "/assets/p2.png", "/assets/p3.png"],
    learning: "Emotion drives engagement\nmore than product features.",
    externalLink: {
      label: "Watch Reel",
      url: "https://www.instagram.com/reel/C9mqj3Bu8IN/",
    },
  },
  {
    slug: "husle",
    title: "Husle Lifestyle",
    category: "Fashion & Lifestyle",
    thumbnail: "/assets/h1.jpg",
    year: "2023",
    tags: ["Identity Marketing", "Fashion Brand", "Community Building"],
    tagline: "Dressing a mindset, not just a body.",
    caseNumber: "Husle Lifestyle",
    heading: "Different Products.\nDifferent",
    headingEm: "Emotions.",
    framework: [
      {
        label: "Insight",
        body: "People don't buy fashion. <strong>They buy identity.</strong>",
      },
      {
        label: "Execution",
        body: "Storytelling where the product disappears and the person becomes the story. Fashion as self-expression, <strong>accessories as personal language.</strong>",
      },
    ],
    images: ["/assets/h1.jpg", "/assets/h2.jpg"],
    learning: "Different audiences connect through\ndifferent emotional triggers.",
    externalLink: {
      label: "View Post",
      url: "https://www.linkedin.com/posts/aruntheja-vakulabharanam_startuplife-passiontoprofession-creativejourney-ugcPost-7344662506054774787-Os0Y/",
    },
  },
];
