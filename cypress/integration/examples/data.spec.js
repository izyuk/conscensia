function fillingFields(selector, text) {
    cy.get(selector)
        .focus()
        .clear()
        .type(text)
        .blur({force: true});
}

context('Add new patients', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Checking route', function () {
        it('Should be http://localhost:9000', () => {
            cy.visit('http://localhost:9000');
        });
    });

    describe('Patient form', () => {
        it('Filling patient (Dmytro`s) info', () => {
            fillingFields('[data-cy="patient-id"]', 1);
            fillingFields('[data-cy="name"]', 'Dmytro');
            cy.get('[data-cy="sex"]')
                .select('Male');
            fillingFields('[data-cy="birthday"]', '1234-12-12');
            cy.get('[data-cy="addPatient"]')
                .click({force: true})
        });
        it('Filling patient (Jane`s) info', () => {
            fillingFields('[data-cy="patient-id"]', 2);
            fillingFields('[data-cy="name"]', 'Jane');
            cy.get('[data-cy="sex"]')
                .select('Female');
            fillingFields('[data-cy="birthday"]', '1990-01-01');
            cy.get('[data-cy="addPatient"]')
                .click({force: true})
        });
    });
});

context('Add procedures', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Procedures form', () => {
        it('Filling procedure for Dmytro', () => {
            cy.get('[data-cy="doctorName"]')
                .select('Leanne Graham');
            cy.get('[data-cy="patientName"]')
                .select('Dmytro');
            cy.get('[data-cy="status"]')
                .select('Planned');
            fillingFields('[data-cy="description"]', 'Some description for Dmytro');
            cy.get('[data-cy="room"]')
                .select(`${Math.floor(Math.random() * 100)}`);
            fillingFields('[data-cy="startTime"]', '10:30');
            fillingFields('[data-cy="endTime"]', '12:40');
            cy.get('[data-cy="addProcedure"]')
                .click({force: true})
        });
        it('Filling procedure for Mr. Smith', () => {
            cy.get('[data-cy="doctorName"]')
                .select('Mrs. Dennis Schulist');
            cy.get('[data-cy="patientName"]')
                .select('Mr. Smith');
            cy.get('[data-cy="status"]')
                .select('In Progress');
            fillingFields('[data-cy="description"]', 'Some description for Mr. Smith');
            cy.get('[data-cy="room"]')
                .select(`${Math.floor(Math.random() * 100)}`);
            fillingFields('[data-cy="startTime"]', '12:50');
            fillingFields('[data-cy="endTime"]', '16:40');
            cy.get('[data-cy="addProcedure"]')
                .click({force: true})
        });
        it('Filling procedure for Jane', () => {
            cy.get('[data-cy="doctorName"]')
                .select('Glenna Reichert');
            cy.get('[data-cy="patientName"]')
                .select('Jane');
            cy.get('[data-cy="status"]')
                .select('Finished');
            fillingFields('[data-cy="description"]', 'Some description for Jane');
            cy.get('[data-cy="room"]')
                .select(`${Math.floor(Math.random() * 100)}`);
            fillingFields('[data-cy="startTime"]', '10:30');
            fillingFields('[data-cy="endTime"]', '12:40');
            cy.get('[data-cy="addProcedure"]')
                .click({force: true})
        });
    });
});