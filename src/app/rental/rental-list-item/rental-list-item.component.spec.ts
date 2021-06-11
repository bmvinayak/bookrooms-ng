import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalListItemComponent } from './rental-list-item.component';

describe('RentalListItemComponent', () => {
	let component: RentalListItemComponent;
	let fixture: ComponentFixture<RentalListItemComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RentalListItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RentalListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
