let User = {
    id: 1,
    data() {
        return {
            id: { a: 1 }
        }
    },
    getId() {
        return this.id;
    },
    setId(id) {
        this.id = id;
    },
};
module.exports = User
