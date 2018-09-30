import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISession } from 'app/shared/model/session.model';

type EntityResponseType = HttpResponse<ISession>;
type EntityArrayResponseType = HttpResponse<ISession[]>;

@Injectable({ providedIn: 'root' })
export class SessionService {
    private resourceUrl = SERVER_API_URL + 'api/sessions';

    constructor(private http: HttpClient) {}

    create(session: ISession): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(session);
        return this.http
            .post<ISession>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(session: ISession): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(session);
        return this.http
            .put<ISession>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISession[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(session: ISession): ISession {
        const copy: ISession = Object.assign({}, session, {
            startDateTime: session.startDateTime != null && session.startDateTime.isValid() ? session.startDateTime.toJSON() : null,
            endDateTime: session.endDateTime != null && session.endDateTime.isValid() ? session.endDateTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDateTime = res.body.startDateTime != null ? moment(res.body.startDateTime) : null;
        res.body.endDateTime = res.body.endDateTime != null ? moment(res.body.endDateTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((session: ISession) => {
            session.startDateTime = session.startDateTime != null ? moment(session.startDateTime) : null;
            session.endDateTime = session.endDateTime != null ? moment(session.endDateTime) : null;
        });
        return res;
    }
}
