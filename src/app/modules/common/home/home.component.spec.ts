import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';

// @ts-ignore
describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    // @ts-ignore
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // @ts-ignore
        expect(component).toBeTruthy();
    });
});
