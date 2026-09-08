import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";

import Layout from "../components/Layout";
import HeroSwiper from "../components/HeroSwiper";
import BenefitsSwiper from "../components/BenefitsSwiper";
import SafetyInformation from "../components/SafetyInformation";

export default function IndexPage({ data }) {
  const homePage = data?.allWpPage?.edges?.[0]?.node?.homePage;
  const slides = homePage?.bannerImage ?? [];
  const cards = homePage?.aboutSection ?? [];

  return (
    <Layout title="Zaynich Component Layout">
      <HeroSwiper slides={slides} />
      <BenefitsSwiper cards={cards} />
      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    allWpPage(filter: { databaseId: { eq: 7 } }) {
      edges {
        node {
          title
          id
          slug
          homePage {
            bannerImage {
              bannerImage {
                node {
                  altText
                  gatsbyImage(width: 1920, quality: 90, placeholder: BLURRED, layout: FULL_WIDTH)
                }
              }
            }
            aboutSection {
              icon {
                node {
                  altText
                  sourceUrl
                }
              }
              iconTitle
              paragraph
            }
          }
        }
      }
    }
  }
`;
