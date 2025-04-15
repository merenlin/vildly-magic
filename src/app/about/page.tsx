import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";

export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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

export default function About() {
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
     
      <Column fillWidth horizontal="center" gap="l">
        <Column fillWidth horizontal="center" gap="m">
          <Heading wrap="balance" variant="display-strong-l" align="center">
            {about.title}
          </Heading>
          <Text
            wrap="balance"
            variant="display-default-xs"
            onBackground="neutral-weak"
            align="center"
          >
            {person.role}
          </Text>
        </Column>

        {about.intro.display && (
          <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="m" align="center">
            {about.intro.description}
          </Column>
        )}

        {social.length > 0 && (
          <Flex paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth>
            {social.map(
              (item) =>
                item.link && (
                  <>
                    <Button
                      className="s-flex-hide"
                      key={item.name}
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="s"
                      variant="secondary"
                    />
                    <IconButton
                      className="s-flex-show"
                      size="l"
                      key={`${item.name}-icon`}
                      href={item.link}
                      icon={item.icon}
                      variant="secondary"
                    />
                  </>
                ),
            )}
          </Flex>
        )}

        {/* {about.calendar.display && (
          <Flex
            fitWidth
            border="brand-alpha-medium"
            style={{
              backdropFilter: "blur(var(--static-space-1))",
            }}
            background="brand-alpha-weak"
            radius="full"
            padding="4"
            gap="8"
            marginBottom="m"
            vertical="center"
          >
            <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
            <Flex paddingX="8">Schedule a call</Flex>
            <IconButton
              href={about.calendar.link}
              data-border="rounded"
              variant="secondary"
              icon="chevronRight"
            />
          </Flex>
        )} */}
      </Column>
    </Column>
  );
}
