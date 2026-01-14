import React from 'react';
import { ReactComponent as CoPilotText } from '../assets/githubcopilot-text.svg';
import { ReactComponent as CoPilotIcon } from '../assets/githubcopilot-icon.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        This page was created using&nbsp;
        <a
          href="https://github.com/features/copilot"
          target="_blank"
          rel="noopener noreferrer"
          className="copilot-link"
        >
          <CoPilotText className="copilot-text-icon" />
          &nbsp;
          <CoPilotIcon className="copilot-icon" id="gh-copilot-icon" />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
