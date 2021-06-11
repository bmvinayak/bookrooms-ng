import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalDetailComponent } from './rental-detail.component';

describe('RentalDetailComponent', () => {
	let component: RentalDetailComponent;
	let fixture: ComponentFixture<RentalDetailComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RentalDetailComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RentalDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
