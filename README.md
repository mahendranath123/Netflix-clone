# 📺 **Netflix Clone - DevSecOps Edition**  

<div align="center">
  <a href="http://netflix-clone-with-tmdb-using-react-mui.vercel.app/">
    <img src="./public/assets/netflix-logo.png" alt="Netflix Clone Logo" width="120">
  </a>

  <h3 align="center">Netflix Clone 🚀</h3>

  <p align="center">
    A full-fledged Netflix Clone with React, TypeScript, and Material UI, powered by TMDB API. Now enhanced with <strong>Docker, Kubernetes, Jenkins CI/CD, and DevSecOps</strong> for a complete end-to-end deployment solution.
  </p>

  <p align="center">
    <a href="https://netflix-clone-react-typescript.vercel.app/">🎥 Live Demo</a> |
    <a href="https://github.com/crazy-man22/netflix-clone-react-typescript/issues">🐞 Report Bug</a> |
    <a href="https://github.com/crazy-man22/netflix-clone-react-typescript/issues">🚀 Request Feature</a>
  </p>
</div>

---

## 📌 **Table of Contents**  
- [🎯 Features](#-features)  
- [⚙️ Prerequisites](#️-prerequisites)  
- [🔧 Tech Stack](#-tech-stack)  
- [📦 Installation & Deployment](#-installation--deployment)  
- [🚀 CI/CD Pipeline (Jenkins)](#-cicd-pipeline-jenkins)  
- [📜 Kubernetes Deployment](#-kubernetes-deployment)  
- [🔍 Security Best Practices (DevSecOps)](#-security-best-practices-devsecops)  
- [📞 Contact](#-contact)  

---

## 🎯 **Features**  
✔️ Beautiful UI with **Material UI & Framer Motion**  
✔️ Advanced **Redux Toolkit & RTK Query** for state management  
✔️ **React Router** for seamless navigation  
✔️ **TMDB API** integration for fetching movie data  
✔️ Fully **containerized** using **Docker**  
✔️ **Kubernetes (K8s)** for scalable deployments  
✔️ **CI/CD pipeline** with **Jenkins**  
✔️ Security hardening with **DevSecOps best practices**  
✔️ **Monitoring & Logging** (Prometheus, Grafana, ELK Stack)  

---

## ⚙️ **Prerequisites**  
🔹 **Create a TMDB API Key** ([Sign up here](https://www.themoviedb.org/))  
🔹 **Set Up Docker & Kubernetes**  
🔹 **Install Jenkins & CI/CD Pipeline**  
🔹 **Ensure Helm & Ingress Controller for K8s**  

---

## 🔧 **Tech Stack**  
🚀 **Frontend**: React, TypeScript, Material UI, Redux Toolkit  
🐳 **Containerization**: Docker, Docker-Compose  
☸️ **Orchestration**: Kubernetes (K8s)  
🛠 **CI/CD**: Jenkins, GitHub Actions  
🔒 **Security**: Trivy, OWASP ZAP, Snyk  
📊 **Monitoring**: Prometheus, Grafana  

---

## 📦 **Installation & Deployment**  

### 1️⃣ **Run Locally with Docker**  
```sh
docker build --build-arg TMDB_V3_API_KEY=your_api_key_here -t netflix-clone .
docker run --name netflix-clone -d -p 80:80 netflix-clone
```

### 2️⃣ **Deploy to Kubernetes**  
```sh
kubectl apply -f Kubernetes/deployment.yml
kubectl apply -f Kubernetes/service.yml
kubectl get pods
```

---

## 🚀 **CI/CD Pipeline (Jenkins)**  

💡 **Automated CI/CD pipeline** to build, test, and deploy the app using **Jenkins**.  

### **Jenkinsfile**
```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-dockerhub-username/netflix-clone"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/netflix-clone.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kube-config']) {
                    sh 'kubectl apply -f Kubernetes/deployment.yml'
                }
            }
        }
    }
}
```

---

## 📜 **Kubernetes Deployment**  

### **Deployment (`deployment.yml`)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: netflix-clone
  labels:
    app: netflix-clone
spec:
  replicas: 3
  selector:
    matchLabels:
      app: netflix-clone
  template:
    metadata:
      labels:
        app: netflix-clone
    spec:
      containers:
        - name: netflix-clone
          image: your-dockerhub-username/netflix-clone:latest
          ports:
            - containerPort: 80
          env:
            - name: NODE_ENV
              value: "production"
```

### **Service (`service.yml`)**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: netflix-service
spec:
  selector:
    app: netflix-clone
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

---

## 🔍 **Security Best Practices (DevSecOps)**  

✅ **Container Security Scanning**  
🔹 Run **Trivy** to scan vulnerabilities  
```sh
trivy image your-dockerhub-username/netflix-clone:latest
```

✅ **Dependency Security**  
🔹 Use **Snyk** & **npm audit** for package security  
```sh
npm audit
snyk test
```

✅ **Runtime Security**  
🔹 Deploy **Falco** for Kubernetes runtime security  
```sh
helm install falco falcosecurity/falco
```

✅ **Code Security**  
🔹 Run **OWASP ZAP** for penetration testing  
```sh
zap-cli quick-scan http://your-app-url
```

---

## 📞 **Contact**  
🔹 **Author**: Aman Pathak  
🔹 **GitHub**: [@crazy-man22](https://github.com/crazy-man22)  
🔹 **Twitter**: [@amanpathak](https://twitter.com/amanpathak)  

> 💡 *Contributions are welcome! Feel free to submit a pull request.* 🚀  

---

🚀 **Enjoy Streaming!** 🎬🍿 
