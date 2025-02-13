export type SiteConfig = typeof siteConfig;
import courses from "@/data/courses.json";

export const siteConfig = {
  name: "StudyPlanner",
  description: "Get an overview of your study progress and ensure you reach your goals.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Courses",
      href: "/courses",
    },
    {
      label: "Lecture Plan",
      href: "/lecture-plan",
    },
    {
      label: "Exercises",
      href: "/exercises",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Courses",
      href: "/courses",
    },
    {
      label: "Lecture Plan",
      href: "/lecture-plan",
    },
    {
      label: "Exercises",
      href: "/exercises",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  courseItems: [
    courses.map((course) => ({
      label: course.name,
      href: `/courses/${course.id}`,
    })),
  ],
  links: {
    github: "https://github.com/eliasheimdal/Study-Progress",
    twitter: "https://x.com/WardHeimdal",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
