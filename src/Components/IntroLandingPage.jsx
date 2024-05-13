import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TypewriterEffect } from './ui/type-writer';
import { TextGenerateEffect } from "./ui/text-generate-effect";
import ReactPlayer from 'react-player';
import { WobbleCard } from "./ui/wobble-card";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";
import { TextRevealCard } from "./ui/text-reveal-card";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { Divider } from '@chakra-ui/react'

const words = [
  {
    text: "Frequently",
    className: "text-black-500 dark:text-black-500",
  },
  {
    text: "Asked",
    className: "text-black-500 dark:text-black-500",
  },
  {
    text: "Questions",
    className: "text-black-500 dark:text-black-500",
  },
];

const questions = [
  {
    question: "What is PharmaWatch's mission?",
    answer: "At PharmaWatch, we revolutionize healthcare integrity by harnessing the power of blockchain technology. Our mission is simple yet profound: to combat fraud and counterfeit medicines, ensuring the safety and well-being of every patient.",
  },
  {
    question: "How does the app detect fake medicines?",
    answer: `Our app utilizes blockchain technology to ensure the authenticity of medicines. Each medicine is assigned a unique QR code by the manufacturer, which contains information stored securely on the blockchain. When users scan the QR code, they can verify if the medicine is genuine or counterfeit.`,
  },
  {
    question: "How can I scan the QR code on the medicine?",
    answer: "Simply open the app and select the QR code scanning option. Point your device's camera towards the QR code on the medicine packaging, and the app will automatically scan and verify the authenticity.",
  },
  {
    question: "Can I trust the accuracy of the information provided by the app?",
    answer: "Yes, our app relies on blockchain technology, which is known for its immutable and transparent nature. The information stored in the blockchain cannot be tampered with or altered, providing users with reliable and accurate data about their medicines.",
  },
];

export function IntroLandingPage() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full">
      <div className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip" ref={ref}>
        <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
      </div>
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full" style={{ marginTop: '30px' }}>
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Authenticity Assurance
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Ensure secure transactions and protect against counterfeit products with our blockchain-based authentication system.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Manufacturer QR Generation
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Manufacturers can generate unique QR codes for their medicines, linking them to blockchain records. This ensures transparency in the supply chain and helps combat counterfeit drugs.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Instant Alerts
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Receive real-time notifications for product expiry dates, ensuring you stay informed and make timely decisions.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Medical Chatbot
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
              A dedicated chatbot provides users with accurate and reliable medical information. Users can ask questions related to their health, medications, and treatments, receiving prompt responses from trusted sources.


              </p>
            </div>
          </WobbleCard>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <TypewriterEffect words={words} />
      </div>
      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {questions.map((qa, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-left items-left cursor-pointer" onClick={() => toggleFAQ(index)}>
              <h3 className="text-xl font-semibold">{qa.question}</h3>
              {openIndex === index ? <ChevronUpIcon className="w-6 h-6 ml-2" /> : <ChevronDownIcon className="w-6 h-6 ml-2" />}
            </div>
            <Divider orientation="horizontal" style={{marginTop:'28px'}}/>
            {openIndex === index && (
              <div className="mt-4">
                <div className="mt-2">{qa.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
