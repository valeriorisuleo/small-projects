import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    constructor(private router: Router) { }

    newBookmark: any;

    backTo() {
        this.router.navigate(['/overview']);
    }

    ngOnInit(): void {
        this.newBookmark = history.state.data;
    }

}