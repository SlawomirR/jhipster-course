import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpeaker } from 'app/shared/model/speaker.model';

type EntityResponseType = HttpResponse<ISpeaker>;
type EntityArrayResponseType = HttpResponse<ISpeaker[]>;

@Injectable({ providedIn: 'root' })
export class SpeakerService {
    private resourceUrl = SERVER_API_URL + 'api/speakers';

    constructor(private http: HttpClient) {}

    create(speaker: ISpeaker): Observable<EntityResponseType> {
        return this.http.post<ISpeaker>(this.resourceUrl, speaker, { observe: 'response' });
    }

    update(speaker: ISpeaker): Observable<EntityResponseType> {
        return this.http.put<ISpeaker>(this.resourceUrl, speaker, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISpeaker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISpeaker[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
