// All website content lives here. Edit this file to update the portfolio.
const BASE = import.meta.env.BASE_URL;

export const profile = {
  name: "Vishal Singh",
  role: "Cloud Engineer",
  headline: ["Azure & Kubernetes", "DevSecOps", "Agentic AI"],
  location: "Augsburg, Germany",
  email: "vishal8840906676@gmail.com",
  photo: `${BASE}vishal.jpg`,
  cv: `${BASE}Vishal_Singh_CV.pdf`,
  intro:
    "I build and run cloud platforms on Azure and Kubernetes, automate delivery with CI/CD and infrastructure as code, " +
    "and build security in from day one. I also build AI agents and help teams adopt AI safely.",
  about: [
    "Cloud Engineer and Azure Solutions Architect Expert with 7+ years of experience, from .NET and Angular product teams in India to cloud products at baramundi software in Augsburg.",
    "I have led teams of 5–6 developers on insurance platforms for global clients such as Samsung and Assurant, and built GDPR-compliant systems for the EU market.",
    "Today I work on a cloud platform that keeps company devices secure and up to date (AKS, IoT Hub, Event Hubs), and I lead AI adoption: AI agents, RAG, MCP, and coaching teams on GitHub Copilot and Claude.",
    "Outside work I teach: I founded The Growth Club, a learning community of 2,000+ members, and publish free Python and Git courses on my YouTube channel CodeMitVishal.",
  ],
  stats: [
    { value: "7+", label: "years building cloud software" },
    { value: "7", label: "certifications (6 Microsoft)" },
    { value: "5–6", label: "developers led" },
    { value: "~4", label: "years hands-on with AI" },
  ],
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/vishal-s-694502112/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/CodeMitVishal", icon: "github" },
    { name: "YouTube", url: "https://www.youtube.com/@CodeMitVishal", icon: "youtube" },
    { name: "Email", url: "mailto:vishal8840906676@gmail.com", icon: "mail" },
  ],
};

export const experience = [
  {
    role: "Software Engineer – Cloud Products",
    company: "baramundi software GmbH",
    place: "Augsburg, Germany",
    period: "03/2025 – Present",
    context: "baramundi Endpoint Management: software that keeps company devices secure, patched and up to date.",
    points: [
      "Build and run microservices on Azure Kubernetes (AKS) that scale with demand (KEDA) and deploy automatically through GitOps (ArgoCD).",
      "Designed how devices securely sync their settings with the cloud, at scale (Azure IoT Hub Device Twin).",
      "Built reliable event messaging with Event Hubs and Service Bus, using the Outbox pattern so no event is lost.",
      "Implemented sign-in and identity for customer-facing apps (B2C), with several layers of protection.",
      "Built AI agent prototypes that use tools and search company data (Azure AI Foundry, Semantic Kernel, MCP, RAG).",
      "Lead AI adoption across the company: find where AI adds value, assess risks and governance, coach teams on GitHub Copilot and Claude.",
      "Designed GraphQL APIs for device data, and admin dashboards that spot unhealthy devices and fix them automatically.",
      "Lead 5 developers across the Angular front end and AKS back end: mentoring, code reviews and sprint demos.",
    ],
    stack: ["AKS", "KEDA", "ArgoCD", "IoT Hub", "Event Hubs", "Service Bus", "Redis", "Azure SQL", "PostgreSQL", "MongoDB", ".NET 10", "GraphQL", "Angular 20"],
  },
  {
    role: "Full-Stack Developer Lead / Team Lead",
    company: "RDA Labs Pvt Ltd",
    place: "India",
    period: "02/2020 – 12/2023",
    award: "Top Performer",
    context: "Clients: Assurant (global insurance), KPK FinServ (financial reconciliation), GradImages (graduation photography).",
    points: [
      "Led 5–6 developers building insurance platforms for global clients, including Samsung (UK, Italy, Germany, Spain).",
      "Owned CI/CD from test to production in Azure DevOps, with automatic code-quality and security checks (SonarCloud).",
      "Set up Azure infrastructure with Terraform and ARM templates; packaged services with Docker.",
      "Built GDPR-compliant systems for EU markets: consent management, protected personal data, Key Vault and audit logging.",
      "Connected risk-data providers (Verisk, LexisNexis) to an underwriting tool, giving underwriters decision-ready data.",
      "Built Azure AI face recognition that finds graduates in ceremony photos (GradImages).",
      "Loaded Excel files with 1.5M+ rows into Cosmos DB using Azure Durable Functions.",
    ],
    stack: ["Azure Functions", "API Management", "Azure AI", "Terraform", "Docker", "Azure DevOps", "SonarCloud", ".NET Core", "Angular 11"],
  },
  {
    role: ".NET Developer / Full-Stack Developer",
    company: "Euromonitor Research and Consulting",
    place: "India",
    period: "09/2018 – 01/2020",
    award: "Champion of the Month",
    context: "Global market research and data company.",
    points: [
      "Moved on-premises apps to Azure (App Services, VMs, Blob Storage) using ARM templates.",
      "Built APIs and screens for the user and subscription features of Passport, a global market-research platform.",
      "Built IKEA Market Insights, a price-comparison tool.",
      "Set up CI/CD (Azure DevOps/TFS) and unit and end-to-end tests (xUnit, Jasmine, Protractor).",
    ],
    stack: ["App Services", "Durable Functions", "Key Vault", "Redis", "Data Factory", "ARM", ".NET Core", "Angular 6/8"],
  },
  {
    role: "Engineer Trainee",
    company: "Centre for Development of Advanced Computing (C-DAC)",
    place: "India",
    period: "02/2018 – 08/2018",
    points: ["Built the API (test-driven) and student screens for a campus placement web app, and set up its deployment on TFS."],
    stack: [".NET", "TDD", "TFS"],
  },
];

