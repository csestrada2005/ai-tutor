// Course interface with db_key for backend communication
export interface Course {
  id: string;      // db_key for backend
  name: string;    // display name
}

// Define courses per batch and term (id = db_key, name = display_name)
export const COURSES_BY_BATCH_TERM: Record<string, Record<string, Course[]>> = {
  "2029": {
    "term1": [
      { id: "AIML", name: "Machine Learning & AI Fundamentals" },
      { id: "Calculus", name: "Calculus" },
      { id: "Dropshipping", name: "E-Commerce Operations" },
      { id: "PublicSpeaking", name: "Professional Communication" },
      { id: "OOP", name: "Object-Oriented Programming" },
      { id: "DRP101", name: "E-Commerce Business Development" },
      { id: "FinanceBasics", name: "Financial Literacy Fundamentals" },
      { id: "LA101", name: "Global Trends & Economic Analysis" },
      { id: "MarketAnalysis", name: "Market Analysis & Decision Making" },
      { id: "Startup", name: "Startup Validation & Launch" },
      { id: "Networking", name: "Professional Networking" },
      { id: "Excel", name: "Advanced Spreadsheet Skills" },
      { id: "Statistics", name: "Business Statistics" },
      { id: "MarketGaps", name: "Market Opportunity Identification" },
      { id: "MetaMarketing", name: "Digital Marketing on Meta Platforms" },
      { id: "CRO", name: "Conversion Rate Optimization" },
    ],
    "term2": [
      { id: "CareerLabs", name: "Career Development Labs" },
      { id: "OfflineMarket", name: "Offline Market Strategy" },
      { id: "GlobalStartupEcon", name: "Global Startup Ecosystem Economics" },
      { id: "D2CBusiness", name: "Direct-to-Consumer Business" },
      { id: "CapstoneHours", name: "Capstone Project Hours" },
      { id: "BusinessMetrics", name: "Business Metrics & Innovation" },
      { id: "TaxesCompliance", name: "Tax & Compliance Fundamentals" },
      { id: "EconomicForces", name: "Economic Forces & Global Markets" },
      { id: "WorldCultures", name: "Cross-Cultural Business Practices" },
      { id: "AIMarketing", name: "AI-Powered Marketing Strategies" },
      { id: "BillionDollarBrand", name: "Consumer Psychology & Brand Building" },
    ],
  },
  "2028": {
    "term3": [
      { id: "KickstarterCampaign", name: "Crowdfunding Campaign Strategy" },
      { id: "ProductDesignKickstarter", name: "Product Design for Crowdfunding" },
      { id: "FundraisingVideo", name: "Video Production for Fundraising" },
      { id: "CapstoneHours", name: "Capstone Project Hours" },
      { id: "Web3Innovation", name: "Web3 & Blockchain Innovation" },
      { id: "BusinessMetrics", name: "Business Metrics & Innovation" },
      { id: "FundraisingStartups", name: "Startup Fundraising" },
      { id: "IPProtection", name: "Intellectual Property Protection" },
      { id: "AIPython", name: "AI Solutions with Python" },
      { id: "PublicSpeakingLevel2", name: "Advanced Professional Communication" },
      { id: "CopywritingSells", name: "Copywriting & Persuasion" },
      { id: "SingaporePolicy", name: "Southeast Asian Policy & Business" },
      { id: "EconomicForces", name: "Economic Forces & Global Markets" },
      { id: "CompetitiveStrategy", name: "Competitive Strategy" },
      { id: "NUSImmersion", name: "Strategy & Innovation Immersion" },
      { id: "CustomerInsights", name: "Customer Research & Insights" },
    ],
    "term4": [
      { id: "NudgeBehavior", name: "Behavioral Economics & Nudge Theory" },
      { id: "SustainableNudges", name: "Sustainable Behavior Change" },
      { id: "FinancialModels", name: "Financial Modeling" },
      { id: "ImpactInvestor", name: "Impact Investing & SROI" },
      { id: "TalentManagement", name: "Talent Management" },
      { id: "CrossCulturalLeadership", name: "Cross-Cultural Leadership" },
      { id: "NonProfitBrand", name: "Non-Profit Branding & Marketing" },
      { id: "SocialImpactVentures", name: "Social Impact Ventures" },
    ],
  },
};
