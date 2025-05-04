# Inventory System

## Description
This project is an inventory management system for a store, built using a microservices architecture. It is designed to handle product management and order processing while ensuring scalability and security. The system is deployed using Docker and Kubernetes.

## Prerequisites

Before starting, ensure the following tools are installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- A tool to encode strings in base64 (usually built-in with most systems)


> We assume Minikube is installed with the **Docker driver**. You can verify or set this with:
> ```bash
> minikube config set driver docker
> ```

---

## Setup Instructions

### 1. Start Minikube
```bash
minikube start --driver=docker
```

### 2. Clone repo
```bash
git clone https://github.com/Raygunito/inventory-system.git
cd inventory-system
```
### 3. Configuration

In the folder `template`, use the `postgres-secret-template.yaml` template to create the postgres secrets. Do the same thing for the `auth-secret-template.yaml` template for the JWT Token. There is additionnal instructions in each template file to guide you.

>`
>echo -n 'your_secret_value' | base64
>`

### 4. Enable NGINX Ingress

```bash
minikube addons enable ingress
```

### 5. Apply k8s manifests
It will create everything under the namespace `inventory-system` (will be created if it doesn't exist).

```bash 
kubectl apply -f kubernetes/
```

### 6. Wait until ready

```bash 
kubectl get pods --watch -n inventory-system
```

Once all the pods status are "Running" proceed to next step.

## Access the application

### 1. Check Ingress Host
```bash
kubectl get ingress
```
### 2. If Using Minikube Tunnel (Docker Desktop Users):
```bash
minikube tunnel
```
### 3. Open in Browser:
Open in Browser:
Visit the URL shown under ADDRESS from the Ingress (http://\<ip-or-hostname\>/) to access the app. `/` will go to the frontend, `/api/products` let you talk with the API backend.

## Additional information
- Kubernetes runs locally using Minikube with the Docker driver.
- NGINX is used for ingress routing.
- The frontend is accessible via the configured ingress route.
- 2 k8S RBAC roles are defined : `admin-role` and `devops-role`
- 2 service accounts are created : `admin` and `devops`, to try a command as one of the roles, do `kubectl get pods -n inventory-system --as=admin`