import React from "react";
import { footerSectionStyles } from "./sectionStyles";

export default function FooterSection() {
  return (
    <footer style={footerSectionStyles.footer}>
      <span style={footerSectionStyles.copyrightText}>
        &copy; 2024 Obinna. Built with care on Azure.
      </span>
      <div style={footerSectionStyles.linkRow}>
        <button type="button" style={footerSectionStyles.linkButton}>
          GitHub
        </button>
        <button type="button" style={footerSectionStyles.linkButton}>
          LinkedIn
        </button>
        <button type="button" style={footerSectionStyles.linkButton}>
          Email
        </button>
      </div>
    </footer>
  );
}
