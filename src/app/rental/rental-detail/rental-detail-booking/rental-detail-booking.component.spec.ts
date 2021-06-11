import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalDetailBookingComponent } from './rental-detail-booking.component';

describe('RentalDetailBookingComponent', () => {
	let component: RentalDetailBookingComponent;
	let fixture: ComponentFixture<RentalDetailBookingComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RentalDetailBookingComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RentalDetailBookingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
