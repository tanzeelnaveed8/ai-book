---
id: 06-human-robot-interaction
title: "Module 6: Human-Robot Interaction (HRI)"
sidebar_label: "Human-Robot Interaction"
---

import Admonition from '@theme/Admonition';

# Module 6: Human-Robot Interaction (HRI)

<Admonition type="info" title="Module Focus">
  <p>This module transitions from the mechanics of robot motion to the subtleties of robot interaction. We will explore how to design humanoid robots that can work with, understand, and be understood by humans. This involves cognitive robotics, interaction design, and the emerging field of "Emotion AI" to make robots more intuitive and socially aware partners.</p>
</Admonition>

## 6.1 The Goal of HRI: From Tools to Teammates

Historically, robots have been treated as tools—caged off in factories, performing repetitive tasks. The goal of modern HRI is to transform robots into **teammates** that can operate safely and effectively in human-centric environments like homes, hospitals, and offices.

This requires a shift in design philosophy. A successful interactive robot is not just one that performs its task correctly, but one that is also:
- **Legible:** Its actions and intentions are clear to the humans around it.
- **Predictable:** Its behavior is consistent and understandable.
- **Socially Aware:** It adheres to social norms and conventions (e.g., respecting personal space).
- **Intuitive:** Humans can easily learn how to interact with it without extensive training.

## 6.2 Cognitive Robotics: Giving the Robot a "Theory of Mind"

A key aspect of HRI is **Cognitive Robotics**, which aims to endow robots with a limited "Theory of Mind"—the ability to reason about the beliefs, intentions, and knowledge of others. A robot with a cognitive model of its human partner can make much more intelligent decisions.

**Example:**
Imagine you ask a robot, "Bring me the cup."
- A **non-cognitive robot** might see three cups and stop, confused, or bring the closest one.
- A **cognitive robot** might reason: "The human is pointing towards the table. They were just drinking coffee. Therefore, they probably mean the coffee cup on the table."

This is achieved by building a **knowledge base** and an **inference engine**. The robot maintains a model of the world and uses logical rules to infer the human's intent based on language, gestures, and context.

## 6.3 Interaction Design for Robots

Interaction Design for HRI involves designing the robot's behaviors and communication modalities. The goal is to make the interaction feel natural and seamless.

### Implicit vs. Explicit Communication
- **Explicit Communication** is direct and unambiguous, such as spoken commands ("Stop") or pressing a button on a GUI.
- **Implicit Communication** is indirect and conveyed through the robot's body language. For example, if a humanoid robot turns its head and eyes toward an object before reaching for it, this telegraphs its intention to the human, making the action feel more predictable and less startling.

Effective HRI design uses a combination of both. A robot might use its gaze to indicate what it's paying attention to (implicit) while listening for a voice command to take action (explicit).

### Proxemics: The Social Use of Space
Proxemics is the study of how people use space. A robot that is socially aware must respect these unwritten rules. For example, it should not stand uncomfortably close to a person unless it is invited to do so. The robot's navigation system should be aware of social zones (intimate, personal, social) and adjust its pathing to maintain an appropriate distance.

## 6.4 Emotion AI: Recognizing and Expressing Affect

**Emotion AI**, or Affective Computing, is a field that aims to develop systems that can recognize, interpret, and simulate human emotions. For a social robot, this is a critical capability for building rapport and trust.

### Recognizing Human Emotion
A robot can use multiple modalities to infer a person's emotional state:
- **Facial Expressions:** Using computer vision to classify expressions (e.g., happy, sad, surprised).
- **Vocal Tone (Prosody):** Analyzing the pitch, volume, and tempo of speech.
- **Physiology:** In some settings, a robot might have access to data from wearable sensors (e.g., heart rate) to gauge arousal or stress.

### Expressing Emotion
A humanoid robot can use its own body to express a simplified emotional state to provide feedback to the user.
- **Body Posture:** A slumped posture can indicate failure or sadness, while an upright posture can indicate confidence.
- **Head Position:** A tilted head can signify curiosity or confusion.
- **Simple Facial Displays:** Using LED eyes or a simple screen to show expressions can make the robot's internal state much clearer to a human.

<Admonition type="danger" title="The Ethical Trap of Emotion AI">
  <p>Emotion AI is ethically complex. There are serious concerns about privacy, the potential for manipulation, and the accuracy and biases of emotion recognition models. This technology must be used transparently and with great care, focusing on improving the clarity of interaction rather than trying to "read minds."</p>
</Admonition>

### Assignment Tasks
1.  **Gaze Interaction:** In a simulator, program a robot's head to track a moving object or the "user's" camera position. Observe how this simple behavior makes the robot seem more "alive" and attentive.
2.  **Social Navigation:** Modify a ROS 2 navigation costmap to include a "personal space" layer around a simulated person. The robot should plan paths that avoid entering this zone unless the goal is inside it.
3.  **Interaction Design Document:** For the capstone project, write a short document describing how the robot will communicate its state to the user. What does it do when it's listening? When it's planning? When it has failed? Use both implicit (body language) and explicit (sound or light) signals.