// Professional projects (client and company work; code is private)
export const workProjects = [
  {
    title: "Cloud Device Management Platform",
    org: "baramundi software · 2025–now",
    text: "Cloud services for baramundi Endpoint Management: devices sync securely with the cloud, events never get lost, and dashboards fix unhealthy devices automatically.",
    tags: ["AKS", "KEDA", "ArgoCD", "IoT Hub", "Event Hubs", "GraphQL"],
    icon: "cloud",
  },
  {
    title: "AI Agents & AI Adoption",
    org: "baramundi software · 2025–now",
    text: "AI agent prototypes that use tools and search company knowledge, plus a company-wide AI adoption programme with risk assessment and coaching.",
    tags: ["Azure AI Foundry", "Semantic Kernel", "MCP", "RAG", "Copilot"],
    icon: "spark",
  },
  {
    title: "Global Insurance Sales Platform",
    org: "Assurant / Samsung Care+ · RDA Labs",
    text: "Insurance platform for mobile devices sold in the UK, Italy, Germany and Spain, built GDPR-compliant with consent management, Key Vault and audit logging.",
    tags: [".NET", "Angular", "Azure", "Terraform", "GDPR"],
    icon: "shield",
  },
  {
    title: "Underwriting Risk-Data Hub",
    org: "Insurance client · RDA Labs",
    text: "Connected risk-data providers Verisk and LexisNexis to an underwriting tool so underwriters get decision-ready data in one place.",
    tags: ["APIs", "Integration", "Azure Functions"],
    icon: "chart",
  },
  {
    title: "Graduate Face Recognition",
    org: "GradImages · RDA Labs",
    text: "Azure AI face recognition that finds each graduate in thousands of ceremony photos.",
    tags: ["Azure AI", "Computer Vision", ".NET"],
    icon: "face",
  },
  {
    title: "Financial Reconciliation & Large Imports",
    org: "KPK FinServ · RDA Labs",
    text: "Financial reconciliation work, including loading Excel files with 1.5M+ rows into Cosmos DB with Azure Durable Functions.",
    tags: ["Durable Functions", "Cosmos DB", "C#"],
    icon: "table",
  },
  {
    title: "Passport Market Research Platform",
    org: "Euromonitor International",
    text: "User and subscription features (APIs and screens) for Passport, Euromonitor's global market-research platform.",
    tags: [".NET Core", "Angular", "Azure"],
    icon: "globe",
    url: "https://www.euromonitor.com/our-expertise/passport",
  },
  {
    title: "IKEA Market Insights",
    org: "Euromonitor International",
    text: "A price-comparison tool that helps IKEA understand competitor prices across markets.",
    tags: [".NET Core", "Angular", "Data"],
    icon: "tag",
  },
  {
    title: "Campus Placement Portal",
    org: "C-DAC",
    text: "Test-driven API and student screens for a campus placement web application, deployed with TFS.",
    tags: [".NET", "TDD", "TFS"],
    icon: "school",
  },
];

