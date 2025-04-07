import { getPosts } from "@/app/utils/utils";
import { Column, Flex } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import styles from "../ProjectCard.module.scss";

interface ProjectsProps {
  range: [number, number];
}

export const Projects = ({ range }: ProjectsProps) => {
  const projects = getPosts(["src", "app", "work", "projects"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(range[0] - 1, range[1]);

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          href={`/work/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          content={project.metadata.summary}
          description={project.metadata.summary}
          avatars={project.metadata.team?.map((person) => ({
            src: person.avatar,
          }))}
          link={project.metadata.link || ""}
        />
      ))}
    </div>
  );
};
