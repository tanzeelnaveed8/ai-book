---
id: weeks-1-13
title: "Weekly Learning Map"
sidebar_label: "Weeks 1-13"
---

import Admonition from '@theme/Admonition';

# Weekly Learning Map: A 13-Week Journey

This document outlines the structured, week-by-week curriculum for the Physical AI & Humanoid Robotics course. Each section details the lessons, key learning objectives, and expected assessments.

---

## Part 1: Foundations (Weeks 1-5)

### **Weeks 1-2: Introduction to Physical AI**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Define Physical AI and differentiate it from purely digital AI.</li>
    <li>Understand the concept of "embodied intelligence."</li>
    <li>Identify the key hardware components of a modern robot (sensors, actuators, compute).</li>
    <li>Gain a high-level overview of the humanoid robotics landscape.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 1:** What is Physical AI? From cloud-based models to robots that understand physical laws.
    -   **Lesson 2:** The Humanoid Form Factor: Why building robots in our own image is advantageous for a human-centric world.
    -   **Lesson 3:** Sensor Systems Deep Dive: How robots "see" and "feel" the world. A detailed look at LiDAR, stereo cameras, IMUs, and force/torque sensors.
-   **Lab:**
    -   **Lab 1:** Introduction to the Linux environment, command line, and development tools.
-   **Assessment:**
    -   Quiz on the fundamental concepts of embodied AI and sensor technologies.

### **Weeks 3-5: ROS 2 Fundamentals**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Master the core architecture of ROS 2.</li>
    <li>Write Python-based ROS 2 nodes, publishers, and subscribers.</li>
    <li>Understand the difference between Topics, Services, and Actions and when to use each.</li>
    <li>Learn to build and manage complex robotics applications using launch files and parameters.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 4:** The ROS 2 Graph: Understanding Nodes, Topics, and the communication backbone.
    -   **Lesson 5:** ROS 2 Interfaces: Defining custom message (`.msg`) and service (`.srv`) types.
    -   **Lesson 6:** Building a ROS 2 Package: Creating a structured, reusable software module in Python.
    -   **Lesson 7:** Launch Files: Orchestrating the launch of multiple nodes and configurations.
-   **Lab:**
    -   **Lab 2:** Create a ROS 2 package containing two nodes: a "talker" that publishes string messages and a "listener" that subscribes and logs them.
-   **Assessment:**
    -   **Project 1:** Develop a ROS 2 package that simulates a simple traffic light system using topics for state changes and a service to check the current light status.

---

## Part 2: Simulation and AI Perception (Weeks 6-10)

### **Weeks 6-7: Robot Simulation with Gazebo**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Set up and navigate the Gazebo simulation environment.</li>
    <li>Understand the structure of URDF and SDF files for robot and world modeling.</li>
    <li>Integrate a simulated robot with ROS 2 for control and data acquisition.</li>
    <li>Learn to visualize sensor data using RViz.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 8:** Introduction to Gazebo: Physics, rendering, and the ROS 2 interface.
    -   **Lesson 9:** Modeling for Simulation: A deep dive into the URDF format—links, joints, visuals, and collision properties.
    -   **Lesson 10:** Spawning and Controlling a Robot: Using ROS 2 to send commands to a simulated robot in Gazebo.
-   **Lab:**
    -   **Lab 3:** Create a URDF for a simple 4-wheeled robot. Spawn it in a custom Gazebo world and drive it using ROS 2 commands. Visualize the robot's pose and sensor data in RViz.
-   **Assessment:**
    -   **Project 2:** Implement a Gazebo simulation where a robot must navigate from a start point to a goal point without colliding with obstacles.

### **Weeks 8-10: The NVIDIA Isaac Platform**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Understand the role of Isaac Sim in generating photorealistic, physically accurate simulations.</li>
    <li>Leverage Isaac ROS for hardware-accelerated computer vision and SLAM.</li>
    <li>Grasp the concept of "Sim-to-Real" transfer for AI model training.</li>
    <li>Utilize Reinforcement Learning techniques for basic robot control tasks.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 11:** The NVIDIA Isaac Ecosystem: Isaac Sim, Isaac ROS, and the Omniverse platform.
    -   **Lesson 12:** Synthetic Data Generation: Using domain randomization in Isaac Sim to create robust training data for perception models.
    -   **Lesson 13:** Hardware-Accelerated Perception: A practical look at Isaac ROS for Visual SLAM.
    -   **Lesson 14:** Introduction to Sim-to-Real: Strategies for training in simulation and deploying to a physical robot.
-   **Lab:**
    -   **Lab 4:** Use Isaac Sim to generate a small, labeled dataset of a specific object under different lighting conditions.
-   **Assessment:**
    -   **Project 3:** Using a pre-recorded dataset (rosbag), implement the Isaac ROS Visual SLAM pipeline and generate a map of the environment.

---

## Part 3: Advanced Humanoid Systems (Weeks 11-13)

### **Weeks 11-12: Humanoid Robot Development**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Understand the specific challenges of bipedal locomotion.</li>
    <li>Grasp the fundamentals of humanoid kinematics, dynamics, and balance control.</li>
    <li>Explore strategies for manipulation and grasping with multi-fingered hands.</li>
    <li>Design intuitive human-robot interactions.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 15:** Bipedal Locomotion: ZMP, Model Predictive Control, and balance strategies.
    -   **Lesson 16:** Humanoid Kinematics: Whole-body inverse kinematics and motion planning.
    -   **Lesson 17:** Grasping and Manipulation: The challenges of controlling a high-DoF robotic hand.
-   **Lab:**
    -   **Lab 5:** In a 2D simulator, implement an inverse kinematics solver for a multi-joint robotic leg.

### **Week 13: Conversational Robotics & Capstone Kick-off**

<Admonition type="note" title="Objectives">
  <ul>
    <li>Integrate LLMs (like GPT models) to create natural language interfaces for robots.</li>
    <li>Understand the architecture of a Vision-Language-Action (VLA) pipeline.</li>
    <li>Finalize the architecture and workflow for the capstone project.</li>
  </ul>
</Admonition>

-   **Lessons:**
    -   **Lesson 18:** The VLA Pipeline: Connecting voice (Whisper), cognition (LLM), and action (ROS 2).
    -   **Lesson 19:** Prompt Engineering for Robotics: How to ask an LLM to generate robot action plans.
-   **Lab:**
    -   **Capstone Workshop:** Finalize team roles and begin system architecture design for the final project.
-   **Assessment:**
    -   **Capstone Proposal:** Submit a detailed proposal outlining your team's plan for the final project, including architecture diagrams and task timelines.
