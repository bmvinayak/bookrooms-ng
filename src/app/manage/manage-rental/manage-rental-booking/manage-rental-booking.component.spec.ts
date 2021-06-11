import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageRentalBookingComponent } from './manage-rental-booking.component';

describe('ManageRentalBookingComponent', () => {
	let component: ManageRentalBookingComponent;
	let fixture: ComponentFixture<ManageRentalBookingComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ManageRentalBookingComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageRentalBookingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
