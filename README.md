# Inventory System

## Description
This project is an inventory management system for a store, built using a microservices architecture. It is designed to handle product management and order processing while ensuring scalability and security. The system is deployed using Docker and Kubernetes.

## Configuration

1. In the folder `template`, use the `postgres-secret-template.yaml` template to create the postgres secrets.
2. Apply all the kubernetes files with `kubectl apply -f kubernetes/`