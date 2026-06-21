import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'Rule File',
    description:
      'Give your AI agent the project knowledge a new teammate would need — stack, conventions, hard rules, and workflow.',
  },
  {
    title: 'Context Engineering',
    description:
      'Control what the agent sees and when. Static vs dynamic context, skills for progressive disclosure, and cost-aware design.',
  },
  {
    title: 'Verification',
    description:
      'Tests as the deterministic contract, evals for non-deterministic behavior, and a quality flywheel that compounds.',
  },
];

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            name: siteConfig.title,
            url: siteConfig.url + siteConfig.baseUrl,
            description: siteConfig.tagline,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.url + siteConfig.baseUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Docs',
                item: siteConfig.url + siteConfig.baseUrl + 'docs/',
              },
            ],
          })}
        </script>
      </Head>
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
        <section className={styles.reference}>
          <div className="container text--center">
            <p>
              Inspired by <em>The New SDLC With Vibe Coding</em> (Google) and Karpathy's Software 3.0.
            </p>
            <p>
              Read the full article on{' '}
              <a href="https://medium.com/@odere.pub">Medium</a> · Connect on{' '}
              <a href="https://www.linkedin.com/in/oleksander-derechei/">LinkedIn</a>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
