// Network & Collaborators Data
// This file contains the directory of Founders, CTOs, Engineering Leaders, and Mentors.
// You can replace the placeholder names, titles, companies, and image paths whenever you are ready!
// To add photos: place your images in /public/network/ (e.g., /public/network/founder1.jpg)
// and set imageUrl to "/network/founder1.jpg". If left empty (""), an elegant blank placeholder frame will be rendered.

export interface NetworkPerson {
  id: string;
  name: string;
  role: string;
  company: string;
  category: "Founder" | "CTO" | "Mentor" | "Advisor";
  bio: string;
  imageUrl?: string; // Leave empty or provide path: "/network/founder-name.jpg"
  linkedinUrl?: string;
  twitterUrl?: string;
  tags: string[];
}

export const networkMembers: NetworkPerson[] = [
  {
    id: "founder-1",
    name: "AI Startup Founder & Keynote Speaker",
    role: "Keynote Speaker & AI Founder",
    company: "AgentsNexus Summit",
    category: "Founder",
    bio: "Exchanging architecture insights on enterprise multi-agent workflows, state machine determinism, and production agent deployment.",
    imageUrl: "/images/afnan-agentsnexus-stage.jpg",
    linkedinUrl: "https://linkedin.com",
    tags: ["Agentic AI", "Enterprise Workflows", "State Machines"],
  },
  {
    id: "cto-1",
    name: "Engineering Leader / Graph AI",
    role: "Graph Systems & Tech Leader",
    company: "Neo4j / Tech Ecosystem",
    category: "CTO",
    bio: "Collaborating on Graph RAG architectures, knowledge graph retrieval, and ultra low-latency database backends for intelligent systems.",
    imageUrl: "/images/afnan-neo4j-leader.jpg",
    linkedinUrl: "https://linkedin.com",
    tags: ["Graph RAG", "Knowledge Graphs", "Neo4j", "Distributed Systems"],
  },
  {
    id: "mentor-1",
    name: "Field CTO",
    role: "Field CTO",
    company: "Entire",
    category: "CTO",
    bio: "Field CTO at Entire (Developer Platform Partner at Bengaluru Tech Week). Exchanging architecture insights on developer tooling, cloud agents, and autonomous infrastructure.",
    imageUrl: "/images/afnan-agentsnexus-mentor.jpg",
    linkedinUrl: "https://entire.com",
    tags: ["Field CTO", "Entire", "Developer Platforms", "Cloud Agents"],
  },
  {
    id: "founder-2",
    name: "AgentsNexus Summit",
    role: "India's Premier Agentic AI Conference",
    company: "AgentsNexus.io",
    category: "Advisor",
    bio: "Premier national conference and initiative bringing together AI leaders, agent developers, and venture partners in Bengaluru.",
    imageUrl: "/images/agentsnexus-banner.jpg",
    linkedinUrl: "https://agentsnexus.io",
    tags: ["The Future Runs on AI Agents", "Conferences", "Bengaluru Tech"],
  },
  {
    id: "cto-2",
    name: "AgentsNexus Builder Crew",
    role: "Organizing & Technical Cohort",
    company: "AgentsNexus Community",
    category: "Founder",
    bio: "Co-organizing and supporting developer operations for national AI summits, hackathons, and agentic workflows.",
    imageUrl: "/images/agentsnexus-stage-crew.jpg",
    linkedinUrl: "https://linkedin.com",
    tags: ["Builder Community", "Summit Ops", "Agentic AI"],
  },
  {
    id: "advisor-1",
    name: "BTW Buildathon Cohort",
    role: "Hackathon & Engineering Fellows",
    company: "Scaler School of Technology",
    category: "Advisor",
    bio: "Intensive buildathon cohort collaborating on high-concurrency systems, civic prototypes, and agent automation during Bengaluru Tech Week.",
    imageUrl: "/images/btw-buildathon-scaler.jpg",
    linkedinUrl: "https://linkedin.com",
    tags: ["Buildathon", "Scaler", "Bengaluru Tech Week"],
  },
];
