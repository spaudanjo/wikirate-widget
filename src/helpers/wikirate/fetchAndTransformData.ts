import axios from 'axios';
import transformFetchedDataIntoChartData from './transformData';

function getUrlForYear(year: number) {
    return `https://wikirate.org/Commons+Greenhouse_Gas_Emissions_Scope_1_and_2_combined+Answer.json?filter%5Bproject%5D=Question+Widget%3A+GHG+emissions&view=compact&filter[year]=${year}`;
    // return `https://wikirate.org/Commons+Greenhouse_Gas_Emissions_Scope_1_and_2_combined+Answer.json?filter%5Bproject%5D=Question+Widget%3A+GHG+emissions&view=compact`; //&filter[year]=${year}`;
}

function yearToResultDataPromise(year: number) {
    return axios
    .get(getUrlForYear(year))
    .then(result => result.data)
}

export default function fetchAndTransformData(yearsToShow: number[], numberOfTopAnswersToShow: number) {
    const callsForAllYears = yearsToShow
        .map(yearToResultDataPromise);

    const combinedPromiseOfDataForAllYears = Promise.all(callsForAllYears);

    return combinedPromiseOfDataForAllYears.then((fetchedDataForAllYears: any) => transformFetchedDataIntoChartData(fetchedDataForAllYears, numberOfTopAnswersToShow));
}