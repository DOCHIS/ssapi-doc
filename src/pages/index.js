// src/pages/index.js
import React from "react";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/Landing/Hero";
import Metrics from "@site/src/components/Landing/Metrics";
import Features from "@site/src/components/Landing/Features";
import SuccessStories from "@site/src/components/Landing/SuccessStories";
import FeaturedProjects from "@site/src/components/Landing/FeaturedProjects";
import Partners from "@site/src/components/Landing/Partners";
import CTA from "@site/src/components/Landing/CTA";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MinecraftSupport from "@site/src/components/Landing/MinecraftSupport";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="숲(아프리카)과 치지직의 통합 스트리밍 데이터 플랫폼"
    >
      <main>
        <Hero />
        <Metrics />
        <Features />
        <MinecraftSupport />
        <SuccessStories />
        <FeaturedProjects />
        <Partners />
        <CTA />
      </main>
    </Layout>
  );
}
