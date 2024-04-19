// ParticleBg.js
import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleBg = React.memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine); // Load the links preset
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = {
    background: {
      color: {
        value: "#FFFFFF",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#000000",
      },
      links: {
        color: "#000000",
        distance: 150,
        enable: true,
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        outMode: "bounce",
        speed: 1,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 6,
      },
    },
    detectRetina: true,
  };

  return (
    <>
      {init && (
        <Particles id="particles" init={particlesLoaded} options={options} />
      )}
    </>
  );
});

// Set display name for ParticleBg component
ParticleBg.displayName = "ParticleBg";

export default ParticleBg;
