import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalSearchComponent } from './rental-search.component';

describe('RentalSearchComponent', () => {
	let component: RentalSearchComponent;
	let fixture: ComponentFixture<RentalSearchComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RentalSearchComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RentalSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
