const { uuid } = require('uuidv4');

module.exports = class TicketStorege {
    #listTickets = []

    find() {
        return this.#listTickets
    }

    change(changeTicket, idChangeTicket) {
        this.#listTickets.forEach(ticket => {
            if (ticket.id === idChangeTicket) {
                ticket.name = changeTicket.name
                ticket.description = changeTicket.description
                this.changeTicket = ticket
                console.log(this.#listTickets, ' - this.changeTicket change')
            }
        })
        return this.changeTicket;
    }

    create(newTicket) {
        const ticket = {
            id: uuid(),
            ...newTicket,
            btnClass: 'not-done',
            status: false,
            created: new Date().toLocaleString()
        }
        this.#listTickets.push(ticket)
        console.log(this.#listTickets, ' - this.#listTickets create')
        return ticket
    }

    delete(idDeleteTicket) {
        if (this.#listTickets.every(ticket => ticket.id !== idDeleteTicket)) {
            ctx.response.status = 400;
            ctx.response.body = 'listTickets doesn\`t exists'
        }
        this.#listTickets = this.#listTickets.filter(ticket => ticket.id !== idDeleteTicket);
        return this.#listTickets
    }

    status(query){
        this.#listTickets.forEach(ticket => {
            if (ticket.id === query.id) {
                ticket.status = query.status
                if (query.status === 'true') {
                    ticket.btnClass = 'done'
                } else {
                    ticket.btnClass = 'not-done'
                }
                this.changeTicket = ticket
                console.log(this.#listTickets, ' - this.changeTicket change')
            }
        })
        return this.changeTicket;
    }

}