// Free courses I created and teach on YouTube
export const courses = [
  {
    title: "Python Foundations",
    text: "Python from zero: variables to classes, files and exceptions, with slides, exercises and quizzes.",
    url: "https://github.com/CodeMitVishal/python-foundations",
    tags: ["Modules 0–7", "Beginner"],
  },
  {
    title: "Python Pro",
    text: "Advanced Python and web development: testing, concurrency, FastAPI, Django, security, Docker, Azure, algorithms and AI.",
    url: "https://github.com/CodeMitVishal/python-pro",
    tags: ["Modules 8–30", "Interview prep"],
  },
  {
    title: "Git Pro",
    text: "Git from zero to hero: real Git output, hands-on exercises, internals, debugging and team workflows.",
    url: "https://github.com/CodeMitVishal/git-pro",
    tags: ["12 modules", "Exercises"],
  },
];

// Open-source projects and proofs of concept on GitHub (forks excluded)
const gh = (name) => `https://github.com/CodeMitVishal/${name}`;
export const repos = [
  { name: "python-pro", text: "Free advanced Python course: from foundations to pro, web development and AI.", lang: "Python", year: 2026, cats: ["Courses", "Python", "AI"] },
  { name: "git-pro", text: "Git from zero to hero: lessons with real Git output, exercises and interview questions.", lang: "Python", year: 2026, cats: ["Courses"] },
  { name: "python-foundations", text: "Code, exercises and slides for the Python Foundations course.", lang: "Python", year: 2026, cats: ["Courses", "Python"] },
  { name: "UniLingual", text: "One tool for all tongues: a multilingual translation tool.", lang: "—", year: 2025, cats: ["Full stack", "AI"] },
  { name: "UniLingual.Api", text: "The API behind UniLingual.", lang: "TypeScript", year: 2025, cats: ["Full stack", "AI"] },
  { name: "Insurance.API", text: "An insurance domain REST API in .NET.", lang: "C#", year: 2025, cats: [".NET"] },
  { name: "VishalPortfolio-React", text: "This website: a React portfolio built with Vite.", lang: "JavaScript", year: 2026, cats: ["Frontend"] },
  { name: "GangOfFour.DesignPatterns", text: "The classic Gang of Four design patterns implemented in C#.", lang: "C#", year: 2024, cats: [".NET"] },
  { name: "Blazor.App.POC", text: "Proof of concept of a Blazor web application.", lang: "HTML", year: 2024, cats: [".NET", "Frontend"] },
  { name: "Python.FastAPI", text: "REST endpoints built with Python FastAPI.", lang: "Python", year: 2024, cats: ["Python"] },
  { name: "React-App", text: "A React application.", lang: "JavaScript", year: 2024, cats: ["Frontend"] },
  { name: "FlightChangeDetection.ConsoleApp", text: "A .NET console app that detects changes in flight schedules.", lang: "C#", year: 2024, cats: [".NET"] },
  { name: "Clinic-Api", text: "Coding challenge: a clinic REST API.", lang: "HTML", year: 2023, cats: [".NET"] },
  { name: "DebateLeadToSolution.UI", text: "An online portal where citizens debate their country's problems to find solutions together.", lang: "TypeScript", year: 2023, cats: ["Full stack", "Frontend"] },
  { name: "DebateLeadToSolution.API", text: "Three microservices that power the DebateLeadToSolution micro-UI.", lang: "HTML", year: 2020, cats: ["Full stack", ".NET"] },
  { name: "DataProcessor", text: "A C# data processing application.", lang: "C#", year: 2022, cats: [".NET"] },
  { name: "Bluetech", text: "A proof-of-concept company website.", lang: "HTML", year: 2021, cats: ["Frontend"] },
  { name: "angular-material-table-pagination", text: "Angular Material table with pagination.", lang: "TypeScript", year: 2021, cats: ["Frontend"] },
  { name: "Angular.BestPractices", text: "Angular best practices in one project.", lang: "TypeScript", year: 2020, cats: ["Frontend"] },
  { name: "akita-session-POC", text: "Session state management with Akita in Angular.", lang: "TypeScript", year: 2020, cats: ["Frontend"] },
  { name: "akita-todos-app-POC", text: "A todo app using the Akita state management library.", lang: "TypeScript", year: 2020, cats: ["Frontend"] },
  { name: "BlobTriggerToReadCSVToCosmosDB", text: "Azure Functions reading CSV files with 1.5 million records and writing them to Cosmos DB.", lang: "C#", year: 2020, cats: ["Azure", ".NET"] },
  { name: "AzureDataFactory.POC", text: "Proof of concept for Azure Data Factory pipelines.", lang: "—", year: 2020, cats: ["Azure"] },
  { name: "FunctionApp1.ServiceBus.POC", text: "Azure Functions with Azure Service Bus messaging.", lang: "C#", year: 2020, cats: ["Azure", ".NET"] },
  { name: "StudentManagementPortal", text: "A student management web portal.", lang: "TypeScript", year: 2020, cats: ["Full stack", "Frontend"] },
  { name: "WebApiHMACAuthentication", text: "Securing ASP.NET Web API with HMAC authentication.", lang: "C#", year: 2020, cats: [".NET", "Security"] },
  { name: "FullStackDeveloper.WebAPI", text: "Open-source API to help people become full-stack developers.", lang: "C#", year: 2020, cats: [".NET"] },
  { name: "POC.AzureRedisCache.ArmTemplate", text: "Creating Azure Redis Cache with an ARM template.", lang: "PowerShell", year: 2020, cats: ["Azure", "DevOps"] },
  { name: "AzureFunctionApp", text: "An Azure Function app.", lang: "C#", year: 2019, cats: ["Azure", ".NET"] },
  { name: "POC-Azure-Login", text: "Sign-in with Azure Active Directory: proof of concept.", lang: "HTML", year: 2019, cats: ["Azure", "Security"] },
  { name: "KeyVault.NetCore.POC", text: "Reading secrets from Azure Key Vault in .NET Core.", lang: "HTML", year: 2019, cats: ["Azure", "Security"] },
  { name: "Deploy-Storage-Accounts", text: "Deploying Azure Storage Accounts with ARM templates.", lang: "—", year: 2019, cats: ["Azure", "DevOps"] },
  { name: "SQLConcepts", text: "SQL concepts and practice queries.", lang: "—", year: 2019, cats: ["Data"] },
  { name: "BankingApp", text: "A banking web application.", lang: "JavaScript", year: 2019, cats: ["Full stack"] },
  { name: "Customer.API", text: "A starter .NET Core Web API for learning: customers CRUD.", lang: "C#", year: 2019, cats: [".NET"] },
  { name: "AngularRouting", text: "Angular routing, auth guards and a Node REST API.", lang: "TypeScript", year: 2019, cats: ["Frontend", "Full stack"] },
  { name: "MSDNPOCs", text: "A collection of proofs of concept.", lang: "JavaScript", year: 2019, cats: ["Full stack"] },
  { name: "Corrier-DoorStepFinalProject", text: "Courier doorstep-delivery final project.", lang: "—", year: 2019, cats: ["Full stack"] },
  { name: "C-Training", text: "C# training exercises.", lang: "JavaScript", year: 2018, cats: [".NET"] },
].map((r) => ({ ...r, url: gh(r.name) }));

