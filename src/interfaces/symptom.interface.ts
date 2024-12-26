export interface IDataResponse {
    ID: number;
    Name: string;
}

export interface ISymptom {
    symptomId: number;
    name: string;
}

export interface IFormattedSymptom extends ISymptom {
    id: number;
};