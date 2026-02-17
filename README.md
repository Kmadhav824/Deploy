# 📥 wercel-fetch — Repository Fetch Service

The **wercel-fetch** service is responsible for retrieving user Git repositories and preparing them for the deployment pipeline.

It acts as the **source acquisition layer** of the Wercel deployment platform by cloning repositories locally and uploading project files to Cloudflare R2 object storage for further processing.

This service ensures reliable source handling before build and deployment.

---

## 🚀 Overview

This service performs the first step of the deployment pipeline:


It is designed to handle repository retrieval securely and efficiently while isolating the source fetching process from other services.

---

## 🎯 Responsibilities

- Clone user Git repositories locally
- Extract project files
- Upload source files to Cloudflare R2

---

## ⚙️ How It Works

### Fetch Workflow

1. Receives Git repository URL from Wercel control plane
2. Clones repository locally using Git
3. Processes project files
4. Uploads source code to Cloudflare R2 object storage



---

## 🏗 System Role

This service acts as the **source management layer** of the deployment architecture.

It separates repository handling from:

- build processing
- deployment logic
- request handling

This improves:

- fault isolation
- scalability
- security
- maintainability

---

## ✨ Key Features

- Git repository cloning
- Object storage upload pipeline
- Source artifact management
- Modular service design
- Independent execution workflow

---

## 🔒 Design Considerations

### Fault Isolation
Repository failures do not affect build or deployment services.

### Scalability
Multiple fetch workers can run in parallel.

### Storage Abstraction
Uses object storage (Cloudflare R2) instead of local storage for reliability.

### Separation of Concerns
Only handles source acquisition.

---

## 🧩 Tech Stack

- **Runtime:** Node.js
- **Version Control:** Git
- **Storage:** Cloudflare R2
- **Architecture:** Worker Service
- **Communication:** REST APIs

---

## 🔗 Related Services

This service is part of a modular deployment platform:
- System Bundle: https://github.com/Kmadhav824/wercel-bundle

---

## 🎯 Learning Goals

- Git automation
- Object storage pipelines
- Backend service architecture
- Artifact management systems
- Cloud deployment workflows

---

## 👨‍💻 Author

Madhav Kumar  
https://github.com/Kmadhav824


