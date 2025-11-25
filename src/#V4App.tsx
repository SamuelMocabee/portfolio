import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { ProjectCaseStudy } from "./components/ProjectCaseStudy";
import { AccessibilityBadge } from "./components/AccessibilityBadge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { 
  Mail, Linkedin, Github, Download, 
  Users, Target, Lightbulb, Layers, TestTube2,
  ArrowRight, ChevronDown
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Sample project data - showcasing UX process
const projects = [
  {
    id: "healthcare-app",
    title: "Cooking Time",
    subtitle: "UI/UX Research & Design",
    overview: "Creating the Cooking Time Recipe App to improve accessibility and assistance in cooking for diverse user groups.",
    role: "Co-Lead UX Designer & Researcher",
    timeline: "16 weeks (Aug - Dec 2025)",
    tools: ["Figma","UserTesting", "Adobe Express", "Discord", "Draw.io", "Microsoft Teams", "Google Docs"],
    heroImage: "/images/projects/CookingTime/CookingTime.png",
    shortDescription: "Improving User Cooking skills and experience through user-centered design and accessibility improvements.",
    problem: "Many people struggle with everyday cooking decisions: not knowing what to cook after a long day, how to plan meals in advance, or what to do with leftover ingredients. These challenges often lead to frustration, wasted food, and missed opportunities for healthier eating. For college students and working professionals with busy schedules and limited grocery store trips, it is important to find quick, accessible, and adaptable ingredient lists, recipes, and cooking guidance.",
    solution: "Providing a web or mobile application that makes it easy to discover and organize recipes through integrating modern technology such as (AI, AR/VR) to enhance cooking guidange and learning. Helping users reduce food waste with suggestive recipes based on available ingredients while also supporting health and fitness goals through recipe personalization (e.g. nutrition tracking, dietary preferences.",
    impact: [
      "53% of adults use recipe apps at least once per month.",
      "70% of these adults access recipes via social media.",
      "13.5% growth of use of Global Recipe App Market."
    ],
    processStages: [
      {
        icon: Users,
        title: "Empathize",
        description: "Understanding gaps in current cooking tools through comprehensive research",
        content: {
          overview: "Conducted 5 in-depth user interviews with working progessionals and students aged 25-34. Performed interviews ranging from 15-25 minutes with 16 open ended questions to identifiy week points in the market.",
          keyFindings: [
            "The research reveals a strong demand for a smarter, more integrated recipe app that fits seamlessly into the lives of time-constrained adults.",
            "Visual content, such as videos and step-by-step photos, is highly valued, alongside AI-powered features like ingredient-based recipe suggestions and simplified cooking instructions.",
            "Reducing food waste emerged as both a practical and emotional priority. ",
            "A notable gap in current tools is the lack of support for saving, customizing, and organizing recipes."
          ],
          artifacts: ["Empathy maps", "Quantitative analytics"],
          images: [
            "/images/projects/CookingTime/empathy/emp1.png",
            "/images/projects/CookingTime/empathy/emp2.png",
            "/images/projects/CookingTime/empathy/emp3.png",
            "/images/projects/CookingTime/empathy/emp4.png",
            "/images/projects/CookingTime/empathy/emp5.png",
            "/images/projects/CookingTime/empathy/demographics.png",
          ]
        }
      },
      {
        icon: Target,
        title: "Define",
        description: "Synthesizing research into actionable insights and personas",
        content: {
          overview: "Created a primary persona from empathy stage representing our primary user and defined clear problem statements that align business goals with user needs.",
          keyFindings: [
            "Time and convenience: Users of all ages expressed frustration with lengthy meal planning and grocery shopping processes, indicating a strong market for a streamlined solution that integrates recipe discovery with automated shopping list generation.",
            "Food Waste Reduction: Users demonstrated concern about unused ingredients and budget efficiency, suggesting that features supporting portion control, ingredient substitution and panty management would address key pain points.",
            "Demographic: Young adults transitioning from student to professional life represents an ideal customer segment, characterized by limited budgets, time constraints, and willingness to adopt technology that simplifies daily routines.",
            "Multi-stakeholder Partnerships: The business model reveals that collaboration with chefs, grocery stores, AI/AR experts, dietitians, and nutritionists creates a collaborative system that addresses users needs while opening diverse revenue streams."
          ],
          artifacts: ["User personas", "Business Model"],
          images: [
            "/images/projects/CookingTime/define/primarypersona2.png",
            "/images/projects/CookingTime/define/businessmodel.png"
          ]
        }
      },
      {
        icon: Lightbulb,
        title: "Ideate",
        description: "Generating diverse solutions through structured brainstorming",
        content: {
          overview: "Facilitated a ideation workshop using the Mind Map technique to generate 7 primary domains for Cooking Time and 4 major insights on the app.",
          keyFindings: [
            "Multi-stakeholder ecosystem: The app serves diverse user types (novice to professional) while also engaging external partners (chefs, sponsors, grocery stores).",
            "Value proposition clarity: Three main goals emerged as central: variety in cooking, affordability, and effective teaching methods.",
            "Monetization pathways: Our mapping identified multiple revenue streams through incentives, sponsored content, and subscriber based user access.",
            "AI Importance: The AI assistance emerged as a connector across shopping, budgeting, and recipe suggestions, indicating the importance as a core feature rather of the Cooking Time Application."
          ],
          artifacts: ["Mind Map", "Concept sketches"],
          images: [
            "/images/projects/CookingTime/ideate/mindmap1.png",
            "/images/projects/CookingTime/ideate/mindmap2.png"
          ]
        }
      },
      {
        icon: Layers,
        title: "Prototype",
        description: "Creating iterative prototypes from low to high fidelity",
        content: {
          overview: "Developed 2 rounds of prototypes: low-fi paper sketch wireframes, and high-fidelity interactive prototype. Each iteration incorporated feedback from self testing.",
          keyFindings: [
            "Visualized the app's core structure and navigation flow during low-fi round.",
            "Overall goal of low-fidelity was to translate user needs into a functional structure.",
            "High-fidelity Adobe XD prototype reflects the simplicity and efficiency envisioned for Cooking Time.",
            "Referenced 10 Usability Heyristics and four of the UX Laws (i.e. Hick's, Fitts's, Jakob's, and Miller's) to guide design decisions."
          ],
          artifacts: ["Paper prototypes", "Wireframes", "Interactive prototype", "Adobe XD"],
          images: [
            "/images/projects/CookingTime/prototype/pro1.png",
            "/images/projects/CookingTime/prototype/pro2.png",
            "/images/projects/CookingTime/prototype/pro3.png",
            "/images/projects/CookingTime/prototype/pro4.png"
          ]
        }
      },
      {
        icon: TestTube2,
        title: "Test",
        description: "Validating design decisions through rigorous testing",
        content: {
          overview: "Conducted 1 round of usability testing with 5 participants ages 20+ through moderated sessions. Measured task completion rate, time on task, and user satisfaction.",
          keyFindings: [
            "Using High-fidelity mobile design built in Adobe XD for testing.",
            "Goal: Evaluate whether the current design and user flow are ready for beta development.",
            "Facilitated testing session gathering UI interaction metrics and user feedback on overall usability.",
            "Compiled Observations across sessions into findings report.",
          ],
          artifacts: ["Usability Test Plan", "Usability test reports", "Session recordings"],
          images: [
            "/images/projects/CookingTime/test/usabilitytest.png"
          ]
        }
      }
    ],
    prototypeLink: "https://xd.adobe.com/view/e740af88-b63b-4e38-95d5-d20c346ec112-b213/?fullscreen&hints=off",
    accessibility: {
      wcagLevel: "WCAG 2.1 AAA",
      considerations: [
        "Minimum contrast ratio of 7:1 for all text, verified with Stark plugin",
        "Full keyboard navigation support with visible focus indicators",
        "Screen reader compatibility tested with JAWS, NVDA, and VoiceOver",
        "Alt text for all images with descriptive context",
        "Proper heading hierarchy (h1-h6) throughout all pages",
        "ARIA labels and landmarks for enhanced screen reader experience",
        "Captions and transcripts for all audio/video content",
        "Resize text up to 200% without loss of functionality"
      ]
    }
  },
  {
    id: "community-platform",
    title: "Cloud Seeding Drone",
    subtitle: "Environmental Design & Impact",
    overview: "Deploy Flares to produce more rain in local communities.",
    role: "Moisture Sensor & Ignition Designer",
    timeline: "6 weeks (May - June 2023)",
    tools: ["Miro", "Discord", "Microsoft Teams"],
    heroImage: "/images/projects/CloudSeed/drone.jpg",
    shortDescription: "Increasing rain production in low resivoir areas through cloud seeding with user specific design.",
    problem: "The government needs inexpensive cheap cloud seeding drones to recover from reservoir levels reaching record lows.",
    solution: "Designing a cloud seeding drone that can deploy flares to make more rain occur in communities in need.",
    impact: [
      "Drone can detect moisture from the cloud and ignite flares using an electric match to create KCI crystals, ideally larger that 1-6 um.",
      "Reduced time delay between user's navigational control and the drone itself to ~300 ms.",
      "Autonomous Navigation"
    ],
    processStages: [
      {
        icon: Users,
        title: "Empathize",
        description: "Understanding community needs across low resivoir areas",
        content: {
          overview: "Conducted community research on areas affected by drought. Used participatory design methods with local businesses and various types of cloud seeding drones.",
          keyFindings: [
            "Discovered Multiple Stakholders for Project.",
            "Expored background research on soil moisture measurements.",
            "Determined Main Stakeholder of Cloud Seeding Project"
          ],
          artifacts: ["Community research sessions", "Stakeholder maps"],
          images: [
            "/images/projects/CloudSeed/Empathy/stakeholder.jpg",
            "/images/projects/CloudSeed/Empathy/bull.jpg"
          ]
        }
      },
      {
        icon: Target,
        title: "Define",
        description: "Reframing the problem",
        content: {
          overview: "Created a Shared Team vision for our commitment to the project and Objective Tree of the project.",
          keyFindings: [
            "Safety first: Equipment must protect electronics, ensure stable flight, and include safety features like flashing lights.",
            "Cost-effectiveness: Must be inexpensive with simple design and relatively small footprint (less than 15 foot wingspan).",
            "Operational reliability: Needs to be simple to use, easy to handle, and easily controlled/tracked.",
            "Environmental responsibility: Must be energy efficient with low drag and lightweight design.",
            "Technical accuracy: Requires precise particle dispersion and measurements to maximize effectiveness."
          ],
          artifacts: ["Shared Vision", "Objective Tree"],
          images: [
            "/images/projects/CloudSeed/define/sharedvision.png",
            "/images/projects/CloudSeed/define/objectiveTree.jpg"
          ]
        }
      },
      {
        icon: Lightbulb,
        title: "Ideate",
        description: "Co-creating solutions with multiple disciplinaries",
        content: {
          overview: "In the ideation phase, we used morphological charting to systematically explore design alternatives across four subsystems: electrical, chemical, computational, and mechanical. By mixing and matching solutions for each function, we generated three distinct drone concepts. Each concept offered different approaches to flare deployment, seeding chemistry, and flight control while meeting our core requirements for affordability, safety, and accuracy. After evaluating trade-offs, we selected the optimal design direction for prototyping.",
          keyFindings: [
            "Automated moisture detection with KCI crystal formation.",
            "Manual triggering with magnesium combustion.",
            "Light-signal activated system using innovative Morse code detection.",
            "Evaluating combinations across subsystems, we identifited optimal solutions that balance cost, reliability, and environmental impact.",
            "Settled on Concept 1 in Morph Chart."
          ],
          artifacts: ["Morphological Chart", "Sorted Attribute List"],
          images: [
            "/images/projects/CloudSeed/ideate/morphchart.jpg",
            "/images/projects/CloudSeed/ideate/sortedAttributesList.jpg"
          ]
        }
      },
      {
        icon: Layers,
        title: "Prototype",
        description: "Physical, Component, and Architectural",
        content: {
          overview: "We developed prototypes at multiple levels: physical form factor, component design, and system architecture to validate our concept before full-scale production.",
          keyFindings: [
            "Low-fidelity prototype exploring fixed-wing design for stability, wingspan constraints, and aerodynamic form. Cardboard allowed rapid iteration on wing angle, body proportions, and center of gravity.",
            "Detailed flare design showing chemical mixture compartment, electric ignition system, and mounting mechanism.",
            "Complete system showing how electrical, mechanical, computational, and chemical subsystems interface.",
            "Control logic for automated moisture detection and flare ignition.",
            "Software architecture for sensor processing and ignition control."
          ],
          artifacts: ["Physical prototyping", "Flare Component Design", "System Architecture", "Logic & Control Systems"],
          images: [
            "/images/projects/CloudSeed/prototype/drone.png",
            "/images/projects/CloudSeed/prototype/flare.png",
            "/images/projects/CloudSeed/prototype/SystemIntegration.jpg",
            "/images/projects/CloudSeed/prototype/moistureSensorDrawing.jpg",
            "/images/projects/CloudSeed/prototype/MoistureSensorUML.jpg"
          ]
        }
      },
      {
        icon: TestTube2,
        title: "Test",
        description: "Implementing comprehensive validation strategy with component testing, risk analysis (FMEA), and safety protocols to ensure performance, reliability, and readiness for deployment",
        content: {
          overview: "We developed a comprehensive testing strategy to validate system performance, safety, and reliability. Our approach included component testing, system integration validation, and failure mode analysis to ensure the drone met all critical requirements before deployment.",
          keyFindings: [
            "Sensore Response Validation: Testing confirmed moisture sensor accuracy and signal transmission timing to ignition system.",
            "Risk Mitigation: FMEA identified 5 high-priority failure modes including short circuits, stalling, navigation loss, overheating, and freezing - each with specific preventive actions.",
            "Face-to-face connections increased: 68% of users met neighbors in person",
            "Safety-First Approach: Implemented weatherproofing, minimum airspeed protocols, GPS calibration, and wide-range environmental testing.",
            "Iterative Testing: Component-level tests (electrical, software, flare mount) before full system integration."
          ],
          artifacts: ["FMEA Risk Mitigation", "Test Plan"],
          images: [
            "/images/projects/CloudSeed/test/highRPNFMEA.png",
            "/images/projects/CloudSeed/test/testplan.png"
          ]
        }
      }
    ],
    prototypeLink: "https://www.youtube.com/watch?v=XKjt5aJLr-E",
    accessibility: {
      wcagLevel: "WCAG 2.1 AA",
      considerations: [
        "Multi-channel access: app, SMS, kiosks, and in-person options",
        "Large text and simple language for kiosk interfaces",
        "Multi-language support (Spanish, Mandarin, Korean, Arabic) across all touchpoints",
        "Screen reader compatible app with clear navigation structure",
        "High contrast visual design for users with low vision",
        "Printed materials available for residents without digital access",
        "Community ambassadors trained in accessibility support"
      ]
    }
  }
];

