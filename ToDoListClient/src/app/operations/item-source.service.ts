import { Injectable } from "@angular/core";
import { Item } from "../definitions/Item";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemSourceService {
  LOCAL_API_URL = "http://localhost:5107/items";

  items: Observable<Array<Item>>;

  constructor(private http: HttpClient) /* v */ {
    this.items = this.get();
  }

  get(): Observable<Item[]> /* v */ {
    return this.http.get<Item[]>(this.LOCAL_API_URL);
  }

  add(task: string): Observable<Item> /* v */ {
    let body = { task };
    return this.http.post<Item>(this.LOCAL_API_URL, body);
  }

  change(item: Item): Observable<void> /* v */ {
    return this.http.put<void>(this.LOCAL_API_URL, item);
  }

  remove(uid: number): Observable<void> /* v */ {
    let itemUrl = `${ this.LOCAL_API_URL }/${ uid }`;
    return this.http.delete<void>(itemUrl);
  }

}
