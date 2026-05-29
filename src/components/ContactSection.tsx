'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [copiedLabel, setCopiedLabel] = useState<'email' | 'phone' | null>(null);

  const handleCopyToClipboard = (text: string, type: 'email' | 'phone') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedLabel(type);
        setTimeout(() => setCopiedLabel(null), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <section className="section overflow-visible" id="contact">
      {/* A11y Announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="visually-hidden">
        {copiedLabel === 'email' ? 'Email address copied to clipboard.' : copiedLabel === 'phone' ? 'Phone number copied to clipboard.' : ''}
      </div>

      <div className="bg-grid" aria-hidden="true"></div>
      <div className="bg-blur blur-2 w-100 overflow-visible position-absolute h-100" style={{ opacity: '10%' }} aria-hidden="true"></div>
      <section className="cta-section">
        <div className="cta-grid" aria-hidden="true"></div>
        <div className="cta-blur blur-1" aria-hidden="true"></div>
        <div className="cta-blur blur-2" aria-hidden="true"></div>

        <div className="cta-content">
          <h2 className="cta-heading">Ready to Bring Your Vision to Life?</h2>
          <p className="cta-subtext">Let&apos;s collaborate to create exceptional software solutions tailored to your unique requirements. Reach out today to discuss your project.</p>

          <nav className="nav justify-content-center">
            <a href="https://www.linkedin.com/in/ahmed-nasser-a9556a255/" target="_blank" rel="noopener noreferrer" className="cta-button mx-1" aria-label="Connect on LinkedIn (opens in a new tab)" title="Connect on LinkedIn"><span className="fa-brands fa-linkedin mx-1" aria-hidden="true"></span>Linkedin<i className="fas fa-external-link-alt ms-2" style={{ fontSize: '0.8em' }} aria-hidden="true"></i></a>
            <a href="https://wa.me/201009784937" target="_blank" rel="noopener noreferrer" className="cta-button mx-1" aria-label="Message on WhatsApp (opens in a new tab)" title="Message on WhatsApp"><span className="fa-brands fa-whatsapp mx-1" aria-hidden="true"></span>Whatsapp<i className="fas fa-external-link-alt ms-2" style={{ fontSize: '0.8em' }} aria-hidden="true"></i></a>
            <a href="https://www.upwork.com/freelancers/~01f54fd7d135eb3939" target="_blank" rel="noopener noreferrer" className="cta-button mx-1 " aria-label="Hire on Upwork (opens in a new tab)" title="Hire on Upwork"><span className="fa fa-laptop-code mx-1" aria-hidden="true"></span>Upwork<i className="fas fa-external-link-alt ms-2" style={{ fontSize: '0.8em' }} aria-hidden="true"></i></a>
          </nav>

          <div className="contact-preview">
            <div className="contact-title">Prefer Direct Contact?</div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </div>
              <div className="contact-details">
                <div className="contact-label">Email Address</div>
                <div className="contact-value">
                  <a href="mailto:ahmed.naser732000@gmail.com" className="text-white text-decoration-none hover:underline" aria-label="Send an email to Ahmed Naser" title="Send an email to Ahmed Naser">ahmed.naser732000@gmail.com</a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-2 copy-btn"
                    aria-label={copiedLabel === 'email' ? 'Copied email address!' : 'Copy email address to clipboard'}
                    title={copiedLabel === 'email' ? 'Copied!' : 'Copy email address to clipboard'}
                    onClick={() => handleCopyToClipboard('ahmed.naser732000@gmail.com', 'email')}
                  >
                    <i className={copiedLabel === 'email' ? 'fas fa-check text-success' : 'fas fa-copy'} style={{ transition: 'color 0.2s ease-in-out' }} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-phone" aria-hidden="true"></i>
              </div>
              <div className="contact-details">
                <div className="contact-label">Phone</div>
                <div className="contact-value">
                  <a href="tel:+201009784937" className="text-white text-decoration-none hover:underline" aria-label="Call Ahmed Naser" title="Call Ahmed Naser">+201009784937</a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-2 copy-btn"
                    aria-label={copiedLabel === 'phone' ? 'Copied phone number!' : 'Copy phone number to clipboard'}
                    title={copiedLabel === 'phone' ? 'Copied!' : 'Copy phone number to clipboard'}
                    onClick={() => handleCopyToClipboard('+201009784937', 'phone')}
                  >
                    <i className={copiedLabel === 'phone' ? 'fas fa-check text-success' : 'fas fa-copy'} style={{ transition: 'color 0.2s ease-in-out' }} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