const skills = [
  { category: "Programming Languages", items: ["Python", "C/C++", "Java", "SQL", "JavaScript", "HTML/CSS"] },
  { category: "Cybersecurity Tools", items: ["Wireshark", "Nmap", "Metasploit", "Kali Linux", "Malware Analysis", "Vulnerability Assessment"] },
  { category: "Development & Systems", items: ["Git/GitHub", "Docker", "Linux", "Windows Server", "JetBrains IDEs", "VS Code"] },
  { category: "Design & Multimedia", items: ["Responsive Design", "Adobe Photoshop", "Adobe Premiere Pro", "Blender (3D)", "Web Design", "UI/UX Principles"] },
  { category: "Specialized Areas", items: ["Binary Analysis", "Network Security", "Machine Learning", "Database Design", "Compiler Design", "Prototyping"] }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation name="Samuel Mocabee" onBackToHome={() => setSelectedProject(null)} />
          <div className="pt-16">
            <Button
              variant="ghost"
              onClick={() => setSelectedProject(null)}
              className="container mx-auto px-4 my-8"
              aria-label="Back to all projects"
            >
              ← Back to Projects
            </Button>
            <ProjectCaseStudy {...project} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation name="Samuel Mocabee" />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* Colorful background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Profile Picture - Left side on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end order-2 lg:order-1"
            >
              <div className="relative">
                {/* Glow effect behind photo */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                
                {/* Profile photo */}
                <div className="relative w-56 h-56 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                  <ImageWithFallback
                    src="/images/personal/profile.png"
                    alt="Samuel Mocabee"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content - Right side on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <Badge className="mb-6 bg-primary text-primary-foreground" variant="outline">
                Cybersecurity Engineer & Malware Analyst
              </Badge>
              <h1 className="mb-6">
                Building defenses by understanding threats
              </h1>
              <p className="text-muted-foreground mb-10 text-lg">
                I'm a Cybersecurity graduate student passionate about solving complex security challenges through research and development. 
                I apply design thinking and UI/UX principles to create user-centered solutions, ensuring technical projects are communicated with 
                clarity and accessibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button size="lg" asChild>
                  <a href="#work">
                    View My Work
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/documents/Samuel_Mocabee_CV.pdf" download>
                    <Download className="size-4 mr-2" />
                    Download CV
                  </a>
                </Button>
              </div>
              <div className="flex gap-4 justify-center lg:justify-start mt-8">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/samuel-mocabee" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                    <Linkedin className="size-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/SamuelMocabee" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                    <Github className="size-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:samuel.mocabee@gmail.com" aria-label="Send email">
                    <Mail className="size-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Bounce arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="size-8 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Featured Work Section */}
      <section id="work" className="py-20 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl mb-16">
              <h2 className="mb-4">Featured Work</h2>
              <p className="text-muted-foreground text-lg">
                Projects showcasing my technical process from concept to completion across cybersecurity and software development. 
                Each demonstrates problem-solving methodologies, with this portfolio serving as a practical application of UI/UX design principles.
              </p>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <ImageWithFallback
                          src={project.heroImage}
                          alt={`${project.title} project preview`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <Badge className="mb-4 w-fit">{project.subtitle}</Badge>
                        <h3 className="mb-4">{project.title}</h3>
                        <p className="text-muted-foreground mb-6">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tools.slice(0, 4).map((tool) => (
                            <Badge key={tool} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => setSelectedProject(project.id)}
                          className="w-fit"
                          aria-label={`View ${project.title} case study`}
                        >
                          View Case Study
                          <ArrowRight className="size-4 ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Accessibility Statement Section */}
      <section className="py-20 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="mb-4">Built with Accessibility in Mind</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                This portfolio demonstrates my commitment to inclusive design through WCAG AAA compliance,
                semantic HTML structure, and thoughtful user experience considerations.
              </p>
            </div>
            <AccessibilityBadge variant="detailed" />
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <h2 className="mb-6">About Me</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm Samuel Mocabee, a cybersecurity graduate student at Montana State University in Bozeman, Montana. 
                    I started with obtaining a B.S. in Computer Science, where I built a foundation in software engineering, AI, 
                    and systems architecture. Now pursuing my M.S. in Cybersecurity, I focus on understanding both how systems work 
                    and how they can be exploited—a dual perspective that shapes every project I tackle.
                  </p>
                  <p>
                    My passion for cybersecurity centers on low-level system programming and malware analysis. 
                    I'm fascinated by reverse engineering malicious code, working with Windows APIs, PE file structures, 
                    and process manipulation techniques. Understanding how attackers operate at the binary level allows me to 
                    build more effective defenses.
                  </p>
                  <p>
                    Beyond security research, I'm passionate about 3D modeling and animation using Blender, along with video 
                    production in Adobe Premiere Pro. These creative pursuits aren't separate from my technical work—they've 
                    taught me to visualize complex system architectures and communicate security concepts in engaging ways.
                  </p>
                  <p>
                    When I'm not designing security solutions or working on passion projects, you can find me volunteering at the 
                    Fork and Spoon Soup Kitchen in Bozeman or swing dancing around town events. These activities keep me grounded 
                    and connected to my community in ways that screens and code can't.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h4 className="mb-6">Skills & Expertise</h4>
                  <div className="space-y-6">
                    {skills.map((skillGroup) => (
                      <div key={skillGroup.category}>
                        <h6 className="mb-3">{skillGroup.category}</h6>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="/images/personal/about.jpg"
                    alt="Samuel Mocabee"
                    className="w-full h-full object-cover"
                  />
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h5 className="mb-4">Education & Certifications</h5>
                    <div className="space-y-4">
                      <div>
                        <p>M.S. Cybersecurity</p>
                        <p className="text-muted-foreground">Bozeman, MT 2024-2026</p>
                      </div>
                      <Separator />
                      <div>
                        <p>B.S. Computer Science</p>
                        <p className="text-muted-foreground">Bozeman, MT 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Let's Create Something Together</h2>
            <p className="text-muted-foreground text-lg mb-10">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision. Whether you have a question or just want to say hi, 
              I'll do my best to get back to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:sam.mocabee@gmail.com">
                  <Mail className="size-5 mr-2" />
                  Email Me
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.linkedin.com/in/samuel-mocabee" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              &copy; 2025 Samuel Mocabee. Designed with accessibility in mind.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://www.linkedin.com/in/samuel-mocabee" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/SamuelMocabee" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:sam.mocabee@gmail.com" aria-label="Email">
                  <Mail className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
