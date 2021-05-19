import { HttpHeaders } from '@angular/common/http';

describe('CongressMembers', () => {

    beforeEach(() => {


        cy.visit('/');
    })
    it('should display a list of congressmen', () => {
        cy.visit('/');
    })


    it('should have a toggle button', () => {
        cy.get('#toggle-button').click();
    })

    it('should get to next page', () => {
        cy.get('.mat-paginator').find('button.mat-paginator-navigation-next.mat-icon-button').click();

    })

    it('should redirect to detail', () => {
        cy.get('.table-row:first').click()
    })

    it('should click option', () => {
        cy.get('mat-select[formcontrolname="select"]').click();
        cy.get('mat-option').contains('117').click();

    })

    it('should filter',() =>{
        cy.get('input[name="chamber"]').type('Gary')

    })

})