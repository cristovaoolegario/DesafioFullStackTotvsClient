import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Auction } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuctionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Auction[]>(`${config.apiUrl}/auctions/`);
    }

    add(auction: Auction) {
        return this.http.post<Auction>(`${config.apiUrl}/auctions/`, auction);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/auctions/` + id);
    }

    update(auction: Auction) {
        return this.http.put(`${config.apiUrl}/auctions/` + auction.id, auction);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/auctions/` + id);
    }

    
}