export interface IResponseType<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
  provider?: string;
  code?: number;
}

export interface IHighway {
  id: number;
  the_geom: string;
  [key: string]: any;
}

export interface INdsWay {
  ndsId: number;
  meshId: string;
  linkCoors: string;
  [key: string]: any;
}

export interface ITrackPoint {
  x: number;
  y: number;
  t: number;
  [key: string]: any;
}

export interface IMappingResult {
  linkInfos: INdsWay[];
}
export interface ICheckInfo {
  trackPoint: ITrackPoint[];
}

export interface ICheckConfig {
  url?: string;
}
