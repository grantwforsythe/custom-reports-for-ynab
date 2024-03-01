import { HttpResponse } from '@angular/common/http';

export interface CachedValue {
  urlWithParams: string;
  response: HttpResponse<unknown>;
  lastRead: number;
}
