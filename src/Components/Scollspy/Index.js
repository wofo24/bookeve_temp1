import React, { useState, useEffect } from 'react';
import Scrollspy from 'react-scrollspy';
import '../Scollspy/Style.css'

const ScrollSpyComponent = ({ sections, minRef }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = minRef

      // Calculate the active section based on the scroll position
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id);
        if (
          section.offsetTop - 50 <= scrollY &&
          section.offsetTop + section.offsetHeight - 50 > scrollY
        ) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <Scrollspy items={sections.map(section => section.id)} currentClassName="active" offset={-50}>
      {sections.map(section => (
        <li key={section.id}>
          <a href={`#${section.id}`}>{section.title}</a>
        </li>
      ))}
    </Scrollspy>
  );
};

export default ScrollSpyComponent;
