import React from 'react';
import { CustomerPostNavBar } from '../CustomerComponents/CustomerPostNavBar';
import { chakra } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import ImageSlider from './ImageSlider';
import { BentoGrid , BentoGridItem } from '../Components/ui/bento-grid';
import { cn } from '../utils/cn';
import { FooterLandingPage } from '../Components/FooterLandingPage';
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
const CustomerHomepage = () => {
    const slides = [
        { url: "/image1.jpeg", title: "beach" },
        { url: "/Designer.png", title: "boat" },
        // { url: "/image3.png", title: "forest" },
        { url: "/image4.png", title: "forest" }
    ];

    return (
        <>
            <div>
                <CustomerPostNavBar />
                <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
                    <ImageSlider slides={slides} />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", maxWidth: "100%", marginTop:'80px' }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "20px", maxWidth: "50%" }}>
                    <img
                        src="/qrscan.png"
                        alt="Image"
                        style={{ width: "100%", maxWidth: "700px", borderRadius: "15px" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "50%" }}>
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <h2 style={{ fontSize: "35px", fontFamily: 'Times New Roman, serif' }}><span style={{ backgroundColor: 'rgba(195, 255, 190, 0.5)',borderRadius: '5px',padding: '2px 5px'}}>ScanSafe</span>: Authenticate Medicines Instantly</h2>
                        <p style={{ fontSize: "18px", color: "#666" }}>Empower yourself against counterfeit drugs. ScanSafe utilizes QR scanning and blockchain to verify medicine authenticity instantly.</p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", maxWidth: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "20px", maxWidth: "50%" }}>
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <h2 style={{ fontSize: "35px", fontFamily: 'Times New Roman, serif' }}>  Streamlined Medical <span style={{ backgroundColor: 'rgba(216, 185, 255, 0.5)',borderRadius: '5px',padding: '2px 5px'}}>Report Analysis</span></h2>
                        <p style={{ fontSize: "18px", color: "#666" }}>Get clear insights into your medical reports. Our user-friendly analysis helps you understand your health at a glance. Stay informed and take control of your well-being effortlessly.</p>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "50%" }}>
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/patient-getting-medical-test-report-5588756-4655025.png?f=webp"
                        alt="Image"
                        style={{ width: "100%", maxWidth: "700px", borderRadius: "15px" }}
                    />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", maxWidth: "100%", marginTop:'80px' }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "20px", maxWidth: "50%" }}>
                    <img
                        src="/chatbot1.jpg"
                        alt="Image"
                        style={{ width: "100%", maxWidth: "700px", borderRadius: "15px" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "50%" }}>
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <h2 style={{ fontSize: "35px", fontFamily: 'Times New Roman, serif' }}>Your Trusted Medical <span style={{ backgroundColor: 'rgba(255, 220, 190, 0.9)',borderRadius: '5px',padding: '2px 5px'}}>Advisor</span></h2>
                        <p style={{ fontSize: "18px", color: "#666" }}>Get instant medical guidance with MediAssist! Our user-friendly chatbot is tailored for medical queries, providing accurate and reliable information whenever you need it. Stay informed and empowered about your health with ease.</p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", maxWidth: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "20px", maxWidth: "50%" }}>
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <h2 style={{ fontSize: "35px", fontFamily: 'Times New Roman, serif' }}>  WellnessShield <span style={{ backgroundColor: 'rgba(265, 265, 186, 0.9)',borderRadius: '5px',padding: '2px 5px'}}>Alerts</span>: Safeguarding Your Well-being </h2>
                        <p style={{ fontSize: "18px", color: "#666" }}>Receive timely alerts for medication expiry, ensuring your health and well-being are always prioritized. Stay informed and proactive with our notification system, keeping you one step ahead in managing your health.</p>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "50%" }}>
                    <img
                        src="/expiry2.avif"
                        alt="Image"
                        style={{ width: "100%", maxWidth: "700px", borderRadius: "15px" }}
                    />
                </div>
            </div>
            <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
    <FooterLandingPage/>
            
        </>
    );
};
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );
const items = [
  {
    title: "Protecting Your Health",
    description: "Safeguard your well-being. Easily verify medicine authenticity, receive expiry alerts, and access expert medical advice—all in one app",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Scan, Verify, Protect",
    description: "Empower yourself. Scan medicine QR codes, verify authenticity, and protect your health with confidence.",
    // header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Stay Informed, Stay Safe",
    description: "Get timely alerts and stay informed. Receive notifications for medicine expiry and take proactive steps for your health.",
    // header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Your Medical Advisor",
    description:
      "Chat with our AI-powered MediChat. Ask medical questions, get expert advice, and stay informed about your health effortlessly.",
    // header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Insights at Your Fingertips",
    description: "Gain instant insights. Analyze medical reports, understand your health status, and make informed decisions for your well-being.",
    // header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Simplified Health Management",
    description: "Simplify health management. Track medicine authenticity, manage expiry dates, and stay organized for better health outcomes.",
    // header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Comprehensive Health Companion",
    description: "Experience comprehensive care. From medicine verification to personalized health insights, we've got you covered every step of the way.",
    // header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

export default CustomerHomepage;
