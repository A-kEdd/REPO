# OpenShift Deployment Instructions for Node.js API App

## Prerequisites
- OpenShift CLI (`oc`) installed and logged in to your cluster
- Docker or Podman installed locally for building images (optional if using OpenShift build)

---

## 1. Deployment via Image

### Build the Docker Image Locally

```bash
docker build -t your-registry/your-namespace/node-api-app:latest .
```

### Push the Image to a Container Registry

```bash
docker push your-registry/your-namespace/node-api-app:latest
```

Make sure your OpenShift cluster can pull from this registry.

### Create OpenShift Deployment

```bash
oc new-app your-registry/your-namespace/node-api-app:latest
```

### Expose the Service

```bash
oc expose svc/node-api-app
```

### Verify Deployment

```bash
oc get pods
oc get routes
```

Access the app via the route URL.

---

## 2. Deployment via Source Code (OpenShift BuildConfig)

### Create a New App from Source

```bash
oc new-app nodejs:18~https://github.com/your-repo/node-api-app.git --name=node-api-app
```

Replace the GitHub URL with your repository URL containing the source code.

### Expose the Service

```bash
oc expose svc/node-api-app
```

### Verify Deployment

```bash
oc get pods
oc get routes
```

---

## Notes

- The app listens on the port defined by the `PORT` environment variable or defaults to 3000.
- The Dockerfile is configured to run as a non-root user for OpenShift compatibility.
- The app stores comments in a local file `comments.json` inside the container. For production, consider using persistent storage.

---
