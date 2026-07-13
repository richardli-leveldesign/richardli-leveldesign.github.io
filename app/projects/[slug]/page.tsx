import { notFound } from "next/navigation";
import { ProjectPage, projects } from "../../portfolio";

export function generateStaticParams() {
  return projects.filter((project) => !project.underConstruction).map((project) => ({ slug: project.slug }));
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
