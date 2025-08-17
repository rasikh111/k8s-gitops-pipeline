# Kubernetes GitOps CI/CD Pipeline with Argo CD

This project demonstrates how to build an **end-to-end GitOps CI/CD pipeline** on Kubernetes using **GitHub Actions** and **Argo CD (UI)**.  
The pipeline builds a Node.js application into a Docker image, pushes it to a container registry, and manages deployments via Argo CD.

---

## Project Structure

<pre><font color="#12488B"><b>.</b></font>
├── Dockerfile
├── index.js
├── <font color="#12488B"><b>manifest</b></font>
│   ├── deployment.yaml
│   └── service.yaml
├── package.json
├── README.md
└── <font color="#12488B"><b>workflows</b></font>
    └── ci-cd.yaml

2 directories, 7 files
</pre>
---

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Kubernetes cluster (Kind, Kubeadm, EKS, AKS)
- [Argo CD](https://argo-cd.readthedocs.io/en/stable/getting_started/)
- GitHub account with Actions enabled

---

## Step 1: Build & Push Docker Image (via GitHub Actions)

The GitHub Actions workflow (`ci-cd.yaml`) builds and pushes the Docker image automatically when changes are pushed.

###GitHub Secrets Required
Set the following secrets in **GitHub → Repo → Settings → Secrets and variables → Actions**:

- `DOCKER_USERNAME` → your Docker Hub username  
- `DOCKER_PASSWORD` → your Docker Hub password or access token  

 
 ##Step 2: Install Argo CD

kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Check pods:

kubectl get pods -n argocd

 Step 3: Access Argo CD UI

kubectl port-forward svc/argocd-server -n argocd 8080:443

Open: https://localhost:8080

Get initial password:

kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 -d

Login:

    Username: admin

    Password: (value from above)
---
##Step 4: Create Application in Argo CD UI

    Click + New App in the Argo CD UI.

    Fill in:

        Application Name: k8s-gitops-pipeline

        Project: default

        Repository URL: https://github.com/rasikh111/k8s-gitops-pipeline.git

        Revision: main

        Path: manifest

        Cluster URL: https://kubernetes.default.svc

        Namespace: default

    Click Create.

    Sync the application.

##Step 5: Enable Auto-Sync

In the UI, open your application → App Details → Sync Policy → Enable:

    ✅ Auto-Sync

    ✅ Self-Heal

    ✅ Prune

Now every commit to GitHub will automatically update your Kubernetes cluster.
##Step 6:  
🧪 Verification

kubectl get pods -n default
kubectl get svc -n default

If using NodePort/LoadBalancer:

http://<NODE_IP>:<PORT>

📝 Notes

    GitHub Actions → builds & pushes image, updates manifest.

    Argo CD → continuously syncs Git repo → Kubernetes cluster.

    Git is the single source of truth.

---
