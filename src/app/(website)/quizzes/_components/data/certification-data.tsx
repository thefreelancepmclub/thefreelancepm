export type CertificationLevel = "entry" | "mid" | "senior";

export type Certification = {
  id: string;
  name: string;
  description: string;
  idealFor: string;
  prerequisites: string[];
  industries: string[];
};

export const certificationData: Record<
  CertificationLevel,
  Record<string, Certification[]>
> = {
  entry: {
    technology: [
      {
        id: "google",
        name: "Google Project Management Certification",
        description:
          "This entry-level certification provides foundational knowledge of project management. It covers essential concepts such as initiating projects, managing schedules, budgets, and teams, and applying best practices for project success. Ideal for those looking to break into project management or transition into the field.",
        idealFor: "Beginners or those new to project management.",
        prerequisites: [
          "No prerequisites; ideal for beginners.",
          "Offered via Coursera.",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Marketing & Advertising",
          "E-commerce & Retail",
          "Telecommunications",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "agilepm",
        name: "Agile Project Management (AgilePM®)",
        description:
          "AgilePM® certification focuses on Agile project management methods and frameworks. It is ideal for project managers and team leaders who want to integrate Agile principles into their project management practices, ensuring faster and more flexible project delivery.",
        idealFor:
          "Project managers working in Agile environments or transitioning from traditional methodologies.",
        prerequisites: [
          "No prerequisites for Foundation level",
          "Practitioner level requires passing the Foundation exam",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Telecommunications",
        ],
      },
    ],
    healthcare: [
      {
        id: "capm",
        name: "Certified Associate in Project Management (CAPM)®",
        description:
          "The CAPM certification is designed for those starting their project management career. It provides a solid foundation in project management terminology, processes, and best practices. A great starting point for individuals looking to advance their careers in project management.",
        idealFor:
          "Aspiring project managers or those with limited project management experience.",
        prerequisites: [
          "High school diploma, associate's degree, or equivalent",
          "23 hours of project management education or CAPM course completion",
        ],
        industries: [
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "E-commerce & Retail",
          "Manufacturing",
          "Pharmaceuticals & Biotechnology",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "ccpm",
        name: "Certified Clinical Project Manager (CCPM)",
        description:
          "The CCPM certification is for professionals working in clinical project management, particularly in pharmaceutical and healthcare industries. It covers managing clinical trials, research, regulatory requirements, and compliance in project management within healthcare.",
        idealFor:
          "Project managers in the healthcare or clinical research sectors.",
        prerequisites: [
          "Bachelor's degree in life sciences, healthcare, or related field",
          "Clinical research or project management experience recommended",
        ],
        industries: ["Healthcare", "Pharmaceuticals & Biotechnology"],
      },
    ],
    finance: [
      {
        id: "capm",
        name: "Certified Associate in Project Management (CAPM)®",
        description:
          "The CAPM certification is designed for those starting their project management career. It provides a solid foundation in project management terminology, processes, and best practices. A great starting point for individuals looking to advance their careers in project management.",
        idealFor:
          "Aspiring project managers or those with limited project management experience.",
        prerequisites: [
          "High school diploma, associate's degree, or equivalent",
          "23 hours of project management education or CAPM course completion",
        ],
        industries: [
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "E-commerce & Retail",
          "Manufacturing",
          "Pharmaceuticals & Biotechnology",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "prince2",
        name: "PRINCE2 Foundation",
        description:
          "PRINCE2 is a widely recognized project management methodology. The Foundation level covers the fundamental principles of PRINCE2, including its processes, themes, and roles. Ideal for professionals who want to gain a structured and internationally recognized approach to project management.",
        idealFor:
          "Individuals working in or aspiring to work in structured project management environments, especially in Europe.",
        prerequisites: [
          "No prerequisites; open to anyone interested in project management",
        ],
        industries: [
          "Finance & Banking",
          "Marketing & Advertising",
          "Government & Public Sector",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Nonprofit & Social Impact",
          "Hospitality & Tourism",
        ],
      },
    ],
    construction: [
      {
        id: "capm",
        name: "Certified Associate in Project Management (CAPM)®",
        description:
          "The CAPM certification is designed for those starting their project management career. It provides a solid foundation in project management terminology, processes, and best practices. A great starting point for individuals looking to advance their careers in project management.",
        idealFor:
          "Aspiring project managers or those with limited project management experience.",
        prerequisites: [
          "High school diploma, associate's degree, or equivalent",
          "23 hours of project management education or CAPM course completion",
        ],
        industries: [
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "E-commerce & Retail",
          "Manufacturing",
          "Pharmaceuticals & Biotechnology",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "ccm",
        name: "Certified Construction Manager (CCM)",
        description:
          "The CCM certification is ideal for individuals working in or pursuing careers in construction project management. It validates the knowledge and expertise required to manage the planning, design, construction, and completion of projects in the construction industry.",
        idealFor: "Professionals working in construction project management.",
        prerequisites: [
          "Four-year degree in construction-related field + 4 years construction management experience OR",
          "Eight years of experience with no degree",
        ],
        industries: ["Construction & Engineering"],
      },
    ],
    marketing: [
      {
        id: "google",
        name: "Google Project Management Certification",
        description:
          "This entry-level certification provides foundational knowledge of project management. It covers essential concepts such as initiating projects, managing schedules, budgets, and teams, and applying best practices for project success. Ideal for those looking to break into project management or transition into the field.",
        idealFor: "Beginners or those new to project management.",
        prerequisites: [
          "No prerequisites; ideal for beginners.",
          "Offered via Coursera.",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Marketing & Advertising",
          "E-commerce & Retail",
          "Telecommunications",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "prince2",
        name: "PRINCE2 Foundation",
        description:
          "PRINCE2 is a widely recognized project management methodology. The Foundation level covers the fundamental principles of PRINCE2, including its processes, themes, and roles. Ideal for professionals who want to gain a structured and internationally recognized approach to project management.",
        idealFor:
          "Individuals working in or aspiring to work in structured project management environments, especially in Europe.",
        prerequisites: [
          "No prerequisites; open to anyone interested in project management",
        ],
        industries: [
          "Finance & Banking",
          "Marketing & Advertising",
          "Government & Public Sector",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Nonprofit & Social Impact",
          "Hospitality & Tourism",
        ],
      },
    ],
    ecommerce: [
      {
        id: "google",
        name: "Google Project Management Certification",
        description:
          "This entry-level certification provides foundational knowledge of project management. It covers essential concepts such as initiating projects, managing schedules, budgets, and teams, and applying best practices for project success. Ideal for those looking to break into project management or transition into the field.",
        idealFor: "Beginners or those new to project management.",
        prerequisites: [
          "No prerequisites; ideal for beginners.",
          "Offered via Coursera.",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Marketing & Advertising",
          "E-commerce & Retail",
          "Telecommunications",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "capm",
        name: "Certified Associate in Project Management (CAPM)®",
        description:
          "The CAPM certification is designed for those starting their project management career. It provides a solid foundation in project management terminology, processes, and best practices. A great starting point for individuals looking to advance their careers in project management.",
        idealFor:
          "Aspiring project managers or those with limited project management experience.",
        prerequisites: [
          "High school diploma, associate's degree, or equivalent",
          "23 hours of project management education or CAPM course completion",
        ],
        industries: [
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "E-commerce & Retail",
          "Manufacturing",
          "Pharmaceuticals & Biotechnology",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Agriculture & Food Industry",
        ],
      },
    ],
    telecommunications: [
      {
        id: "google",
        name: "Google Project Management Certification",
        description:
          "This entry-level certification provides foundational knowledge of project management. It covers essential concepts such as initiating projects, managing schedules, budgets, and teams, and applying best practices for project success. Ideal for those looking to break into project management or transition into the field.",
        idealFor: "Beginners or those new to project management.",
        prerequisites: [
          "No prerequisites; ideal for beginners.",
          "Offered via Coursera.",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Marketing & Advertising",
          "E-commerce & Retail",
          "Telecommunications",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "agilepm",
        name: "Agile Project Management (AgilePM®)",
        description:
          "AgilePM® certification focuses on Agile project management methods and frameworks. It is ideal for project managers and team leaders who want to integrate Agile principles into their project management practices, ensuring faster and more flexible project delivery.",
        idealFor:
          "Project managers working in Agile environments or transitioning from traditional methodologies.",
        prerequisites: [
          "No prerequisites for Foundation level",
          "Practitioner level requires passing the Foundation exam",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Telecommunications",
        ],
      },
    ],
    manufacturing: [
      {
        id: "capm",
        name: "Certified Associate in Project Management (CAPM)®",
        description:
          "The CAPM certification is designed for those starting their project management career. It provides a solid foundation in project management terminology, processes, and best practices. A great starting point for individuals looking to advance their careers in project management.",
        idealFor:
          "Aspiring project managers or those with limited project management experience.",
        prerequisites: [
          "High school diploma, associate's degree, or equivalent",
          "23 hours of project management education or CAPM course completion",
        ],
        industries: [
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "E-commerce & Retail",
          "Manufacturing",
          "Pharmaceuticals & Biotechnology",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "lssgb",
        name: "Lean Six Sigma Green Belt",
        description:
          "Lean Six Sigma certifications focus on process optimization and quality management. The Green Belt is for professionals who want to lead projects that improve processes.",
        idealFor:
          "Project managers, process improvement specialists, and those in quality management roles.",
        prerequisites: [
          "No prerequisites (some providers recommend work experience)",
        ],
        industries: [
          "Manufacturing",
          "E-commerce & Retail",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
    ],
    // Add more industries and their certifications as needed
  },
  mid: {
    technology: [
      {
        id: "pmp",
        name: "Project Management Professional (PMP)®",
        description:
          "The PMP certification is one of the most respected in the project management industry. It demonstrates advanced project management experience and knowledge of methodologies. It is ideal for experienced project managers who want to take their careers to the next level.",
        idealFor:
          "Experienced project managers seeking to validate their skills and knowledge.",
        prerequisites: [
          "Four-year degree + 36 months project experience + 35 hours project management training OR",
          "High school diploma/associate degree + 60 months project experience + 35 hours project management training",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Healthcare",
          "Finance & Banking",
          "Construction & Engineering",
          "Marketing & Advertising",
          "E-commerce & Retail",
          "Telecommunications",
          "Manufacturing",
          "Education & E-learning",
          "Pharmaceuticals & Biotechnology",
          "Government & Public Sector",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Energy & Utilities",
          "Automotive & Aerospace",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Hospitality & Tourism",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "pmi-acp",
        name: "Agile Certified Practitioner (PMI-ACP)®",
        description:
          "The PMI-ACP certification is designed for those who work in Agile project management or are involved in Agile practices. It covers Agile principles, practices, and tools, making it ideal for project managers who want to gain credibility in Agile methodologies.",
        idealFor:
          "Project managers and professionals working in Agile environments.",
        prerequisites: [
          "Secondary degree (high school diploma or higher)",
          "21 contact hours of Agile training",
          "12 months of general project experience in the last 5 years (or PMP/CAPM certification)",
          "8 months of Agile project experience in the last 3 years",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Marketing & Advertising",
          "Education & E-learning",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
        ],
      },
    ],
    // Add more industries and their certifications for mid-level
  },
  senior: {
    technology: [
      {
        id: "pfmp",
        name: "Portfolio Management Professional (PfMP)®",
        description:
          "The PfMP certification is designed for those responsible for portfolio management, overseeing multiple projects and programs to achieve strategic goals. It is ideal for senior-level professionals who align portfolios with organizational strategy.",
        idealFor:
          "Professionals responsible for managing multiple projects and programs within an organization.",
        prerequisites: [
          "Bachelor's degree + 48 months of portfolio management experience + 96 months of business experience OR",
          "High school diploma + 84 months of portfolio management experience + 96 months of business experience",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Finance & Banking",
          "E-commerce & Retail",
          "Manufacturing",
          "Cybersecurity",
          "Real Estate & Property Management",
          "Transportation & Logistics",
          "Education & E-learning",
          "Automotive & Aerospace",
          "Nonprofit & Social Impact",
          "Entertainment & Media",
          "Agriculture & Food Industry",
        ],
      },
      {
        id: "safe",
        name: "SAFe Agilist (SA)",
        description:
          "The SAFe Agilist certification is designed for those who want to learn how to scale Agile practices across the enterprise. It's ideal for professionals who are part of or leading Agile transformations within larger organizations.",
        idealFor:
          "Agile professionals looking to implement and scale Agile across organizations.",
        prerequisites: [
          "No formal prerequisites",
          "Experience in Agile, Scrum, or Lean recommended",
          "Must attend a SAFe Agilist training course",
        ],
        industries: [
          "Technology (IT & Software Development)",
          "Telecommunications",
        ],
      },
    ],
    // Add more industries and their certifications for senior-level
  },
};

// Helper function to determine experience level
export function getExperienceLevel(years: string): CertificationLevel {
  if (years === "0-1" || years === "2-3") {
    return "entry";
  } else if (years === "4-5" || years === "6-7") {
    return "mid";
  } else {
    return "senior";
  }
}

// Helper function to get recommended certifications
export function getRecommendedCertifications(
  industry: string,
  experienceYears: string,
  currentCertifications: string[],
): Certification[] {
  const level = getExperienceLevel(experienceYears);

  // Get certifications for the industry and level
  let recommendations: Certification[] = [];

  // Try to get recommendations for the specific industry
  if (certificationData[level][industry]) {
    recommendations = certificationData[level][industry];
  } else {
    // If no specific recommendations for this industry, get general recommendations
    // This is a fallback in case we don't have data for a specific industry
    const generalIndustries = ["technology", "healthcare", "finance"];
    for (const generalIndustry of generalIndustries) {
      if (certificationData[level][generalIndustry]) {
        recommendations = certificationData[level][generalIndustry];
        break;
      }
    }
  }

  // Filter out certifications the user already has
  const filteredRecommendations = recommendations.filter(
    (cert) => !currentCertifications.includes(cert.id),
  );

  // If all recommended certifications are already held, try the next level up
  if (filteredRecommendations.length === 0) {
    if (level === "entry") {
      return getRecommendedCertifications(
        industry,
        "4-5",
        currentCertifications,
      ); // Try mid-level
    } else if (level === "mid") {
      return getRecommendedCertifications(
        industry,
        "8-9",
        currentCertifications,
      ); // Try senior-level
    } else {
      // If they already have all senior-level certifications, return empty array
      return [];
    }
  }

  return filteredRecommendations;
}
