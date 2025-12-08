import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './homepage.module.css';

const modules = [
  { name: 'ROS 2 Nervous System', link: '/modules/01-ros-2' },
  { name: 'Digital Twin Simulation', link: '/modules/02-digital-twin' },
  { name: 'NVIDIA Isaac', link: '/modules/03-nvidia-isaac' },
  { name: 'Vision-Language-Action', link: '/modules/04-vla-systems' },
  { name: 'Bipedal Locomotion', link: '/modules/05-bipedal-locomotion' },
  { name: 'Human-Robot Interaction', link: '/modules/06-human-robot-interaction' },
  { name: 'Ethics & Society', link: '/modules/07-ethics-and-society' },
  { name: 'Future Trends', link: '/modules/08-future-trends' },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className={`${styles.heroRow} container`}>
        
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroAuthor}>Book by Tanzeel Naveed Khan</p>

          <p className={styles.heroSubtitle}>
            A Complete Guide to Physical AI, Embodied Intelligence, and Humanoid Robotics
          </p>

          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/introduction/chapter1">
              📘 Start Reading
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <img
            src="img/logo.png"
            alt="Robot AI"
            className={styles.heroImage}
          />
        </div>

      </div>
    </header>
  );
}

function MissionSection() {
  return (
    <section className={styles.missionSection}>
      <div className="container">
        <h2>Mission</h2>
        <p>
          The future of AI lives in the physical world. This book focuses on Physical AI —
          intelligent machines that interact with reality. You will learn humanoid robotics,
          ROS 2, simulation, digital twins and real-world deployment.
        </p>
      </div>
    </section>
  );
}

function LearningOutcomes() {
  return (
    <section className={styles.outcomesSection}>
      <div className="container">
        <h2>What You Will Learn</h2>
        <div className="row">

          <div className="col col--4">
            <ul>
              <li>Physical AI & Embodied Intelligence</li>
              <li>ROS 2 Robotics Middleware</li>
            </ul>
          </div>

          <div className="col col--4">
            <ul>
              <li>Gazebo & Simulation</li>
              <li>NVIDIA Isaac Platform</li>
            </ul>
          </div>

          <div className="col col--4">
            <ul>
              <li>Humanoid Control Systems</li>
              <li>Vision + Language AI for Robots</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

function CurriculumGrid() {
  return (
    <section className={styles.curriculumSection}>
      <div className="container">
        <h2>Curriculum</h2>
        <div className={styles.grid}>
          {modules.map((m) => (
            <Link key={m.name} to={m.link} className={styles.gridItem}>
              <h3>{m.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Home" description="Physical AI & Humanoid Robotics Book by Tanzeel Naveed Khan">
      <HomepageHeader />
      <main>
        <MissionSection />
        <LearningOutcomes />
        <CurriculumGrid />
      </main>
    </Layout>
  );
}
