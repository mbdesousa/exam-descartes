export interface CityData {
    id: number;
    wikiDataId: string;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    regionWdId: string;
    latitude: number;
    longitude: number;
    population: number;
}

interface CityMetadata {
    currentOffset: number;
    totalCount: number;
}

export interface CityResponse {
    data: CityData[];
    metadata: CityMetadata;
}