export const skills = [
  { title: "Cloud (Azure)", items: ["AKS", "Azure Functions", "App Services", "Event Hubs", "Service Bus", "IoT Hub", "API Management", "Key Vault", "Application Insights"] },
  { title: "DevOps & automation", items: ["Azure DevOps CI/CD", "GitOps (ArgoCD)", "Terraform", "ARM templates", "Docker", "Kubernetes", "KEDA"] },
  { title: "AI", items: ["AI agents", "Azure AI Foundry", "Semantic Kernel", "MCP", "RAG", "Azure AI Search", "AI governance", "GitHub Copilot", "Claude"] },
  { title: "Security", items: ["OAuth2", "JWT", "Azure AD B2C", "Secrets management", "Defense in depth", "GDPR", "Compliance logging"] },
  { title: "Back end", items: ["C#", ".NET 10/8", "ASP.NET Web API", "EF Core", "REST", "GraphQL", "Microservices", "Event-driven design", "Python", "FastAPI"] },
  { title: "Front end & data", items: ["Angular", "TypeScript", "React", "SQL Server", "Azure SQL", "PostgreSQL", "MongoDB", "Cosmos DB", "Redis"] },
  { title: "Quality", items: ["TDD", "SonarCloud", "xUnit", "NUnit", "Jasmine", "Postman"] },
  { title: "Ways of working", items: ["Scrum (CSM)", "Jira", "Code reviews", "Mentoring", "Stakeholder demos"] },
];

