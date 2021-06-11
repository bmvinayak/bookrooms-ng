import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditableTextareaComponent } from './editable-textarea.component';

describe('EditableTextareaComponent', () => {
	let component: EditableTextareaComponent;
	let fixture: ComponentFixture<EditableTextareaComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [EditableTextareaComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditableTextareaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
