import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Auction } from '../_models';
import { UserService, AuctionService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];
    auctions: Auction[] = []

    constructor(
        private userService: UserService,
        private auctionService: AuctionService
        ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
        this.auctionService.getAll().pipe(first()).subscribe(auctions => {
            this.auctions = auctions;
        })
    }
}