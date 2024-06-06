import { IShortestPathData } from "../ShortestPathData";

export interface IPathSlice {
    shortestPathResponse: IShortestPathData | null | undefined;
    shortestPathLoading: boolean;
    shortestPathError: unknown | null
}