import {Component, OnInit} from '@angular/core';
import { Auction } from '../_models';
import { AuctionService, AuthenticationService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({templateUrl: './auction.component.html'})
export class AuctionComponent implements OnInit{
    auctions: Auction[] = [];
    auctionForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private auctionService: AuctionService) {}

    ngOnInit() {
        this.auctionForm = this.formBuilder.group({
            name: ['', Validators.required],
            initialvalue: ['', Validators.required],
            wasused: ['', Validators.required],
            openingdate: ['', Validators.required],
            terminationdate: ['', Validators.required]
        });
    }

    get f() { return this.auctionForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.auctionForm.invalid) {
            return;
        }

        this.loading = true;
    }
    
}
