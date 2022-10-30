interface IHak {
    projects: null | any[],
    profiles: null | any[],
    jobs: null | any[],
}

export const matchResponses = (arr: Array<any>) => {
    const result: IHak = {
        projects: null,
        profiles: null,
        jobs: null,
    }

    arr.forEach(elem => {
        const {result} = elem
        if (!!result[0]['author-id'] && !!result[0].contests) {
            result.projects = result;
        }

        if (!!result[0]['team-id'] && result[0].open !== undefined) {
            result.jobs = result;
        }

        if (!!result[0].email && !!result[0].password) {
            result.profiles = result;
        }
    });

    return result;
}

