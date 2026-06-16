import React, { useEffect, useState } from 'react';
import { getPartners } from '../../services/partnerService';
import './PartnersShowcase.css';

// Renders nothing when there are no partners yet, so it never shows an awkward empty box.
const PartnersShowcase = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners()
      .then((res) => setPartners(res.data || []))
      .catch(() => setPartners([]));
  }, []);

  if (partners.length === 0) return null;

  return (
    <div className="partners-showcase">
      {partners.map((partner) => {
        const content = (
          <>
            <img src={partner.logoUrl} alt={partner.name} className="partner-logo" />
            <span className="partner-name">{partner.name}</span>
          </>
        );

        return partner.websiteUrl ? (
          <a
            key={partner._id}
            href={partner.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-tile"
          >
            {content}
          </a>
        ) : (
          <div key={partner._id} className="partner-tile">
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default PartnersShowcase;
