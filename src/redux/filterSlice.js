// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     filteredJobs: [],
// };

// const filterSlice = createSlice({
//     name: "filter",
//     initialState,
//     reducers: {
//         FILTER_BY_LOCATION(state, action) {
//             const { jobs, search } = action.payload;
//             const temporaryJobs = jobs.filter(
//                 (job) =>
//                     job.title.toLowerCase().includes(search.toLowerCase()) ||
//                     job.location.toLowerCase().includes(search.toLowerCase())
//             );

//             state.filteredJobs = temporaryJobs;
//             console.log(state.filteredJobs);
//         },
//     },
// });

// export const { FILTER_BY_LOCATION } = filterSlice.actions;

// export const selectFilteredJobs = (state) => state.filter?.filteredJobs || [];


// export default filterSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredJobs: [],
};

const removeSpecialCharacters = (text) => text.replace(/[\s-]+/g, ' ').trim();

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_LOCATION(state, action) {
            const { jobs, search } = action.payload;
            const formattedSearch = removeSpecialCharacters(search.toLowerCase());

            const temporaryJobs = jobs.filter(
                (job) => {
                    const formattedTitle = removeSpecialCharacters(job.title.toLowerCase());
                    const formattedLocation = removeSpecialCharacters(job.location.toLowerCase());

                    return (
                        formattedTitle.includes(formattedSearch) ||
                        formattedLocation.includes(formattedSearch)
                    );
                }
            );

            state.filteredJobs = temporaryJobs;
            console.log(state.filteredJobs);
        },
    },
});

export const { FILTER_BY_LOCATION } = filterSlice.actions;

export const selectFilteredJobs = (state) => state.filter?.filteredJobs || [];

export default filterSlice.reducer;
