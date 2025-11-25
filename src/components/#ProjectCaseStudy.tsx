import { useState } from "react";
import { ExternalLink, ChevronRight, Users, Target, Lightbulb, Layers, TestTube2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface ProcessStage {
  icon: React.ElementType;
  title: string;
  description: string;
  content: {
    overview: string;
    keyFindings?: string[];
    artifacts?: string[];
    images?: string[];
  };
}

interface ProjectCaseStudyProps {
  title: string;
  subtitle: string;
  overview: string;
  role: string;
  timeline: string;
  tools: string[];
  heroImage: string;
  problem: string;
  solution: string;
  impact: string[];
  processStages: ProcessStage[];
  prototypeLink?: string;
  accessibility: {
    considerations: string[];
    wcagLevel: string;
  };
}

export function ProjectCaseStudy({
  title,
  subtitle,
  overview,
  role,
  timeline,
  tools,
  heroImage,
  problem,
  solution,
  impact,
  processStages,
  prototypeLink,
  accessibility
}: ProjectCaseStudyProps) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <article className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
        <ImageWithFallback
          src={heroImage}
          alt={`${title} project hero image`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Project Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <Badge className="mb-4">{subtitle}</Badge>
          <h1 className="mb-4">{title}</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">{overview}</p>

          {/* Project Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
            <div>
              <h6 className="mb-2">Role</h6>
              <p className="text-muted-foreground">{role}</p>
            </div>
            <div>
              <h6 className="mb-2">Timeline</h6>
              <p className="text-muted-foreground">{timeline}</p>
            </div>
            <div>
              <h6 className="mb-2">Tools</h6>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Problem & Solution */}
          <section>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-4">The Problem</h4>
                  <p className="text-muted-foreground">{problem}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-4">The Solution</h4>
                  <p className="text-muted-foreground">{solution}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Process */}
          <section>
            <h3 className="mb-8">Design Process</h3>
            
            {/* Process Navigation */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-2 min-w-max pb-4">
                {processStages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <button
                      key={stage.title}
                      onClick={() => setActiveStage(index)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                        activeStage === index
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-accent"
                      }`}
                      aria-label={`View ${stage.title} stage`}
                      aria-pressed={activeStage === index}
                    >
                      <Icon className="size-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{stage.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Process Content */}
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-6">
                    {(() => {
                      const Icon = processStages[activeStage].icon;
                      return <Icon className="size-8 text-primary flex-shrink-0" />;
                    })()}
                    <div className="flex-1">
                      <h4 className="mb-2">{processStages[activeStage].title}</h4>
                      <p className="text-muted-foreground">
                        {processStages[activeStage].description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="mb-3">Overview</h5>
                      <p className="text-muted-foreground">
                        {processStages[activeStage].content.overview}
                      </p>
                    </div>

                    {processStages[activeStage].content.keyFindings && (
                      <div>
                        <h5 className="mb-3">Key Findings</h5>
                        <ul className="space-y-2" role="list">
                          {processStages[activeStage].content.keyFindings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {processStages[activeStage].content.artifacts && (
                      <div>
                        <h5 className="mb-3">Key Artifacts</h5>
                        <div className="flex flex-wrap gap-2">
                          {processStages[activeStage].content.artifacts.map((artifact) => (
                            <Badge key={artifact} variant="secondary">
                              {artifact}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {processStages[activeStage].content.images && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {processStages[activeStage].content.images.map((img, idx) => (
                          <div key={idx} className="rounded-lg overflow-hidden border">
                            <ImageWithFallback
                              src={img}
                              alt={`${processStages[activeStage].title} artifact ${idx + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          {/* Accessibility Considerations */}
          <section>
            <h4 className="mb-6">Accessibility Considerations</h4>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-3">
                      {accessibility.wcagLevel} Compliant
                    </Badge>
                    <ul className="space-y-3" role="list">
                      {accessibility.considerations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Impact & Results */}
          <section>
            <h4 className="mb-6">Impact & Results</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {impact.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Prototype Link */}
          {prototypeLink && (
            <section className="text-center py-8">
              <Button size="lg" asChild>
                <a href={prototypeLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 mr-2" />
                  View Interactive Prototype
                </a>
              </Button>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
