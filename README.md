# Medical-api

## Considerations
In order to execute this project, please consider certain things:
- Node.js version 20.6 is required to be executed, due to internal project configurations.
- It was decided to use [Prisma](https://www.prisma.io/) as ORM and Postgres as database engine, it was configured in a `docker-compose.yml` that must be run locally through the `docker compose up` command.
- A `.env` file that handles the environment variables is used, and there's an example of the variables needed to execute available in the `.example.env` file.
- To run the project it is necessary to install docker:

```
docker compose up
```
- This is the suggested order in how to use the endpoints:
```
1. Create a user
2. Login
3. Create a symptom
4. Create a diagnosis
```
- Unfortunately, this API doesn't have refresh token function because I ran out of time, but it was meant to have it.

**NOTE**: Prisma by default generates a variable called `DATABASE_URL` that is used in the `schema.prisma` file, and that same variable is the one used for the instantiation of the Prisma class.

## How to
To install dependencies:

```
npm install
```

To initialize the `schema.prisma` file you must execute the following command:

```
npm run prisma:generate
```

And then:

```
npm run prisma:migrate
```

**NOTA**: to this command you can add a name to the migration or not, it is optional and will not generate conflicts, an example could be seen below.

```
npm run prisma:migrate --name init
```

To run the project in development mode it's necessary to use the following script:

```
npm run dev
```

## Endpoints

### USER

**POST** `/api/user/create`: this endpoint receives through the body the information of the user to be created. Receives in the body:

```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "test@email.com",
    "gender": "female",
    "birthday": "01/01/1995",
    "password": "tes12345"
}
```

**POST** `/api/user/login`: returns the access token to be able to use the protected endpoints. Receives in the body:

```json
{
    "email": "test@email.com",
    "password": "tes12345"
}
```

### PATIENT

**GET** `/api/patient/history`: returns the patient's medical history, showing all the patient's previous diagnoses.

### SYMPTOMS

**POST** `/api/symptom/create`: is used to create all the symptoms available in ApiMedic within the database.

**GET** `/api/symptom/list`: returns the entire list of symptoms available in the database.

### DIAGNOSIS

**POST** `/api/diagnosis/create`: is used to create diagnoses in APiMedic to be saved in the database. It receives in the body an array of symptoms:
``` json
{
    "symptoms": [
        {
            "id": 1,
            "symptomId": 9,
            "name": "Headache"
        }
    ]
}
```

Where:

`id`: id of the symptom in database.

`symptomId`: ApiMedic id of the symptom.

`name`: symptom name

**GET** `/api/diagnosis/list`: returns the list of available diagnoses in ApiMedic based on symptoms. Receive by parameters:
```
symptoms: 9,10,11,12
```