'use client';

import React from "react";
import "./decks.css";
import Footer from "../components/Footer/Footer";
import { ReactLenis } from "@studio-freight/react-lenis";
import { decksItems } from "./decksItems";
import Link from "next/link";
import Image from "next/image";

const DecksPageContent = () => {
  return (
    <div className="container">
      <div className="decks-intro">
        <div className="col decks-copy-wrapper">
          <div className="decks-copy">
            <h1>Our Decks</h1>
          </div>
        </div>
      </div>

      <div className="decks-wrapper">

        <div className="decks-list">
          {decksItems.map((deck, index) => (
            <div className="decks-item" key={index}>
              <h3>{deck.name}</h3>
              <Link href={deck.url}>
                <span className="deck-link">View Deck</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DecksPage = () => {
  return (
    <ReactLenis root>
      <div className="decks-page">
        <DecksPageContent />
        <Footer />
        <div className="page-logo-container">
          <Image
            src="/jobs/stanford.png"
            alt="Stanford Logo"
            className="page-logo"
            width={100}
            height={100}
          />
        </div>
      </div>
    </ReactLenis>
  );
};

export default DecksPage;