export const certifications = [
  { name: "Azure Solutions Architect Expert", issuer: "Microsoft" },
  { name: "Agentic AI Business Solutions Architect (AB-100)", issuer: "Microsoft" },
  { name: "Azure AI Apps and Agents Developer Associate", issuer: "Microsoft" },
  { name: "Azure AI Engineer Associate", issuer: "Microsoft" },
  { name: "Azure Developer Associate", issuer: "Microsoft" },
  { name: "AI Transformation Leader", issuer: "Microsoft" },
  { name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance" },
];

export const education = [
  { degree: "MBA – IT Project Management", school: "IU International University (IUBH), Berlin, Germany", period: "01/2024 – 02/2025", note: "Thesis on AI for risk management in IT projects (below)." },
  { degree: "Post Graduate Diploma in Advanced Computing", school: "C-DAC, Bangalore, India", period: "02/2018 – 08/2018", note: "Advanced computing, software engineering and high-performance applications." },
  { degree: "B.Tech – Information Technology", school: "Dr. R.M.L. Avadh University, Faizabad, India", period: "2013 – 2017", note: "Software engineering, algorithms and data structures." },
];

export const thesis = {
  title: "Leveraging Artificial Intelligence for Risk Management in IT Projects",
  degree: "Master's thesis · MBA (90 ECTS) · IU International University",
  date: "March 2025",
  supervisor: "Dr. Rachel John Robinson",
  summary:
    "Traditional IT project risk management is reactive: it relies on expert judgement and history, and often spots risks only after they escalate. " +
    "This thesis explores how AI-driven predictive risk management (machine learning, data analytics and pattern recognition) can forecast risks early, " +
    "and how it fits into the ISO 31000:2018 risk management process.",
  points: [
    { k: "Question", v: "How can ISO 31000 be applied in IT projects, and how can AI strengthen risk identification, assessment, treatment and monitoring?" },
    { k: "Method", v: "Survey-based study design for project managers, risk analysts and AI specialists (Likert-scale questions), measuring risk identification, assessment accuracy, mitigation and project success before and after AI." },
    { k: "Finding", v: "AI adds the most value as a decision-support partner: earlier warnings and data-driven assessments, while humans keep the judgement. Data quality, transparency and skills are the main hurdles." },
  ],
};

export const testimonials = [
  {
    text: "Vishal is an incredibly talented Full Stack Engineer with expertise in Angular and Microsoft technologies. He's always impressed me with his quick learning ability and knack for finding the best solutions.",
    who: "Mathew George",
    role: "Associate Director Cloud Engineering & IT, RDA Labs",
  },
  {
    text: "Vishal came into our team and was able to contribute immediately. His ability to grasp technology quickly allowed us to deliver against an aggressive deadline. He develops quality solutions and collaborates with other developers well.",
    who: "Steven Salgado",
    role: "AVP Software Engineering, Assurant",
  },
];

export const leadership = [
  { title: "Founder, The Growth Club", period: "2025 – now", text: "Global learning community with 2,000+ members; free Python and Git courses on YouTube (CodeMitVishal)." },
  { title: "National Cadet Corps (NCC)", period: "2009 – 2013", text: "Senior Under Officer; led a platoon, awards for discipline." },
  { title: "National Service Scheme (NSS)", period: "2013 – 2017", text: "Led outreach teams and taught in primary schools." },
];
