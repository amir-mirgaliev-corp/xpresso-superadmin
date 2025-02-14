const formatNumberWithSpaces = (number) => {
    // if(number === null) return 0;

    if ( !isNaN(number) ) {
        const str = number.toString();
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};

export default formatNumberWithSpaces;
