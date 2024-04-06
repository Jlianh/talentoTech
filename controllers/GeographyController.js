class GeographyController {

    constructor() { }

    async getDepartments(req, res) {
        const response = await fetch('https://api-colombia.com/api/v1/Department');
        console.log(response.body)
    }

    async getCityByDepartment(req, res) {
        const response = await fetch("https://api-colombia.com/api/v1/Department/" + req.params.id + "/cities")
        res.json(response.json());
    }


}

module.exports = GeographyController;