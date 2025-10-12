# kube-credential

### Name - Jeyalakshmi
### Email - jeya254@gmail.com
### Contact Number - +918072136887

## Functional Requirements
    1.Client send the credential data such as Title, Subject and Expiry Date to Issuance Service
    2.Issuance Service verify the datas are available in dev.db(SQLite)
    3.If exists, responds "Credentials Already Issued
    4.If not, generate the hash using sha256 and store it in dev.db
    5.Client send the credential data such as Title, Subject and Expiry Date to Verification Service
    for verification
    6.Verifcation Service checks if the data is already verified or not in verify.db(SQLite), If exists then fetch the record from the verify.db and responds "Credential data verified from local"
    7.If not exists, send the request to Issuance service with hash key and retrieve the record from the service. If record found, responds to client "Credential data verified from Issuance", Otherwise responds "Credential Not found"

## High Level Architecture
    ![High level](https://github.com/Jeyssiva/kube-credential/blob/main/highlevel.png)


##  Deployment Procedures
### git clone https://github.com/Jeyssiva/kube-credential.git
### Issuance Service - Port : 3001
### cd kube-credential/kube-issuance
### Install
    npm install
### Prisma generate + push
    npx prisma generate
    npx prisma db push

    db push will create the SQLite file and push the schema.
### Run locally (dev)
    npm run dev
### Verification Service - Port : 4001
### cd kube-credential/kube-verification
### Install
    npm install
### Prisma generate + push
    npx prisma generate
    npx prisma db push

    db push will create the SQLite file and push the schema.
### Run locally (dev)
    npm run dev
### Front end - Port : 5173
### cd kube-credential/kube-frontend
### Install
    npm install
### Run locally (dev)
    npm run dev
### Run in Docker 
    docker compose build
    docker compose up - Activate the docker service
    docker compose down - Deactivate the docker service

