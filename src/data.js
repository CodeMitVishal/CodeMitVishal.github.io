// All website content lives here. Edit this file to update the portfolio.
const BASE = import.meta.env.BASE_URL;

export const profile = {
  name: "Vishal Singh",
  role: "Software Engineer",
  statement: "I build C# back ends that talk in events, Angular front ends, and the pipelines that ship them to Azure.",
  headline: ["C# / .NET APIs", "Event-driven back ends", "Angular", "Azure & Kubernetes", "AI agents"],
  location: "Augsburg, Germany",
  email: "vishal8840906676@gmail.com",
  photo: `${BASE}vishal.jpg`,
  intro:
    "I write the code: C# / .NET REST APIs, event-driven back ends with Service Bus and the Outbox pattern, data processors and pipelines, " +
    "AI agent back ends and Angular front ends, in Clean Architecture. Then I ship and run it on Azure and Kubernetes with CI/CD.",
  about: [
    "Hands-on software engineer and Azure Solutions Architect Expert with 7+ years of writing production code, from .NET and Angular product teams in India to cloud products at baramundi software in Augsburg.",
    "Most of my day is code: C# / .NET Web APIs and REST APIs, data processors and change trackers, events over Service Bus and Event Hubs (event-driven architecture, Outbox pattern), back ends for AI agents, and Angular front ends, structured with Clean Architecture. I build the CI/CD pipelines that ship it and review my teammates' pull requests.",
    "I have led teams of 5–6 developers on insurance platforms for global clients such as Samsung and Assurant, and built GDPR-compliant systems for the EU market.",
    "Today I work on a cloud platform that keeps company devices secure and up to date (AKS, IoT Hub, Event Hubs), and I lead AI adoption: AI agents, RAG, MCP, and coaching teams on GitHub Copilot and Claude.",
    "Outside work I teach: I founded The Growth Club, a learning community of 2,000+ members, and publish free Python and Git courses on my YouTube channel CodeMitVishal.",
  ],
  stats: [
    { value: "7+", label: "years writing production code" },
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
    logo: `${BASE}logos/baramundi.svg`,
    url: "https://www.baramundi.com/en/",
    current: true,
    place: "Augsburg, Germany",
    period: "03/2025 – Present",
    context: "baramundi Endpoint Management: software that keeps company devices secure, patched and up to date.",
    points: [
      "Write C# / .NET 10 microservices and REST and GraphQL APIs, structured with Clean Architecture.",
      "Build data processors and change trackers that turn device changes into events, published over Service Bus and Event Hubs (event-driven architecture, Outbox pattern so no event is lost).",
      "Build the back ends for AI agents: tool APIs, retrieval over company data (RAG) and MCP servers, on Azure AI Foundry and Semantic Kernel.",
      "Build and run the services on Azure Kubernetes (AKS), scaling with demand (KEDA) and deploying through CI/CD pipelines and GitOps (ArgoCD).",
      "Designed how devices securely sync their settings with the cloud, at scale (Azure IoT Hub Device Twin).",
      "Implemented sign-in and identity for customer-facing apps (B2C), with several layers of protection.",
      "Lead AI adoption across the company: find where AI adds value, assess risks and governance, coach teams on GitHub Copilot and Claude.",
      "Designed GraphQL APIs for device data, and admin dashboards that spot unhealthy devices and fix them automatically.",
      "Build Angular 20 front ends, and lead 5 developers across front end and back end: pull-request reviews, mentoring and sprint demos.",
    ],
    stack: ["C#", ".NET 10", "REST", "GraphQL", "Clean Architecture", "Outbox pattern", "Service Bus", "Event Hubs", "Angular 20", "AKS", "KEDA", "ArgoCD", "IoT Hub", "Redis", "Azure SQL", "PostgreSQL", "MongoDB"],
  },
  {
    role: "Full-Stack Developer Lead / Team Lead",
    company: "RDA Labs Pvt Ltd",
    logo: `${BASE}logos/rdalabs.svg`,
    url: "https://rdalabs.com/",
    place: "India",
    period: "02/2020 – 12/2023",
    award: "Top Performer",
    context: "Clients: Assurant (global insurance), KPK FinServ (financial reconciliation), GradImages (graduation photography).",
    points: [
      "Led 5–6 developers building insurance platforms for global clients, including Samsung (UK, Italy, Germany, Spain).",
      "Wrote C# / .NET Core REST APIs and Angular front ends, and reviewed the team's pull requests.",
      "Owned the CI/CD pipelines from test to production in Azure DevOps, with automatic code-quality and security checks (SonarCloud).",
      "Set up Azure infrastructure with Terraform and ARM templates; packaged services with Docker.",
      "Built GDPR-compliant systems for EU markets: consent management, protected personal data, Key Vault and audit logging.",
      "Connected risk-data providers (Verisk, LexisNexis) to an underwriting tool, giving underwriters decision-ready data.",
      "Built Azure AI face recognition that finds graduates in ceremony photos (GradImages).",
      "Built a data-processing pipeline that loads Excel files with 1.5M+ rows into Cosmos DB with Azure Durable Functions.",
    ],
    stack: ["Azure Functions", "API Management", "Azure AI", "Terraform", "Docker", "Azure DevOps", "SonarCloud", ".NET Core", "Angular 11"],
  },
  {
    role: ".NET Developer / Full-Stack Developer",
    company: "Euromonitor International",
    logo: `${BASE}logos/euromonitor.svg`,
    url: "https://www.euromonitor.com/",
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
    logo: `${BASE}logos/cdac.png`,
    url: "https://www.cdac.in/",
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
    logo: `${BASE}logos/baramundi.svg`,
    text: "Cloud services for baramundi Endpoint Management: devices sync securely with the cloud, events never get lost, and dashboards fix unhealthy devices automatically.",
    tags: ["C#", ".NET", "Clean Architecture", "Service Bus", "Outbox", "AKS", "GraphQL"],
    icon: "cloud",
    flow: [["Devices", "report changes"], ["IoT Hub", "Device Twin sync"], [".NET API", "Clean Architecture"], ["Outbox", "same transaction"], ["Service Bus", "Event Hubs"], ["Processors", "change trackers"], ["Dashboards", "auto-fix"]],
    featured: true,
    story: { challenge: "Company devices must stay patched, configured and healthy, and every change has to reach the cloud reliably.", approach: "C# / .NET microservices and APIs in Clean Architecture; change trackers publish events over Service Bus and Event Hubs with the Outbox pattern; device settings sync via IoT Hub Device Twin; runs on AKS with KEDA and ArgoCD.", result: "Settings sync securely at scale, no event gets lost, and dashboards spot unhealthy devices and fix them automatically." },
  },
  {
    title: "AI Agents & AI Adoption",
    org: "baramundi software · 2025–now",
    logo: `${BASE}logos/baramundi.svg`,
    text: "AI agent prototypes that use tools and search company knowledge, plus a company-wide AI adoption programme with risk assessment and coaching.",
    tags: ["C#", "Azure AI Foundry", "Semantic Kernel", "MCP", "RAG"],
    icon: "spark",
    flow: [["App / user", "asks a question"], ["Agent", "Semantic Kernel"], ["Tool APIs", "C# + MCP server"], ["RAG", "AI Search over docs"], ["Model", "Azure AI Foundry"]],
    featured: true,
    story: { challenge: "Teams want to use AI, but need useful, safe use cases and clear governance first.", approach: "Agent back ends in C#: tool APIs, MCP servers and RAG search over company data (Azure AI Foundry, Semantic Kernel), plus risk and governance assessments.", result: "A company-wide AI adoption programme, with teams coached on GitHub Copilot and Claude." },
  },
  {
    title: "Global Insurance Sales Platform",
    org: "Assurant / Samsung Care+ · RDA Labs",
    logo: `${BASE}logos/rdalabs.svg`,
    text: "Insurance platform for mobile devices sold in the UK, Italy, Germany and Spain, built GDPR-compliant with consent management, Key Vault and audit logging.",
    tags: [".NET", "Angular", "Azure", "Terraform", "GDPR"],
    icon: "shield",
    flow: [["Angular", "sales journeys"], [".NET Core API", "REST"], ["Consent", "GDPR rules"], ["Key Vault", "secrets, keys"], ["Audit log", "who saw what"], ["Azure", "Terraform + CI/CD"]],
    featured: true,
    story: { challenge: "Selling device insurance for Samsung customers in four EU countries, under GDPR.", approach: "Led 5–6 developers on .NET and Angular on Azure, with Terraform infrastructure and CI/CD quality and security gates (SonarCloud).", result: "A GDPR-compliant platform in the UK, Italy, Germany and Spain, with consent management, Key Vault and audit logging." },
  },
  {
    title: "Underwriting Risk-Data Hub",
    org: "Insurance client · RDA Labs",
    logo: `${BASE}logos/rdalabs.svg`,
    text: "Connected risk-data providers Verisk and LexisNexis to an underwriting tool so underwriters get decision-ready data in one place.",
    tags: ["APIs", "Integration", "Azure Functions"],
    icon: "chart",
  },
  {
    title: "Graduate Face Recognition",
    org: "GradImages · RDA Labs",
    logo: `${BASE}logos/rdalabs.svg`,
    text: "Azure AI face recognition that finds each graduate in thousands of ceremony photos.",
    tags: ["Azure AI", "Computer Vision", ".NET"],
    icon: "face",
  },
  {
    title: "Financial Reconciliation & Large Imports",
    org: "KPK FinServ · RDA Labs",
    logo: `${BASE}logos/rdalabs.svg`,
    text: "Financial reconciliation work, including loading Excel files with 1.5M+ rows into Cosmos DB with Azure Durable Functions.",
    tags: ["Durable Functions", "Cosmos DB", "C#"],
    icon: "table",
  },
  {
    title: "Passport Market Research Platform",
    org: "Euromonitor International",
    logo: `${BASE}logos/euromonitor.svg`,
    text: "User and subscription features (APIs and screens) for Passport, Euromonitor's global market-research platform.",
    tags: [".NET Core", "Angular", "Azure"],
    icon: "globe",
    url: "https://www.euromonitor.com/our-expertise/passport",
  },
  {
    title: "IKEA Market Insights",
    org: "Euromonitor International",
    logo: `${BASE}logos/euromonitor.svg`,
    text: "A price-comparison tool that helps IKEA understand competitor prices across markets.",
    tags: [".NET Core", "Angular", "Data"],
    icon: "tag",
  },
  {
    title: "Campus Placement Portal",
    org: "C-DAC",
    logo: `${BASE}logos/cdac.png`,
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
  { name: "git-pro", text: "Git from zero to hero: lessons with real Git output, exercises and interview questions.", lang: "Shell", year: 2026, cats: ["Courses"] },
  { name: "python-foundations", text: "Code, exercises and slides for the Python Foundations course.", lang: "Python", year: 2026, cats: ["Courses", "Python"] },
  { name: "UniLingual", text: "One tool for all tongues: a multilingual translation tool.", lang: "—", year: 2025, cats: ["Full stack", "AI"] },
  { name: "UniLingual.Api", text: "The API behind UniLingual.", lang: "TypeScript", year: 2025, cats: ["Full stack", "AI"] },
  { name: "Insurance.API", text: "An insurance domain REST API in .NET.", lang: "C#", year: 2025, cats: [".NET"] },
  { name: "cloudfolio", text: "This website: my portfolio, built with React and Vite.", lang: "JavaScript", year: 2026, cats: ["Frontend"] },
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
  { title: "Back end (C# / .NET)", items: ["C#", ".NET 10/8", "ASP.NET Core Web API", "REST APIs", "GraphQL", "EF Core", "Background workers", "Data processors", "Change tracking", "Azure Functions", "Python", "FastAPI"] },
  { title: "Architecture & patterns", items: ["Clean Architecture", "Event-driven architecture", "Outbox pattern", "Domain events", "Microservices", "API design", "Defense in depth"] },
  { title: "Messaging & data", items: ["Azure Service Bus", "Event Hubs", "IoT Hub", "Redis", "SQL Server", "Azure SQL", "PostgreSQL", "MongoDB", "Cosmos DB", "Data pipelines", "Data Factory"] },
  { title: "Front end", items: ["Angular 20", "TypeScript", "RxJS", "Angular Material", "React"] },
  { title: "AI engineering", items: ["AI agent back ends", "Azure AI Foundry", "Semantic Kernel", "MCP servers", "RAG", "Azure AI Search", "AI governance", "GitHub Copilot", "Claude"] },
  { title: "Cloud & DevOps", items: ["AKS", "Kubernetes", "KEDA", "Docker", "CI/CD pipelines", "Azure DevOps", "GitOps (ArgoCD)", "Terraform", "ARM templates", "App Services", "API Management", "Key Vault", "Application Insights"] },
  { title: "Quality & security", items: ["Code reviews", "TDD", "xUnit", "NUnit", "Jasmine", "SonarCloud", "Postman", "OAuth2", "JWT", "Azure AD B2C", "GDPR"] },
  { title: "Ways of working", items: ["Scrum (CSM)", "Jira", "Pull-request reviews", "Mentoring", "Stakeholder demos"] },
];

// Official Microsoft badges and certification pages (learn.microsoft.com).
// To link your personal verification, paste your Microsoft Learn transcript share link into `transcript`.
export const transcript = "";
export const certifications = [
  { name: "Azure Solutions Architect Expert", issuer: "Microsoft", level: "Expert", exam: "AZ-305", badge: `${BASE}badges/ms-expert.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/" },
  { name: "Agentic AI Business Solutions Architect", issuer: "Microsoft", level: "Expert", exam: "AB-100", badge: `${BASE}badges/ms-expert.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/" },
  { name: "Azure AI Apps and Agents Developer Associate", issuer: "Microsoft", level: "Associate", exam: "AI-103", badge: `${BASE}badges/ms-associate.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/" },
  { name: "Azure AI Engineer Associate", issuer: "Microsoft", level: "Associate", exam: "AI-102", badge: `${BASE}badges/ms-associate.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/" },
  { name: "Azure Developer Associate", issuer: "Microsoft", level: "Associate", exam: "AZ-204", badge: `${BASE}badges/ms-associate.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/" },
  { name: "AI Transformation Leader", issuer: "Microsoft", level: "Business", exam: "AB-731", badge: `${BASE}badges/ms-ai-transformation-leader.svg`, url: "https://learn.microsoft.com/en-us/credentials/certifications/ai-transformation-leader/" },
  { name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", level: "Agile", exam: "CSM", badge: `${BASE}badges/scrum-alliance.png`, url: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" },
];

export const education = [
  { degree: "MBA – IT Project Management", school: "IU International University (IUBH), Berlin, Germany",
    logo: `${BASE}logos/iu.png`,
    url: "https://www.iu.org/", period: "01/2024 – 02/2025", note: "Thesis on AI for risk management in IT projects (below)." },
  { degree: "Post Graduate Diploma in Advanced Computing", school: "C-DAC, Bangalore, India",
    logo: `${BASE}logos/cdac.png`,
    url: "https://www.cdac.in/", period: "02/2018 – 08/2018", note: "Advanced computing, software engineering and high-performance applications." },
  { degree: "B.Tech – Information Technology", school: "Dr. R.M.L. Avadh University, Faizabad, India",
    logo: `${BASE}logos/avadh-university.png`,
    url: "https://www.rmlau.ac.in/", period: "2013 – 2017", note: "Software engineering, algorithms and data structures." },
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
  { title: "National Service Scheme (NSS)", period: "2013 – 2017", text: "Social service volunteer: led community outreach teams and taught children in primary schools." },
];
