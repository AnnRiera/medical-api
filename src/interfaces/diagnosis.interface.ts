import { Prisma } from '@prisma/client';

interface IDiagnosis {
    diagnosisId: number;
    name: string;
    profName: string;
    icd: string;
    icdName: string;
    accuracy: number;
}

interface IIssueResponse {
    ID: number;
    Name: string;
    ProfName: string;
    Icd: string;
    IcdName: string;
    Accuracy: number;
}

interface ISpecialisationResponse {
    ID: number;
    Name: string;
    SpecialistId: number;
}

interface ISpecialisation {
    id: number;
    name: string;
    specialistId: number;
}

export interface IDiagnosisResponseStructure {
    Issue: IIssueResponse;
    Specialisation: ISpecialisationResponse[];
}

export interface IDiagnosisResponse extends IDiagnosis{
    id: number;
    specialisations: Prisma.JsonValue;
}

export interface IDiagnosisBody {
    symptoms: number[];
}