class CommonUtilities {
    getDateTime(numberOfDateJump) {
        const date = new Date();
        date.setDate(date.getDate() + numberOfDateJump);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const dateTime = [
            year,
            ("0" + month).slice(-2),
            ("0" + day).slice(-2),
        ].join("-");

        return dateTime;
    }

    compareObjects(firstObject, secondObject) {
        return JSON.stringify(firstObject) === JSON.stringify(secondObject);
    }
}

export default new CommonUtilities();
