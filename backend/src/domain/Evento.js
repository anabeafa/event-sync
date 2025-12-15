export class Evento {
    constructor(id, title, description, date, location, organizadorId, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.organizadorId = organizadorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}