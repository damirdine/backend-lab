# Deploying Application with Auth by Keycloak

This guide will walk you through the process of deploying an Identity and Access Management (IAM) cluster using Keycloak. The provided instructions are suitable for development purposes and do not include data persistence within the container.

## Prerequisites

Before you begin, make sure you have the following prerequisites in place:

- Docker installed on your system.
- Basic knowledge of IAM concepts.
- Administrative access to manage containers.

## Step 1: Running Keycloak in Development Mode

To start a Keycloak container in development mode with no data persistence, run the following Docker command:

```shell
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.3 start-dev
```

or with docker-compose

```shell
docker compose up -d
```

- Go to [http://localhost:8080/]
- config your realm

  Please note that this approach is suitable for development and testing but is not recommended for production use due to the lack of data persistence.
