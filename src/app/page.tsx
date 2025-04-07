import React from "react";
import {
  Heading,
  Flex,
  Text,
  Button, // Keep if needed for project links later
  Avatar,
  RevealFx,
  Column,
  SmartImage, // Assuming this component exists for images
} from "@/once-ui/components";

// Assuming project data comes from here, adjust as needed
// If projects are separate, import that instead: import { projectsData } from '@/app/resources/projects';
import { about, home, person, newsletter } from "@/app/resources/content";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";

// Keep Mailchimp and Posts if you plan to uncomment them later
// import { Mailchimp } from "@/components";
// import { Posts } from "@/components/blog/Posts";

// Metadata function remains the same
export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  // --- Project Data ---
  // Adjust this line based on your actual project data source
  // ENSURE 'about.work.experiences' contains objects with 'company', 'role', 'images', and 'url' properties
  // Using the first 3 work experiences as projects
  const projectsToDisplay = about.work.experiences.slice(0, 3);
  // Or if you have a dedicated projects array:
  // const projectsToDisplay = projectsData.slice(0, 3);

  return (
  
    <Column maxWidth="xl" gap="s" horizontal="center" paddingBottom="xl">
      {/* Schema remains the same */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                // Ensure person.avatar includes the leading slash if needed
                url: `${baseURL}${person.avatar.startsWith('/') ? '' : '/'}${person.avatar}`,
              },
            },
          }),
        }}
      />

      {/* --- Hero Section with Avatar --- */}
      <Flex
        flex={1}
        paddingY="l"
        gap="xl" 
        vertical="center"
        horizontal="center"
      >
        {/* Headline and Subline */}
        <Column maxWidth="m" fillWidth gap="l" horizontal="center">
          <RevealFx translateY="4" delay={0.2} fillWidth horizontal="center">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="4" delay={0.4} fillWidth horizontal="center">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="4" delay={0.6} fillWidth horizontal="center">
            <Button
              href="mailto:oxana@vild.ly"
              variant="primary"
              size="l"
              prefixIcon="mail"
              weight="strong"
              style={{ 
                minWidth: "200px",
                backgroundColor: "var(--scheme-emerald-500)",
                borderColor: "var(--scheme-emerald-700)"
              }}
            >
              Contact Us
            </Button>
          </RevealFx>
        </Column>
      </Flex>
      
      {/* --- Project Summary Section --- */}
      <Column fillWidth gap="m">
        <RevealFx translateY="12" delay={0.6}>
          <Heading as="h2" variant="display-strong-s" align="center">
            Recent Projects
          </Heading>
        </RevealFx>

         {/* This is how projects were likely displayed before */}
      <RevealFx translateY="16" delay={0.6}>
       <Projects range={[1,3]} />
      </RevealFx>
      </Column>

      {/* --- Optional Sections (Keep commented or uncomment as needed) --- */}
      {/* {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )} */}
      {/* <Projects range={[3]} /> */} {/* Remove if replaced by summary */}
      {/* {newsletter.display && <Mailchimp newsletter={newsletter} />} */}

    </Column>
  );
}